/**
 * @file Sets up RequireJS config and bootstraps the component demo
 * @author [UNAME] [UMAIL]
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
	'molecules/account_subnav'
],
	
function ($, eq, account_subnav) {

	console.log('[account_subnav.js] Demo init');
	// Run elementQuery
	eq.init();
	
});