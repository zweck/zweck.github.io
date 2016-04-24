/**
 * @file Sets up RequireJS config and bootstraps the component demo
 * @author Tom Jenkins tom.jenkins@kp360group.com
 */

requirejs.config({
	'baseUrl': 'js',
	
	'paths': {
		'base':			'vendor/Base',
		'jquery':		'vendor/jquery',
		'text':			'vendor/require-text',
		'elementquery': 'vendor/elementQuery',
		'templates':	'../templates'
	},
	
	'shim': {
  
		'jquery': {
			'exports': '$'
		},
		'elementquery': {
			'exports': 'elementQuery'
		}
  
	},
	
	'name': 'main',
	'include': 'vendor/almond',
	'wrap': true
	
});


require([
	'jquery',
	'elementquery',
	'molecules/secondary_nav'
],
	
function ($, eq, secondary_nav) {

	console.log('[secondary_nav.js] Demo init');
	// Run elementQuery
	eq.init();
	
});