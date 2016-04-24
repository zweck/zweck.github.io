/**
 * @file Defines behaviours for a Events map module
 * @author Tom Jenkins tom.jenkins@kp360group.com
 */

define([
	'base',
	'underscore',
	'gmaps'
], function (Base, _, gmaps) {

	var EventsMap = Base.extend({

		geocoder: null,
		map: null,
		isSearching: false,
		isForm: false,

		/**
		 * @constructor
		 * Sets up the map, binds events and inits the geocoding library
		 *
		 * @param {float} initial latitude
		 * @param {float} initial longitude
		 * @param {float} initial zoom
		 */
		constructor: function (options) {
			// Defaults
			var defaults = {
				el: false,
				mapEl: false,
				searchEl: false,
				lat: 51.511214,
				lng: -0.119824,
				zoom: 8,
				callback: false
			}
			this.options = options = _.extend({}, defaults, options);

			if (!options.el) {
				this.el = document.createElement('div');
				this.el.className = 'events-map';	
			} else {
				this.el = options.el;
				this.isForm = this.el.nodeName.toLowerCase() == 'form';
			}
			if (!options.mapEl) {
				this.mapEl = document.createElement('div');
				this.mapEl.className = 'events-map-map';
				this.el.appendChild(this.mapEl);
			} else {
				this.mapEl = options.mapEl;
			}
			if (!options.searchEl) {
				this.searchEl = document.createElement('input');
				this.searchEl.type = 'text';
				this.searchEl.id = 'events-map-search';
				this.el.appendChild(this.searchEl);
			} else {
				this.searchEl = options.searchEl;
			}

			geocoder = new google.maps.Geocoder();
			var latlng = new google.maps.LatLng(options.lat, options.lng);
			var mapOptions = {
				zoom: options.zoom,
				center: latlng
			}
			this.map = new google.maps.Map(this.mapEl, mapOptions);

			var autocomplete = new google.maps.places.Autocomplete(this.searchEl);

			// Listen for autocomplete selection
			var autoChangeFunc = _.bind(function() {
				var place = autocomplete.getPlace() || this.searchEl.value;
				if (place) {
					if (place.geometry && place.geometry.location) {
						this.showEventsForLocation(place.geometry.location, 15);
					} else {
						this.showEventsForLocation(place.name || place, 15);
					}
				}
			}, this);

			if (this.isForm) {
				// If form, call on submit
				this.el.addEventListener('submit', function(e) {
					autoChangeFunc.call();
					e.preventDefault();
				});
			} else {
				// Otherwise call on selection and...
				google.maps.event.addListener(autocomplete, 'place_changed', autoChangeFunc);
				// ...return key in input
				this.searchEl.addEventListener('keydown', function (e) {
					if (e.keyCode == 13) {
						autoChangeFunc.call();
					}
				});
			}

			// Show events based upon initial location
			this.showEventsForLocation(latlng);

		},

		/**
		 * Uses the Google Maps GeoCoding API to convert a location string into a lat/lng pair
		 *
		 * @param {string } location/address
		 * @param {function} callback function to which to pass result
		 *
		 * @return {LatLng https://developers.google.com/maps/documentation/javascript/reference#LatLng}
		 */
		codeAddress: function (address, callback) {
			geocoder.geocode({'address': address}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					// Geocode success, return location
					callback.apply(this, [results[0].geometry.location]);
				} else {
					// Geocode failed
					callback.apply(this, [false]);
				}
			});
		},

		/**
		 * Displays events on the map for a given location
		 * @param {string or LatLng} location/address (will be geocoded to lat/lng) or LatLng (will be used directly)
		 * @param {float} radius, in miles, to search from the given location#
		 */
		showEventsForLocation: function (address, radius) {
			if (!address) {
				console.error('Events map: No address specified');
				return false;
			}

			this.isSearching = true;

			var showFunc = function (latlng) {
				// Centre map on location
				this.map.setCenter(latlng);
				// Clear any existing overlays
				this.markers = [];
				this.callouts = [];
				// Add marker at location
				this.markers.push(new google.maps.Marker({
					map: this.map,
					position: latlng
				}));
				// TODO: use real API link
				var apiURL = '../content/events.json?lat='+latlng.lat()+'&lng='+latlng.lng()+'&radius='+radius;
				$.get(apiURL, _.bind(function (events, status) {
					console.log('Events map data fetch status:', status);
					_.each(events, _.bind(function(event) {
						var marker = new google.maps.Marker({
							map: this.map,
							position: new google.maps.LatLng(event.lat, event.lng)
						});
						var callout = new google.maps.InfoWindow({
							content: '<div class="events-map-callout"><div class="events-map-callout-title">'+event.title+'</div> <div class="events-map-callout-body">'+event.content+'</div> <dl><dt class="events-map-callout-location">Location</dt> <dd>'+event.location+'</dd> <dt>Date</dt> <dd>'+event.date+' '+event.time+'</dd></dl><a href="'+event.uri+'" class="events-map-callout-link">More info</a></div>'
						});
						this.markers.push(marker);
						this.callouts.push(callout);
						google.maps.event.addListener(marker, 'click', _.bind(function() {
							callout.open(this.map, marker);
							window.callout = callout;
						}, this));
					}, this));	
				}, this));
				
				this.isSearching = false;
				console.log('Events map: searching from point', latlng.lat(), latlng.lng());
			};

			if (address.lat) {
				showFunc.apply(this, [address])
			} else {
				// Attempt to geocode address
				this.codeAddress(address, _.bind(function (latlng) {
					if (latlng) {
						// Got a location, proceed
						showFunc.apply(this, [latlng]);
					} else {
						// Geocode failed, alert user
						alert('We couldn\'t find the location you entered. Please check spelling and try again.');
					}
				}, this));
			}
		}

	});

	return EventsMap;

});