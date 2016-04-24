/**
 * @file Sets uyp RequireJS config and bootstraps the website
 * @author Tom Jenkins tom.jenkins@kp360group.com
 */

requirejs.config({
	'baseUrl': typeof Drupal != 'undefined' ? Drupal.settings.basePath + 'js' : 'js',

	'paths': {
		'base':						'vendor/Base',
		'underscore':				'vendor/underscore',
		'jquery':					'vendor/jquery',
		'text':						'vendor/require-text',
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
	'wrap': true,

});


require([
	'vendor/console',
	'jquery',
	'elementquery',
	'offcanvas',
	'viewport_setter',
	'organisms/section_view',
	'organisms/embedded_section_view',
	'molecules/testimonials',
	'molecules/interactive_product_image',
	'modernizr',
	'modernizrpolys',
	'liga',
	'molecules/secondary_nav',
	'molecules/training_videos',
	'organisms/checkout_forms',
	'molecules/sensor_buy_options',
	'organisms/sensor_buy_options_compact_wrapper',
	'molecules/basket',
	'organisms/form'
],

function (consolePolyfill, $, eq, OffCanvas, viewportSetter, SectionView, EmbeddedSectionView, testimonials, IPI, Modernizr, MP, icomoonLiga, secondaryNav, trainingVideos, checkoutForms, SensorBuyOptions, SensorBuyOptionsCompactWrapper, Basket, Form) {
	consolePolyfill.run();
	console.log('[main.js] Website init');

	// Get body element
	var $body = $(document.body);
	var $html = $body.parent();

	// Run elementquery
	eq.init();

	/**
	 * {object}
	 * Defines global tasks; each of these will always run regardless of page
	 */
	var globalTasks = {

		/**
		 * Add JS-enabled class
		 */
		addJSClass: function () {
			$html.addClass('has-js');
		},

		/**
		 * Watches viewport to fit to nearest adaptive breakpoint
		 */
		watchViewport: function () {
			viewportSetter.setBreakpoints([320, 768, 960]);
			viewportSetter.run();
			viewportSetter.calcViewport();
		}
	};

	// Run global tasks
	globalTasks.addJSClass();
	globalTasks.watchViewport();

	// Get form lang strings if exist
	var formOptions = {};
	var errorText = 'Please complete required fields.';
	var closeText = 'Close';
	if (typeof window.abbottLang != 'undefined') {
		formOptions.errorText = window.abbottLang[errorText];
		formOptions.closeText = window.abbottLang[closeText];
	}

	// Add behaviour to form
	var $form = $('form');
	$form.data('form', new Form($form, formOptions));

	// This is how you would get the Form instance if you didn't have direct access to it
	var myForm = $form.data('form');
	
	// Require swiss bank no if country set to swiss
	var countryField = '[name="country"]';
	var bankField = '[name="bank"]';
	myForm.addConditionalRequired(bankField, function () {
		return $(countryField, this.$el).val() == 'ch';
	});

	// Require at least one contact method if contact me checked
	var contactMe = '[name="contactme"]';
	var byPost = '[name="bypost"]';
	var byPhone = '[name="byphone"]';
	var byEmail = '[name="byemail"]';
	var contactMeValid = function () {
		var contactMeChecked = $(contactMe, this.$el).is(':checked');
		var postChecked = $(byPost, this.$el).is(':checked');
		var phoneChecked = $(byPhone, this.$el).is(':checked');
		var emailChecked = $(byEmail, this.$el).is(':checked');
		return !contactMeChecked || (postChecked || phoneChecked || emailChecked);
	};
	myForm.addCustomValidation(byPost, contactMeValid);
	myForm.addCustomValidation(byEmail, contactMeValid);
	myForm.addCustomValidation(byPhone, contactMeValid);

});




