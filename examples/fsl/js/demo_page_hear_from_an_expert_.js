/**
 * @file Sets up RequireJS config and bootstraps the component demo
 * @author [sharan me@sharanshekar.com
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
	'molecule/page_hear_from_an_expert_'
],

function (consolePolyfill, $, eq, OffCanvas, viewportSetter, Modernizr, MP, icomoonLiga, page_hear_from_an_expert_) {

	console.log('[page_hear_from_an_expert_.js] Demo init');
	// Run elementQuery
	eq.init();

});
