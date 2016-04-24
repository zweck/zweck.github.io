/**
 * @file Defines behaviours for a interactive_product_image module
 * @author Brian Simpson brian.simpson@kp360group.com
 */

define([
	'jquery'
], function () {

	var HotSpots = function(){
		this.$hotSpots = $('.freestyle-libra ul li');
		this.$overlay = $(".page-product-listing");
	};

	HotSpots.prototype = {

		init: function(){
			var self = this;
			this.noJSHide();
			this.$hotSpots.on('click', 'a', function (e) {
				e.stopPropagation();
				self.toggle(e, $(this).parent());
			});
			this.$overlay.not(self.$hotSpots).on('click', function (e) {
				if(self.isSelected()){
					self.hideAll();
				};
			});
		},

		isSelected: function (hotSpot){
			if(!hotSpot){var hotSpot = this.$hotSpots.selector}
			if($(hotSpot).hasClass('selected')){
				return true;
			}else{
				return false;
			};
		},

		noJSHide: function (){
			this.$hotSpots.find('.hotspot-content').addClass('display-none');
		},

		hideAll: function (){
			this.$hotSpots.removeClass('selected');
			this.$overlay.removeClass('hotspot-selected');
		},

		toggle: function (e, hotSpot) {
			if(!this.isSelected(hotSpot)){
				this.hideAll();
			};
			if(e){e.preventDefault()};
			$(hotSpot).toggleClass('selected');
			this.$overlay.toggleClass('hotspot-selected');
			return console.log("[HotSpot Selected] " + $(hotSpot)[0].className);
		}

	};

	return HotSpots;

});