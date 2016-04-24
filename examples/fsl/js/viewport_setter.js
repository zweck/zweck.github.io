/**
 * @file Defines a module which can dynamically set the meta viewport's content attributre based on screen size. Useful for adaptive layouts
 * @author Tom Jenkins tom.jenkins@itsravenous.com
 */
define([
	'jquery'
], function ($) {

	var bps;
	var $win;
	var $meta;

	/**
	 * Sets the list of adaptive breakpoints to check window widths against
	 * @param {array} user list of breakpoints
	 */
	function setBreakpoints(bpList) {
		bps = bpList;
	}

	/**
	 * Sets the viewport meta attribute's width value based on the current available window width
	 */
	function calcViewport() {
		var w = $win.width();
		for (var i in bps) {
			if (w < bps[i]) {
				var bpi = i - 1;
				bpi = bpi > 0 ? bpi : 0;
				var userString = navigator.userAgent.match(/Android [\d+\.]{3,5}/);
				if (userString !== null) {
					var ver = userString[0].replace('Android ', '').split('.');
						if (ver[0] == 4 && ver[1] < 4 || ver[0] < 4) {
							bps[0] = 321;
						}
				}
				$meta.attr('content', 'width=' + bps[bpi]);
				break;
			}
		}
	}

	/**
	 * Sets viewport for iPad (needed to disable the default zoom-from-portrait behaviour when landscape)
	 */
	function setIpadViewport () {

		var w = $win.width();
		var h = $win.height();
		var landscape = w > h;
		var viewport = landscape ? 1024 : 768;
		$meta.attr('content', 'width='+viewport);
		
	}

	/**
	 * Bootstraps the module
	 */
	function run() {
		// Get viewport tag
		$meta = $('meta[name="viewport"]');

		$win = $(window);
		$win.on('resize', function (e) {
			calcViewport();
		});
	}

	/**
	 * Expose api
	 */
	return {

		setBreakpoints: setBreakpoints,
		calcViewport: calcViewport,
		setIpadViewport: setIpadViewport, 
		run: run

	};

});
