/**
 * @file Defines behaviours for a modal module
 * @author Tom Jenkins tom.jenkins@kp360group.com
 */

define([
	'base',
	'jquery',
	'underscore',
	'text!templates/organisms/modal.html'
], function (Base, $, _, tpl) {

	var Modal = Base.extend({
		constructor: function (options) {
			var defaults = {
				className: false,
				closeButton: true
			}
			this.options = $.extend({}, defaults, options);

			this.$el = $(tpl);
			if (this.options.className) this.$el.addClass(this.options.className);
			this.$contentWrapperEl = this.$el.find('.modal-window');
			this.$contentEl = this.$el.find('.modal-window-content');
			this.$closeEl = this.$el.find('.modal-close');
			if (typeof icomoonLiga != 'undefined') icomoonLiga(this.$closeEl);

			this.$el.on('click', _.bind(function (e) {
				this.hide();
			}, this));
			if (this.options.closeButton) {
				this.$closeEl.on('click', _.bind(function (e) {
					this.hide();
				}, this));
			} else {
				this.$closeEl.remove();
			}
			this.$contentWrapperEl.on('click', _.bind(function (e) {
				e.stopPropagation();
			}, this));
		},

		show: function () {
			this.$el.addClass('is-visible');
			this.visible = true;
		},

		hide: function () {
			this.$el.removeClass('is-visible');
			this.visible = false;
		},

		toggle: function () {
			if (this.visible) {
				this.hide();
			} else {
				this.show();
			}
		},

		setImage: function (url) {
			console.log(this.$contentEl);
			this.$contentEl[0].innerHTML = '<img alt="" src="'+url+'" />';
		},

		setHTML: function (html) {
			console.log(this.$contentEl);
			this.$contentEl[0].innerHTML = html;
		},

		setIFrame: function (url) {
			console.log(this.$contentEl);
			this.$contentEl[0].innerHTML = '<iframe src="'+url+'"></iframe>';
		}

	});

	return Modal;

});