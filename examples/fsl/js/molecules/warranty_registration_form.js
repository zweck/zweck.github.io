/**
 * @file Defines behaviours for a [NAME] module
 * @author [UNAME] [UMAIL]
 */

define([

], function () {


	function init () {
		// Get form view instance
		var form = $('.warranty-registration-form').data('form');

		// Define fields
		// Warranty extension fields
		var extendWarranty = '#WCR_EXTEND';
		var extendByPost = '#WCR_EXPOST';
		var extendByPhone = '#WCR_EXPHONE';
		var extendByEmail = '#WCR_EXEMAIL';
		var extendBySMS = '#WCR_EXSMS';
		// Promotional material fields
		var promo = '#WCR_INF';
		var contactByPost = '#WCR_INFPOST';
		var contactByPhone = '#WCR_INFPHONE';
		var contactByEmail = '#WCR_INFEMAIL';
		var contactBySMS = '#WCR_INFSMS';
		// Data protection fields
		var dataProtect = '#WCR_DISCLOSE';

		// Add custom validation
		// Check there's a contact method selected for warranty extension if that box is checked
		// Define rules
		var extendValid = function () {
			var extendChecked = $(extendWarranty, this.$el).is(':checked');

			var postChecked = $(extendByPost, this.$el).is(':checked');
			var phoneChecked = $(extendByPhone, this.$el).is(':checked');
			var emailChecked = $(extendByEmail, this.$el).is(':checked');
			var smsChecked = $(extendBySMS, this.$el).is(':checked');

			return !extendChecked || (postChecked || phoneChecked || emailChecked || smsChecked);
		};
		// Apply rules
		form.addCustomValidation(extendByPost, extendValid);
		form.addCustomValidation(extendByEmail, extendValid);
		form.addCustomValidation(extendByPhone, extendValid);
		form.addCustomValidation(extendBySMS, extendValid);

		// Check there's a contact method selected for promotional material if that box is checked
		// Define rules
		var promoValid = function () {
			var promoChecked = $(promo, this.$el).is(':checked');

			var postChecked = $(contactByPost, this.$el).is(':checked');
			var phoneChecked = $(contactByPhone, this.$el).is(':checked');
			var emailChecked = $(contactByEmail, this.$el).is(':checked');
			var smsChecked = $(contactBySMS, this.$el).is(':checked');

			return !promoChecked || (postChecked || phoneChecked || emailChecked || smsChecked);
		};
		// Apply rules
		form.addCustomValidation(contactByPost, promoValid);
		form.addCustomValidation(contactByEmail, promoValid);
		form.addCustomValidation(contactByPhone, promoValid);
		form.addCustomValidation(contactBySMS, promoValid);
		
		// Check permission for data use if either warranty extension or promotional materials are checked
		var dataProtectValid = function () {
			var extendChecked = $(extendWarranty, this.$el).is(':checked');
			var promoChecked = $(promo, this.$el).is(':checked');
			var dataChecked = $(dataProtect, this.$el).is(':checked');

			return dataChecked || (!extendChecked && !promoChecked);
		};
		// Apply rules
		form.addCustomValidation(dataProtect, dataProtectValid);

	}

	return {

		run: init

	};

});