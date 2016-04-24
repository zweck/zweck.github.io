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
		'templates':	'../templates',
		'elementquery': 'vendor/elementQuery',
		'underscore': 'vendor/underscore'
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
	'organisms/section_view',
	'vendor/console'
],
	
function ($, eq, SectionView) {

	console.log('[demo_signup_form.js] Demo init');

	// Add JS class
	var $html = $('html');
	$html.addClass('has-js');

	// Run elementQuery
	eq.init();

	// Create tab example
	var $videos = $('.videos');
	var videoTabs = new SectionView($videos);
	// Create accordion example
	var $videos2 = $('.videos2');
	var videoAccordion = new SectionView($videos2);
	// Create responsive example
	var $videos3 = $('.videos3');
	var videoHybrid = new SectionView($videos3);

	// Create widget in tabs example
	var $figs = $('.figures');
	var figuresTabs = new SectionView($figs);
	
});