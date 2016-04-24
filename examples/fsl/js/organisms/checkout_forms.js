/**
 * @file Provides accordion or tab behaviours for a sectioned content component
 * @author Tom Jenkins tom.jenkins@kp360group.com
 */

define([
	
	'jquery',
	'underscore',
	'base'

], function ($, _, Base) {

	var CheckoutForms = Base.extend({

		/**
		 * @constructor
		 * @param {element}
		 */
		constructor: function (el, options) {
			var defaults = {
				
			};

			this.options = $.extend({}, defaults, options);

			this.el = el;
			this.$el = $(el).addClass('has-js');

			this.form = this.$el.data('form');
			console.log('form', this.form);

			// Add event listeners
			this.addBindings();
		},

		/**
		 * Handles submission of the form, running validation etc
		 * @param {Event}
		 * @return {CheckoutForm}
		 */
		handleSubmit: function (e) {
			var $fieldsets = $('fieldset', this.$el);
			var formValid = true;
			// Loop over fieldsets and validate, marking invalid sections in nav
			console.log('numf', $fieldsets.length);
			$fieldsets.each(_.bind(function (i, el) {
				var $fieldset = $(el);
				var sectionValid = this.form.validateFieldset($fieldset);
				var $section = $fieldset.parents('section');
				var $navItem = $('a[href="#'+$section.attr('id')+'"]').eq(0);
				var $heading = $('.sectioned-content-section-title', $section).eq(0);

				console.log('heading', $heading);
				
				if (sectionValid) {
					$navItem.removeClass('is-invalid');
					$heading.removeClass('is-invalid');
				} else {
					formValid = false;
					$navItem.addClass('is-invalid');
					$heading.addClass('is-invalid');
				}
			}, this));

			// Prevent form submission and show error dialog if invalid
			if (!formValid) {
				e.preventDefault();
				this.form.showModal();
			}

		},

		/**
		 * Adds event listeners to component
		 */
		addBindings: function () {
			// Bind continue buttons
			this.$el.on('click', '.checkout-forms-continue', _.bind(function (e) {

				// Get current fieldset
				var $button = $(e.target);
				var $section = $button.parents('section').eq(0);
				var $fieldset = $('fieldset', $section);
				var $navItem = $('a[href="#'+$section.attr('id')+'"]').eq(0);
				var sectionValid = this.form.validateFieldset($fieldset);
				if (sectionValid) {
					this.showNext();
					$navItem.removeClass('is-invalid');
				} else {
					$navItem.addClass('is-invalid');
				}
				e.preventDefault();
			}, this));


			this.form.options.submitCallback = _.bind(function (e) {
				this.handleSubmit(e);
			}, this);
		},

		/**
		 * Shows next section
		 */
		showNext: function () {
			// Get current and next tab/accordion section
			var $currentSection = this.$el.find('.sectioned-content-section.is-visible');
			var $nextSection = $currentSection.next();
			// Get current and next tab nav item
			var $currentNavItem = this.$el.find('.sectioned-content-nav .is-active');
			var $nextNavItem = $currentNavItem.parent().next().find('>a') // (Links have the active state, not list items)

			// Switch to next section
			if ($nextSection.length) {
				$currentSection.removeClass('is-visible');
				$nextSection.addClass('is-visible');
				$currentNavItem.removeClass('is-active');
				$nextNavItem.addClass('is-active');
			}

			// Get scrollpos
			var wy = window.scrollY;
			// Hash the nav
			window.location.hash = $nextSection.attr('id');
			// Restore scrollpos
			window.scrollTo(0, wy);
		}

	});

	return {
		run: function ($el) {
			new CheckoutForms($el);
		}
	};
	
})
