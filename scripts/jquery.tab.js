/* ==========================================================================
 * @author: zeyanzhang.china@gmail.com  (Syn Zhang)
 * ========================================================================== */

(function($) {

	// Tab Public Class Definition
	// ===========================

	var Tab = function(element) {
		this.$element = $(element);
	};

	Tab.prototype.show = function() {
		var $tabPane = $(this.$element.attr('href')),
				$tabTitle = this.$element.data('parent') === '' ||
					this.$element.data('parent') === undefined ?
					this.$element : this.$element.parents(this.$element.data('parent'));

		$tabTitle.addClass('on').siblings().removeClass('on');
		$tabPane.show().siblings().hide();
	};

	// Tab Default Options

	/**
	 * 1. 是否需要自定义选中状态的 CSS Class？
	 */

	/*Tab.DEFAULTS = {
		'activeClass': 'on' // 1
	};*/


	// Tab jQuery Plugin Definition
	// ============================

	var old = $.fn.tab;

	$.fn.tab = function(option) {
		return this.each(function() {
			var $this   = $(this),
					data    = $this.data('tab'),
					options = $.extend(
						{},
						Tab.DEFAULTS,
						$this.data(),
						typeof option === 'object' && option
					);

			if (!data) {
				data = new Tab(this);
				$this.data('tab', data);
			}

			if (typeof option === 'string') data[option]();
		});
	};

	$.fn.tab.Constructor = Tab;


	// Tab No Conflict
	// ===============

	$.fn.tab.noConflict = function() {
		$.fn.tab = old;
		return this;
	};


	// Tab Data-API
	// ============

	$(document).on('click.tab.data-api', '[data-toggle="tab"]', function(e) {
		e.preventDefault();
		$(this).tab('show');
	});


	// Init
	// ====

	$(function() {
		$('[data-toggle="tab"]').filter(function() {
			var $this = $(this);

			return $this.hasClass('on') ||
							$this.parents($this.data('parent')).hasClass('on');
		}).tab('show');
	});

})(window.jQuery);
