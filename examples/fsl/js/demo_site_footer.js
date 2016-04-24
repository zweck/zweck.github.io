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
	'molecules/site_footer'
],
	
function ($, eq, site_footer) {

	console.log('[site_footer.js] Demo init');
	// Run elementQuery
	eq.init();
	
});