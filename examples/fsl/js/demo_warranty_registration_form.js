/**
 * @file Sets up RequireJS config and bootstraps the component demo
 * @author Nick Hurley nick@nickhurley.co.uk
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
	'molecules/warranty_registration_form'
],
	
function ($, eq, warranty_registration_form) {

	console.log('[warranty_registration_form.js] Demo init');
	// Run elementQuery
	eq.init();
	
});