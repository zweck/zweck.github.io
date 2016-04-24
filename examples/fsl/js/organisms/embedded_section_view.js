/**
 * @file Provides accordion or tab behaviours for a sectioned content component
 * @author Tom Jenkins tom.jenkins@kp360group.com
 */

define([
	
	'jquery',
	'underscore',
	'base'

], function ($, _, Base) {

	var EmbeddedSectioned = Base.extend({

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

			// Show first tab by default
			this.show(0);
		},

		/**
		 * Adds event listeners to component
		 */
		addBindings: function () {
			// Section select
			// ...from nav
			this.$el.on('click', '.embedded-sectioned-content-nav a', _.bind(function (e) {
				var id = e.target.getAttribute('href').substr(1);
				this.show(id);
				e.preventDefault();
			}, this))
			// ...from section title
			this.$el.on('click', '.embedded-sectioned-content-section-title', _.bind(function (e) {
				var id = $(e.target).parents('.embedded-sectioned-content-section')[0].id;
				this.show(id);
			}, this));

		},

		/**
		 * Shows a section
		 * @param {mixed} either an integer or an ID to indicate which section to show
		 */
		show: function (indexOrId) {
			var isId = isNaN(parseInt(indexOrId));
			var $section;
			if (isId) {
				var id = indexOrId;
				$link = this.$el.find('.embedded-sectioned-content-nav a[href="#'+id+'"]');
				$section = this.$el.find('#'+id);
			} else {
				var index = indexOrId;
				$link = this.$el.find('.embedded-sectioned-content-nav li:nth-child('+(parseInt(index) + 1)+') a');
				console.log($link);
				$section = this.$el.find('section').eq(index);
			}
			$section.addClass(this.options.showClass);
			$link.addClass(this.options.linkActiveClass);
			if (this.options.single) {
				$section.siblings().removeClass(this.options.showClass);
				$link.parent().siblings().children().removeClass(this.options.linkActiveClass); // Assumes links are in an li/wrapper of some sort
			}
		} 

	});

	return EmbeddedSectioned;
	
})
