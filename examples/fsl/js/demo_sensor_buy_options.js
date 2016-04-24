/**
 * @file Sets up RequireJS config and bootstraps the component demo
 * @author Brian Simpson brian.simpson@kp360group.com
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
	'molecules/sensor_buy_options'
],
	
function ($, eq, SensorOptions) {

	console.log('[sensor_buy_options.js] Demo init');
	// Run elementQuery
	eq.init();

	var s = new SensorOptions($('.sensor-buy-options'));
	console.log(s);
	
});