/**
 * @file Defines behaviours for a interactive_product_image module
 * @author Brian Simpson brian.simpson@kp360group.com
 */

define([
	'jquery'
], function () {

	var ShareButton = function(){
		this.$shareButton = $('.button-share');
		this.hideClass = 'display-none';
		this.closeClass = 'close';
		this.closeText = 'CLOSE';
		this.openText = 'SHARE';
	};

	ShareButton.prototype = {

		twitterSettings: {
			shareURL: (window.Drupal) ? window.Drupal.settings.abbott.twitterSettings.shareURL : "default",
			screenName: (window.Drupal) ? window.Drupal.settings.abbott.twitterSettings.screenName : "default",
			lang: (window.Drupal) ? window.Drupal.settings.abbott.twitterSettings.lang : "default"
		},

		facebookSettings: {
			shareURL: (window.Drupal) ? window.Drupal.settings.abbott.facebookSettings.shareURL : "default"
		},

		emailSettings: {
			shareURL: (window.Drupal) ? window.Drupal.settings.abbott.emailSettings.address : "default",
			screenName: (window.Drupal) ? window.Drupal.settings.abbott.emailSettings.subject : "default"
		},

		twitterTemplate: function(){
			var template = "<a href='https://twitter.com/share' \
							data-url='" + this.twitterSettings.shareURL + "'' \
							data-via='" + this.twitterSettings.screenName + "'' \
							data-lang='" + this.twitterSettings.lang + "'' \
							class='twitter' target='_blank'>twitter</a>"
			return template;
		},

		facebookTemplate: function(){
			var template = "<a href='https://www.facebook.com/sharer/sharer.php?\
							u=" + this.facebookSettings.shareURL + "' \
							class='facebook' target='_blank'>facebook</a>"
			return template;
		},

		emailTemplate: function(){
			var template = "<a href='mailto:" + this.emailSettings.address + "\
							?Subject=" + this.emailSettings.subject + "' \
							class='email' target='_top'>email</a>"
			return template;
		},

		shareOptionsTempate: function(){
			var template = "<div class='share-options'>\
							" + this.emailTemplate() + " \
							" + this.facebookTemplate() + " \
							" + this.twitterTemplate() + " \
							" + "</div>"
			return template;
		},

		injectShareLinks: function(){
			this.$shareButton.append(this.shareOptionsTempate())
			this.$shareOptions = $('.share-options');
			this.$shareOptionLink = $('.share-options a');
		},

		init: function(){
			this.injectShareLinks();
			this.noJSHide();
			this.twitterJSinit();
			this.bindEvents();
		},

		bindEvents: function(){
			var self = this;
			this.$shareButton.not(this.$shareOptions).on('click', function (e) {
				e.preventDefault();
				e.stopPropagation();
				self.toggle(e);
			});
			this.$shareOptionLink.on('click', function(e){
				e.stopPropagation();
			});
		},

		twitterJSinit: function(){
			!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
		},

		noJSHide: function (){
			this.$shareButton.find(this.$shareOptions).addClass('display-none');
		},

		toggle: function (e) {
			console.log(e);
			if($(e.currentTarget).find("span").text() != this.closeText){
				$(e.currentTarget).find("span").text(this.closeText);
			}else{
				$(e.currentTarget).find("span").text(this.openText);
			}
			$(e.currentTarget).toggleClass(this.closeClass);
			$(e.currentTarget).find(".share-options").toggleClass(this.hideClass);
		}

	};

	return ShareButton;

});