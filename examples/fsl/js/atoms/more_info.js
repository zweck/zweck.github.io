/**
 * @file Defines behaviours for a more_info module
 * @author Phil Hauser phillip.hauser@emedfusion.com
 */

define([
	'jquery'
], function () {

	var MoreInfo = function(){
		this.$infoButton = $('.more-info');
	};

	MoreInfo.prototype = {

		init: function(){
			var self = this;
			this.hideAll();
			this.$infoButton.on('click', function (e) {
				self.toggle(e, $(this));
			});
		},

		isSelected: function (info){
			if($(info).hasClass('selected')){
				return true;
			}else{
				return false;
			};
		},

		hideAll: function (){
			this.$infoButton.removeClass('selected');
		},

		toggle: function (e, info) {
			if(!this.isSelected(info)){this.hideAll()};
			if(e){e.preventDefault()};
			$(info).toggleClass('selected');
			return console.log("[InfoButton Selected] " + $(info)[0].className);
		}

	};

	return MoreInfo;

});