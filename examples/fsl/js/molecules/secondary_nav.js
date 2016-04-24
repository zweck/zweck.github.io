/**
 * @file Defines behaviours for a Secondary navigation module
 * @author Tom Jenkins tom.jenkins@kp360group.com
 */

 define([

 	], function () {
 		function disableAccountClick() {
 			var $wrapper = $('.wrapper');
 			var $selector = $('#account').prev();
  			$selector.on('click', function(e) {
  				if ($wrapper.hasClass('offcanvas-active')) {
	  				e.preventDefault();
	  			}
  			});
 		}
	return disableAccountClick;

});
