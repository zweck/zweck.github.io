/**
 * @file Defines behaviours for a basket module
 * @author David Gibson david.gibson@emedfusion.com
 */

define([
	'jquery',
	'base',
	'underscore'
], function ($, Base) {

	var BasketView = Base.extend({

		constructor: function (el) {
			// Get element
			this.$el = $(el);
			this.el = this.$el.get(0);

			// Add bindings
			// Listen for quantity change and update price
			var $qtys = this.$el.find('.basket-table-qty input');
			$qtys.on('change', _.bind(function(e) {
				var $input = $(e.target);
				this.updatePricesFromQty($input);
			}, this));
		},

		/**
		 * Updates the subtotal after a quantity change
		 * @param {jQuery} input element with changed quantity
		 */
		updatePricesFromQty: function ($input) {
			// Get various elements
			var $row = $input.parents('tr').eq(0);
			var $table = $row.parents('table').eq(0);
			var $unitPrice = $row.find('.basket-table-unit-price');
			var $subTotal = $row.find('.basket-table-subtotal');
			var $unitAmount = $unitPrice.children('.basket-table-unit-price-amount');
			var $unitCurrency = $unitPrice.children('.basket-table-unit-price-currency');
			var $total = $table.find('.basket-table-total-amount');

			// Get currency and its position
			var currency = $unitCurrency.text();
			currencyFirst = $unitAmount.index() > $unitCurrency.index();

			// Calculate new subtotal
			var unitPrice = parseFloat($unitAmount.text());
			var subTotal = (unitPrice * $input.val()).toFixed(2);
			// Insert currency in correct position
			if (currencyFirst) {
				subTotal = currency + subTotal;
			} else {
				subTotal = subTotal + currency;
			}

			// Update subtotal column
			$subTotal.text(subTotal);

			// Update grand total field
			var $subTotals = $table.find('.basket-table-subtotal')
			var total = 0;
			$subTotals.each(function () {
				total += parseFloat(this.innerText.replace(currency, ''));
			});
			total = total.toFixed(2);
			if (currencyFirst) {
				total = currency + total;
			} else {
				total = total + currency;
			}
			$total.text(total);
		}

	});

	return BasketView; // Replace this return value with whatever class/function definition you wish this module to make available

});