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
	'molecules/main_nav',
	'offcanvas'
],
	
function ($, eq, main_nav, OffCanvas) {

	console.log('[main_nav.js] Demo init');
	// Run elementQuery
	eq.init();

	// Get offcanvas container
	var $wrapper = $('.wrapper');

	// Get nav wrapper
	var $nav = $('.main-nav');

	// Add close button
	$nav.prepend('<a href="#" class="menu-toggle">Close</a>');

	// Create offcanvas instance
	var oc = new OffCanvas({
		container: $wrapper
	});

	$wrapper.on('click', '.menu-toggle', function (e) {
		oc.toggle();
	});
	
});