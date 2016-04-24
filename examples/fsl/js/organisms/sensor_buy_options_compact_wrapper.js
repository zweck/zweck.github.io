/**
 * @file Behaviours for the mobile sensor buy options group
 * @author Brian Simpson brian.simpson@kp360group.com
 */

define([
	'jquery',
	'base',
	'underscore'
], function ($, Base, _) {

	var WrapperView = Base.extend({
		constructor: function (el) {
			// Get element
			this.$el = $(el);
			this.el = this.$el.get(0);

			// Add bindings
			this.$el.on('change', 'input[type="radio"]', _.bind(function (e) {
				var $radio = $(e.target);
				if ($radio.prop('checked')) {
					var $table = $radio.parents('table').eq(0);
					this.selectTable($table);
				}
			}, this));

			// Select initially selected table
			var $currentRadio = this.$el.find('input[type="radio"]:checked');
			if ($currentRadio.length) {
				var $currentTable = $currentRadio.parents('table').eq(0);
				this.selectTable($currentTable);
			}
		},

		/**
		 * Selects a table and deselects other tables in this group
		 * @param {jQuery} table element
		 */
		selectTable: function ($table) {
			$table.addClass('is-selected');
			$table.siblings().removeClass('is-selected')
		}
	});

	return WrapperView;

});