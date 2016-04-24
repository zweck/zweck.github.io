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
	'atoms/share_button',
	'organisms/section_view',
	'organisms/embedded_section_view',
	'molecules/testimonials',
	'molecules/interactive_product_image',
	'atoms/more_info',
	'modernizr',
	'modernizrpolys',
	'liga',
	'molecules/secondary_nav',
	'molecules/training_videos',
	'organisms/checkout_forms',
	'molecules/sensor_buy_options',
	'organisms/sensor_buy_options_compact_wrapper',
	'molecules/basket',
	'organisms/form',
	'molecules/warranty_registration_form'
],

function (consolePolyfill, $, eq, OffCanvas, viewportSetter, share, SectionView, EmbeddedSectionView, testimonials, IPI, MoreInfo, Modernizr, MP, icomoonLiga, secondaryNav, trainingVideos, checkoutForms, SensorBuyOptions, SensorBuyOptionsCompactWrapper, Basket, Form, warrantyForm) {
	consolePolyfill.run();
	console.log('[main.js] Website init');

	// Get body element
	var $body = $(document.body);
	var $html = $body.parent();

	/**
	 * {object}
	 * Defines global tasks; each of these will always run regardless of page
	 */
	var globalTasks = {

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
			var isIpad = navigator.userAgent.match(/iPad/i) !== null;
			if (isIpad) viewportSetter.setIpadViewport();
		},

		/**
		 * Adds offcanvas functionality for the menu elements
		 */
		offCanvas: function () {
			// Get offcanvas container
			var $wrapper = $('.wrapper');

			//Get menu icon
			var $navOpen = $('.menu-toggle');
			var $navWrapper = $('.nav-all');

			// Create offcanvas instance
			var oc = new OffCanvas({
				container: $wrapper,
				clickEventSelector: $navOpen
			});

			$wrapper.on('click', function (e) {
				if ($wrapper.hasClass('offcanvas-active')) {
					oc.hide();
				}
			});
			$navOpen.on('click', function (e) {
				oc.toggle();
				e.stopPropagation();
			});
			$navWrapper.on('click', function (e) {
				e.stopPropagation();
			});
		},

		/**
		 * Adds header from Drupal
		 */
		getHeader: function() {

			var url = 'http://jenkins:emed_fusion@lampreview.emedfusion.com/abbott/product/docroot/api/header.jsonp?callback=?';

			$.getJSON(url,function(data) {
				console.log(data);
				//$('.main-header').replaceWith(data.header);
			});

		}
	};

	/**
	 * {object}
	 * Defines tasks to run for specific components. Keyed by component classname by default
	 * Tasks will only be run if their selector is listed in the componentSelectors array (see below)
	 */
	var componentTasks = {
		/**
		 * Adds interactivity to sectioned content components
		 */
		'.sectioned-content': function () {

			var collapsed = ["product-spec-full-spec"];
			var options = {};
			var $sectionedView = $('.sectioned-content');

			for (i=0;i<collapsed.length;i++){
				if($sectionedView.hasClass(collapsed[i])){
					options.collapsed = true;
					break;
				}
			}

			$sectionedView.each(function () {
				new SectionView(this, options);
			});

		},

		'.more-info': function(){
			var moreinfo = new MoreInfo();
			moreinfo.init();
		},

		'.embedded-sectioned-content': function () {
			$('.embedded-sectioned-content').each(function () {
				new EmbeddedSectionView(this);
			});
		},

		'.testimonials': function () {
			testimonials.run();
		},

		'.training-videos': function () {
			trainingVideos.run();
		},
		'.button-share' : function() {
			var shareBtn = new share();
			// set sharing options here
			shareBtn.init();
		},
		'.interactive-product-image': function () {
			var ipi = new IPI();
			ipi.init();
		},
		'.nav-secondary': function () {
			secondaryNav.call();
		},
		'.events-map': function ($maps) {
			// Grab elements
			$maps.each(function () {
				var $el = $(this);
				var $map = $('.events-map-map', $el);
				var $search = $('.events-map-search', $el);

				// Init map
				new EventSearchMap({
					el: $el[0],
					mapEl: $map[0],
					searchEl: $search[0]
				});
			});
		},
		'.checkout-forms': function($form) {
			checkoutForms.run($form);
		},
		'.sensor-buy-options': function ($els) {
			$els.each(function (i, el) {
				new SensorBuyOptions($(el));
			});
		},
		'.sensor-buy-options-compact-wrapper': function ($els) {
			$els.each(function(i, el) {
				new SensorBuyOptionsCompactWrapper(el);
			});
		},
		'.basket-table': function ($els) {
			$els.each(function(i, el) {
				new Basket(el);
			});
		},
		'form': function ($els) {
			var options = {};
			// Get lang strings if exist
			var errorText = 'Please complete required fields.';
			var closeText = 'Close';
			if (typeof window.abbottLang != 'undefined') {
				options.errorText = window.abbottLang[errorText];
				options.closeText = window.abbottLang[closeText];
			}

			$els.each(function(i, el) {
				$(el).data('form', new Form(el, options));
			});
		},
		'.warranty-registration-form': function ($els) {
			warrantyForm.run();
		}
	};

	// Run global tasks
	globalTasks.addJSClass();
	globalTasks.watchViewport();
	globalTasks.offCanvas();
	globalTasks.getHeader();

	// Run elementquery
	eq.init();

	// Detect components and run behaviours
	/**
	 * {array}
	 * List of component selectors
	 */
	var componentSelectors = [
		'.sectioned-content',
		'.more-info',
		'.embedded-sectioned-content',
		'.testimonials',
		'.button-share',
		'.interactive-product-image',
		'.nav-secondary',
		'.events-map',
		'.training-videos',
		'form',
		'.checkout-forms',
		'.sensor-buy-options',
		'.sensor-buy-options-compact-wrapper',
		'.basket-table',
		'.warranty-registration-form'
	];
	// Loop over selectors,  detecting components and running necessary tasks
	for (var k in componentSelectors) {
		var selector = componentSelectors[k];
		var $components = $(selector);

		if ($components.length) {
			// Run component task
			componentTasks[selector].apply(this, [$components]);
		}
	}

});




