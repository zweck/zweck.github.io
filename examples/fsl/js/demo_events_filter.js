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
		'templates':	'../templates'
	},
	
	'shim': {
  
		'jquery': {
			'exports': '$'
		}
  
	},
	
	'name': 'main',
	'include': 'vendor/almond',
	'wrap': true
	
});


require([
	'molecules/events_filter'
],
	
function (events_filter) {

	console.log('[events_filter.js] Demo init');
	
});