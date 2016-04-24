/**
 * @file Provides an offcanvas class
 * @author Tom Jenkins tom@itsravenous.com
 * @license GPLv3 (http://www.gnu.org/licenses/gpl-3.0.html)
 */
define([
	'jquery'
], function () {

	var OffCanvas = function (options) {
		
		var self = this;

		if (!options.container) throw('OffCanvas: No container element passed');
		if (!options.activeClass) options.activeClass = 'offcanvas-active';
		this.options = options;

		this.$container = $(options.container);
		this.$clickEventSelector = $(options.clickEventSelector);
	};

	OffCanvas.prototype = {
		
		show: function () {
			console.log(this.options.activeClass);
			this.$container.addClass(this.options.activeClass);
			this.$clickEventSelector.removeClass('menu-toggle--close');
			this.$clickEventSelector.addClass('menu-toggle--open');
		},

		hide: function () {
			this.$container.removeClass(this.options.activeClass);
			this.$clickEventSelector.addClass('menu-toggle--close');
			this.$clickEventSelector.removeClass('menu-toggle--open');
		},

		toggle: function () {
			this.$container.toggleClass(this.options.activeClass);
			this.$clickEventSelector.toggleClass('menu-toggle--close');
			this.$clickEventSelector.toggleClass('menu-toggle--open');
		},

		toggleSub: function (id) {
			$('#'+id).toggleClass('offcanvas-menu-sublist-active');
		}

	};

	return OffCanvas;

});
