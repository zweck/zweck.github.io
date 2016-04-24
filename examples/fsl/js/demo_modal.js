/**
 * @file Sets up RequireJS config and bootstraps the demo
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
		'templates':	'../templates'
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
  
	},
	
	'name': 'main',
	'include': 'vendor/almond',
	'wrap': true
	
});


require([
	'jquery',
	'elementquery',
	'molecules/modal'
],
	
function ($, eq, Modal) {

	console.log('[demo_modal.js] Demo init');

	// Run elementquery
	eq.init();

	// Create modal
	var m = new Modal();
	$body = $(document.body);
	$body.append(m.$el);
	$body.on('click', 'a', function (e) {
		e.preventDefault();
		m.setImage(this.href);
		m.show();
	});
	
});
