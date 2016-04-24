requirejs.config({
	'baseUrl': 'js',
	
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
