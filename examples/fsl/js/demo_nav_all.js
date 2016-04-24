/**
 * @file Sets up RequireJS config and bootstraps the component demo
 * @author Tom Jenkins tom@itsravenous.com
 */

requirejs.config({
	'baseUrl': 'js',
	
	'paths': {
		'base':			'vendor/Base',
		'jquery':		'vendor/jquery',
		'text':			'vendor/require-text',
		'elementquery': 'vendor/elementQuery',
		'templates':	'../templates'
	},
	
	'shim': {
  
		'jquery': {
			'exports': '$'
		},
		'elementquery': {
			'exports': 'elementQuery'
		}
  
	},
	
	'name': 'main',
	'include': 'vendor/almond',
	'wrap': true
	
});


require([
	'jquery',
	'elementquery',
	'offcanvas'
],
	
function ($, eq, OffCanvas) {

	console.log('[main_nav.js] Demo init');
	// Run elementQuery
	eq.init();

	// Get offcanvas container
	var $wrapper = $('.wrapper');

	// Get nav wrapper
	var $navWrapper = $('.nav-all');

	// Add close button
	$navWrapper.prepend('<a href="#" class="menu-toggle">Close</a>');

	// Create offcanvas instance
	var oc = new OffCanvas({
		container: $wrapper
	});

	$wrapper.on('click', '.menu-toggle', function (e) {
		oc.toggle();
	});
	
});