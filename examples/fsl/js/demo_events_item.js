/**
 * @file Sets up RequireJS config and bootstraps the component demo
 * @author Tom Jenkins tom.jenkins@kp360group.com
 */

requirejs.config({
	'baseUrl': 'js',
	
	'paths': {
		'base':			'vendor/Base',
		'underscore':	'vendor/underscore',
		'jquery':		'vendor/jquery',
		'text':			'vendor/require-text',
		'elementquery': 'vendor/elementQuery',
		'select2':		'vendor/select2/select2',
		'templates':	'../templates',
		'modernizr':  'vendor/modernizr/modernizr',
		'modernizrpolys': 'vendor/modernizr/modernizrpolys',
		'liga': 'vendor/liga'
	},
	
	'shim': {

		'jquery': {
			'exports': '$'
		},
		'underscore': {
			'exports': '_'
		},
		'elementquery': {
			'exports': 'elementQuery'
		},
		'select2': {
			"deps": ['jquery'],
			"exports": 'Select2'
		},
		'modernizr': {
			'exports': 'Modernizr'
		},
		'modernizrpolys': {
			'deps': ['modernizr'],
		},
		'liga': {
			'exports': 'icomoonLiga'
		}

	},
	
	'name': 'main',
	'include': 'vendor/almond',
	'wrap': true
	
});


require([
	'jquery',
	'elementquery',
	'molecules/events_item'
],
	
function ($, eq, eventsItem) {

	console.log('[events_item.js] Demo init');

	// Run elementQuery
	eq.init();
	
});