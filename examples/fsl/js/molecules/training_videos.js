/**
 * @file Defines behaviours for a Testimonials module
 * @author David Gibson david.gibson@emedfusion.com
 */

define([

	'jquery',
	'elementquery',
	'molecules/modal'

], function ($, eq, Modal) {

	/**
	 * Create modal
	 */
 	var api = {
 		run: function () {

 			var m = new Modal();
			$body = $(document.body);
			$body.append(m.$el);
			$body.on('click', '.training-video a', function (e) {
	 			var winWidth = $(window).width();
	 			if (winWidth > 650) {
					e.preventDefault();
					// Assumes a youtube URL
					var ytID = this.href.split('?v=').pop();
					m.setIFrame('//www.youtube.com/embed/'+ytID);
					m.show();
				}
			});
		}
	}

	return api;

});