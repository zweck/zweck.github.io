/**
 * @file Sets up RequireJS config and bootstraps the component demo
 * @author David Gibson david.gibson@emedfusion.com
 */

requirejs.config({
	'baseUrl': 'js',
	
	'paths': {
		'base':			'vendor/Base',
		'jquery':		'vendor/jquery',
		'text':			'vendor/require-text',
		'elementquery': 'vendor/elementQuery',
		'underscore': 'vendor/underscore',
		'templates':	'../templates'
	},
	
	'shim': {

		'jquery': {
			'exports': '$'
		},
		'elementquery': {
			'exports': 'elementQuery'
		},
		'underscore': {
			'exports': '_'
		}

	},
	
	'name': 'main',
	'include': 'vendor/almond',
	'wrap': true
	
});


require([
	'jquery',
	'elementquery',
	'molecules/add_new_address_form'
],
	
function ($, eq, add_new_address_form) {

	console.log('[add_new_address_form.js] Demo init');
	// Run elementQuery
	eq.init();
	
});