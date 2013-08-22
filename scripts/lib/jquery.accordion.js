/* ==========================================================================
 * @author: zeyanzhang.china@gmail.com  (Syn Zhang)
 * ========================================================================== */

(function($) {

  // Accordion Public Class Definition
  // =================================

  var Accordion = function(element, options) {
    this.$element = $(element);
    this.options  = options;
  };

  /**
   * 显示 Accordion 内容主体
   * @return void
   */

  Accordion.prototype.show = function() {
    this.$element.addClass(this.options.activeHeadClass)
      .next().show().addClass(this.options.activeBodyClass);
  };

  /**
   * 隐藏 Accordion 内容主体
   * @return void
   */

  Accordion.prototype.hide = function() {
    this.$element.removeClass(this.options.activeHeadClass)
      .next().hide().removeClass(this.options.activeBodyClass);
  };

  /**
   * 切换显示或隐藏 Accordion 内容主体
   * @return void
   */

  Accordion.prototype.toggle = function() {
    this[this.$element.next().is(':visible') ? 'hide' : 'show']();
  };

  // Accordion Default Options

  Accordion.DEFAULTS = {
    'activeHeadClass': 'on',
    'activeBodyClass': 'on'
  };


  // Accordion jQuery Plugin Definition
  // ==================================

  var old = $.fn.accordion;

  $.fn.accordion = function(option) {
    return this.each(function() {
      var $this   = $(this),
          data    = $this.data('accordion'),
          options = $.extend(
            {},
            Accordion.DEFAULTS,
            $this.parents($this.data('parent')).data(),
            $this.data(),
            typeof option == 'object' && option
          );

      if (!data) $this.data('accordion', (data = new Accordion(this, options)));
      if (typeof option == 'string') data[option]();
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
    var $this          = $(this),
        active         = $this.next().is(':visible'),
        // @todo
        showActiveOnly = $($this.data('parent')).data('showActiveOnly');

    e.preventDefault();

    if (showActiveOnly) {
      if (!active) {
        $this.accordion('show');
        // @todo 待优化
        $(this).parents($this.data('parent'))
          .find('[data-toggle="accordion"]')
          .filter('[data-parent="' + $this.data('parent') + '"]')
          .not($this)
          .accordion('hide');
      }
    } else {
      $this.accordion('toggle');
    }
  });

})(jQuery);
