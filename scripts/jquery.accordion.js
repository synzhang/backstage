/* ==========================================================================
 * @author: zeyanzhang.china@gmail.com  (Syn Zhang)
 * ========================================================================== */

(function($) {

	// Accordion Public Class Definition
	// =================================

	var Accordion = function() {
		init: function(elem, options) {
			var self = this;
			self.$elem = $(elem);
			self.options = $.extend({}, $.fn.accordion.options, options);
			self.$accordionHead = self.$elem.children(self.options.accordionHead);
			self.$accordionBody = self.$elem.children(self.options.accordionBody);
			self.delay = self.options.event.indexOf('hover') === -1 ? 0 : 150;

			self.$accordionBody.not(':first').hide();

			self.$accordionHead.on(self.options.event, function(e) {
				self.activeHead = e.target;
				self.$activeHead = $(e.target);

				self.$activeBody = self.$activeHead.next(self.options.accordionBody);
				setTimeout(function() {
					if (e.target === self.activeHead && !self.$activeBody.is(':visible')) {
						self.$accordionBody.filter(':animated').stop(true, true);
						if (self.options.showActiveOnly) self.$accordionBody.filter(':visible').hide();
						self.$activeBody.show();
					}
				}, self.delay);
			});
		}
	};

  // Accordion Default Options

  Accordion.DEFAULTS = {};


  // Accordion jQuery Plugin Definition
	// ==================================

	var old = $.fn.accordion;

	$.fn.accordion = function(option) {
		return this.each(function() {
			var $this = $(this),
					data = $this.data('accordion'),
					options = $.extend(
						{},
						Accordion.DEFAULTS,
						$this.data(),
						typeof option == 'object' && option
					);

			if (!data) {
				data = new Accordion(this, option);
				$this.data('accordion', data);
			}
		});
	};

  $.fn.accordion.Constructor = Accordion;


	// Accordion No Conflict
	// =====================

	$.fn.accordion.noConflict = function() {
		$.fn.accordion = old;
		return this;
	};


	// Accordion Data-API
	// ==================

	$(document).on('click.accordion.data-api', '[data-toggle="accordion"]', function(e) {
		$(this).accordion();
	});

})(jQuery);
