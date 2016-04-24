/**
 * @file Defines behaviours for a Form module
 * @author Tom Jenkins tom@itsravenous.com
 */

define([
	'jquery',
	'base',
	'underscore',
	'molecules/modal'
], function ($, Base, _, Modal) {

	var Form = Base.extend({

		conditionalRequireds: {},
		customValidations: {},

		/**
		 * @constructor
		 * @param {Element}
		 */
		constructor: function (el, options) {
			var defaults = {
				errorText: 'Please complete required fields',
				closeText: 'Close'
			};
			this.options = _.extend({}, defaults, options);

			this.el = el;
			this.$el = $(el);

			this.addBindings();

			this.createModal();
		},

		/**
		 * Creates modal for feedback messages
		 * @return {Form}
		 */
		createModal: function () {
			this.modal = new Modal({
				className: 'form-modal',
				closeButton: false
			});

			return this;
		},		

		showModal: function () {
			$body = $(document.body);
			$body.append(this.modal.$el);
			this.modal.setHTML('<p class="form-modal-message form-modal-message--error">'+this.options.errorText+'</p><button class="form-modal-close">'+this.options.closeText+'</button>');
			$('.form-modal-close').on('click', _.bind(function () {
				this.modal.hide();
			}, this));
			this.modal.show();
		},

		/**
		 * Adds DOM bindings
		 * @return {Form}
		 */
		addBindings: function () {
			this.$el.on('submit', _.bind(this.handleSubmit, this));
			return this;
		},

		/**
		 * Handles a submit event on the form
		 * @param {Event}
		 * @return {Form}
		 */
		handleSubmit: function (e) {
			if (this.options.submitCallback) {
				this.options.submitCallback.apply(this, [e])
			} else {
				valid = this.validate();
				if (!valid) {
					e.preventDefault();
				}
			}

			return this;
		},

		/**
		 * Validates form fields
		 * @param {jQuery list} fields to validate (optional, by default all fields in form)
		 * @return {bool}
		 */
		validate: function ($fields) {
			if (typeof $fields == 'undefined') $fields = this.$el.find('input, textarea, select');
			var valid = true;
			$fields.each(_.bind(function (i, field) {
				var thisValid = this.validateField(field);
				if (!thisValid) valid = false;
			}, this));

			if(!valid) {
				this.showModal();
			}

			return valid;
		},

		/**
		 * Validates a single fieldset
		 * @param {Element} fieldset
		 * @return {bool}
		 */
		validateFieldset: function (fieldset) {
			var $fieldset = $(fieldset);
			var $fields = $('input, textarea, select', $fieldset);
			return this.validate($fields);
		},

		/**
		 * Checks to see if a field is valid, and applies the relevant class
		 * @param {Element}
		 * @return {bool} field validity
		 */
		validateField: function (field) {
			var $field = $(field);
			var $fieldWrapper = $field.parents('.field, .field-group').last();
			var isRequired = $field.hasClass('required') || $field.is('[required]');

			var isCheckbox = field.type == 'checkbox';
			var isRadio = field.type == 'radio';
			if (isCheckbox) {
				isFilled = $field.is(':checked');
			} else if (isRadio) {
				var isFilled = $('[name="'+field.name+'"]:checked').length;
			} else {
				var isFilled = $field.val().trim().length > 0;
			}

			var custom = this.customValidations[field.id] || false;
			var conditional = this.conditionalRequireds[field.id] || false;

			if (custom) {
				valid = custom.apply(this);
			} else if (conditional) {
				isRequired = conditional.apply(this);
				valid = !isRequired || isFilled;
			} else {
				valid = (!isRequired || (isRequired && isFilled));
			}
			
			var validPrefix = $fieldWrapper.is('.field-group') ? 'field-group' : 'field';
			if (!valid) {
				$fieldWrapper.removeClass(validPrefix+'--valid').addClass(validPrefix+'--invalid');
			} else {
				$fieldWrapper.removeClass(validPrefix+'--invalid').addClass(validPrefix+'--valid');
			}

			return valid;
		},

		/**
		 * Adds a requirement for a field to be filled if a given condition is true at the time of validation
		 * @param {jQuery, Element or selector string} field
		 * @param {Element} callback to run to see if field is required
		 * @return {Form}
		 */
		addConditionalRequired: function (field, callback) {
			var $field = $(field);
			this.conditionalRequireds[$field.attr('id')] = callback;

			return this;
		},

		/**
		 * Adds a custom validation callback for a field
		 * @param {jQuery, Element or selector string} field
		 * @param {Element} callback to run to see if field is valid
		 * @return {Form}
		 */
		addCustomValidation: function (field, callback) {
			var $field = $(field);
			this.customValidations[$field.attr('id')] = callback;

			return this;
		}

	})

	return Form; // Replace this return value with whatever class/function definition you wish this module to make available

});