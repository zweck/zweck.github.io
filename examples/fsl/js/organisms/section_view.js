/**
 * @file Provides accordion or tab behaviours for a sectioned content component
 * @author Tom Jenkins tom.jenkins@kp360group.com
 */

define([
	
	'jquery',
	'underscore',
	'base'

], function ($, _, Base) {

	var Sectioned = Base.extend({

		/**
		 * {array}
		 * stores event handlers for the view, keyed by event name
		 */
		eventHandlers: {},

		/**
		 * @constructor
		 * @param {element}
		 */
		constructor: function (el, options) {
			var defaults = {
				single: true,
				showClass: 'is-visible',
				linkActiveClass: 'is-active'
			};

			this.options = $.extend({}, defaults, options);

			this.el = el;
			this.$el = $(el).addClass('has-js');

			// Add event listeners
			this.addBindings();

			var $requestedSection = window.location.hash.length ? this.getSectionFromHash(window.location.hash.substr(1)) : false;
			if ($requestedSection && $requestedSection.length) {
				this.show($requestedSection.attr('id'));
			} else if(!this.options.collapsed){
				// Show first tab if none indicated by URI
				this.show(0, 'nohash');
			}
		},

		/**
		 * Gets a section based on a URL hash
		 * @param {string} hash string (without hash char)
		 * @return {int or jQuery element} 0 if section not found, element otherwise
		 */
		getSectionFromHash: function (hash) {
			var $section = this.$el.find('#'+hash.replace('section-', ''));
			if (!$section.length) $section = 0;
			return $section;
		},

		/**
		 * Adds event listeners to component
		 */
		addBindings: function () {
			// Section select
			// ...from nav
			this.$el.on('click', '.sectioned-content-nav a', _.bind(function (e) {
				var id = e.target.getAttribute('href').substr(1);
				this.show(id);
				e.preventDefault();
			}, this))
			// ...from section title
			this.$el.on('click', '.sectioned-content-section-title', _.bind(function (e) {
				var id = $(e.target).parents('.sectioned-content-section')[0].id;
				this.toggle(id);
			}, this));

		},

		/**
		 * Given an index or ID, gets the appropriate section and nav link
		 * @param {mixed} either an integer index or section ID
		 * @return {object} containing section and link elements, keyed section and link
		 */
		getSectionAndLinkFromArg: function (indexOrId) {
			var isId = isNaN(parseInt(indexOrId));
			var $section;
			if (isId) {
				var id = indexOrId;
				$link = this.$el.find('.sectioned-content-nav a[href="#'+id.replace('section-', '')+'"]');
				$section = this.$el.find('#'+id);
			} else {
				var index = indexOrId;
				$link = this.$el.find('.sectioned-content-nav li:nth-child('+(parseInt(index) + 1)+') a');
				console.log($link);
				$section = this.$el.find('section').eq(index);
			}
			return {
				section: $section,
				link: $link
			};
		},

		/**
		 * Shows a section
		 * @param {mixed} either an integer or an ID to indicate which section to show
		 */
		show: function (indexOrId, noHash) {
			var sectionAndLink = this.getSectionAndLinkFromArg(indexOrId);
			var $section = sectionAndLink.section;
			var $link = sectionAndLink.link;
			$section.addClass(this.options.showClass);
			$link.addClass(this.options.linkActiveClass);
			if (this.options.single) {
				$section.siblings().removeClass(this.options.showClass);
				$link.parent().siblings().children().removeClass(this.options.linkActiveClass); // Assumes links are in an li/wrapper of some sort
			}

			// Hash the nav for route-ability
			if (!noHash) {
				var wy = window.scrollY;
				window.location.hash = 'section-'+$section.attr('id');
				window.scrollTo(0, wy);
			}
		},

		/**
		 * Hides a section
		 * @param {mixed} either an integer or an ID to indicate which section to show
		 */
		hide: function (indexOrId) {
			var sectionAndLink = this.getSectionAndLinkFromArg(indexOrId);
			var $section = sectionAndLink.section;
			var $link = sectionAndLink.link;
			$section.removeClass(this.options.showClass);
			$link.removeClass(this.options.linkActiveClass);
		},

		/**
		 * Toggles a section
		 * @param {mixed} either an integer or an ID to indicate which section to toggle
		 */
		toggle: function (indexOrId) {
			var sectionAndLink = this.getSectionAndLinkFromArg(indexOrId);
			var $section = sectionAndLink.section;
			if ($section.hasClass(this.options.showClass)) {
				this.hide(indexOrId);
			} else {
				this.show(indexOrId);
			}
		},

		/**
		 * Registers an event handler
		 * @param {string} event name
		 * @param {function} handler
		 */
		on: function (event, handler) {
			this.handlers
		},

		/**
		 * Triggers an event
		 * @param event name
		 */
		trigger: function (event, data) {
			if (typeof data == 'undefined') data = false;
			var handlers = this.eventHandlers[event];
			for (var k in handlers) {
				handlers[k].apply(this, [data]);
			}
		}

	});

	return Sectioned;
	
})
