/**
 * @file Sets up RequireJS config and bootstraps the component demo
 * @author James Malach james.malach@castlist.co.uk
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
	'atoms/contact_info'
],
	
function ($, eq, contact_info) {

	console.log('[contact_info.js] Demo init');
	// Run elementQuery
	eq.init();
	
});