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
		'select2':		'vendor/select2/select2',
		'templates':	'../templates'
	},
	
	'shim': {
  
		'jquery': {
			'exports': '$'
		},
		'elementquery': {
			'exports': 'elementQuery'
		},
		'select2': {
			"deps": ['jquery'],
			"exports": 'Select2'
		},
  
	},
	
	'name': 'main',
	'include': 'vendor/almond',
	'wrap': true
	
});


require([
	'jquery',
	'elementquery',
	'select2'
],
	
function ($, eq, select2) {

	console.log('[field.js] Demo init');
	// Run elementQuery
	eq.init();

	// Convert dropdowns to select2 instances
	$('select').select2({
		minimumResultsForSearch: -1
	});
	
});