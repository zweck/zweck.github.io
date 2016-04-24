/**
 * @file Sets up RequireJS config and bootstraps the component demo
 * @author Tom Jenkins tom.jenkins@kp360group.com
 */

requirejs.config({
	'baseUrl': 'js',
	
	'paths': {
		'base':						'vendor/Base',
		'underscore':				'vendor/underscore',
		'jquery':					'vendor/jquery',
		'text':						'vendor/require-text',
		'async':					'vendor/require-async',
		'propertyParser':			'vendor/require-propertyParser',
		'goog':						'vendor/require-goog',
		'gmaps':					'vendor/gmaps',
		'elementquery':				'vendor/elementQuery',
		'templates':				'../templates',
		'modernizr':				'vendor/modernizr/modernizr',
		'modernizrpolys':			'vendor/modernizr/modernizrpolys',
		'liga':						'vendor/liga'
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
	'molecules/event_search_map'
],
	
function ($, eq, EventSearchMap) {

	console.log('[event_search_map.js] Demo init');
	// Run elementQuery
	eq.init();
	
	// Grab elements
	var $el = $('.events-map');
	var $map = $('.events-map-map');
	var $search = $('.events-map-search');

	// Init map
	var em = new EventSearchMap({
		el: $el[0],
		mapEl: $map[0],
		searchEl: $search[0]
	});
	

});