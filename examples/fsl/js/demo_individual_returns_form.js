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
	'molecules/individual_returns_form'
],
	
function ($, eq, individual_returns_form) {

	console.log('[individual_returns_form.js] Demo init');
	// Run elementQuery
	eq.init();
	
});