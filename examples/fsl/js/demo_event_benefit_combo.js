/**
 * @file Sets up RequireJS config and bootstraps the component demo
 * @author [Phil Hauser phillip.hauser@emedfusion.com
 */

requirejs.config({
	'baseUrl': typeof Drupal != 'undefined' ? Drupal.settings.basePath + 'js' : 'js',

	'paths': {
		'base':			'vendor/Base',
		'underscore':	'vendor/underscore',
		'jquery':		'vendor/jquery',
		'text':			'vendor/require-text',
		'elementquery': 'vendor/elementQuery',
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
	'wrap': true,

});


require([
	'vendor/console',
	'jquery',
	'elementquery',
	'offcanvas',
	'viewport_setter',
	'modernizr',
	'modernizrpolys',
	'liga',
	'molecules/secondary_nav',
	'molecule/event_benefit_combo'
],

function (consolePolyfill, $, eq, OffCanvas, viewportSetter, Modernizr, MP, icomoonLiga, event_benefit_combo) {

	console.log('[event_benefit_combo.js] Demo init');
	// Run elementQuery
	eq.init();

});
