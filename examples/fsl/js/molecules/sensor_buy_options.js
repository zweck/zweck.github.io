/**
 * @file Defines behaviours for a sensor_buy_options module
 * @author Brian Simpson brian.simpson@kp360group.com
 */

define([
	'jquery',
	'underscore',
	'base'
], function ($, _, Base) {

	var SensorOptions = Base.extend({

		constructor: function (el) {
			this.$el = $(el);
			this.el = this.$el[0];
			if (this.$el.hasClass('sensor-buy-options--compact'))
			{
				return;
			}

			// Add bindings to radio options
			this.bindRadios();
		},

		bindRadios: function () {
			// Get radios
			var $radios = this.$el.find('input[type="radio"]');
			// Listen for selection
			$radios.on('change', _.bind(function (e) {
				this.selectOption(e.target)
			}, this));
		},

		selectOption: function (radio) {
			var $radio = $(radio);
			// Get option row
			var $selected = $radio.parents('tr').eq(0);
			var $nonselected = $selected.siblings();
			// Add selected state to row and enable select if any
			$selected.removeClass('sensor-buy-options-option--deselected').addClass('sensor-buy-options-option--selected');
			$selected.find('select').removeAttr('disabled');
			// Remove selected form other rows and disable their selects (if any)
			$nonselected.removeClass('sensor-buy-options-option--selected').addClass('sensor-buy-options-option--deselected');
			$nonselected.find('select').prop('disabled', 'disabled');
		}

	})

	return SensorOptions; // Replace this return value with whatever class/function definition you wish this module to make available

});