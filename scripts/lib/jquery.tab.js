/* ==========================================================================
 * @author: zeyanzhang.china@gmail.com  (Syn Zhang)
 * ========================================================================== */

(function($) {

  // Tab Public Class Definition
  // ===========================

  var Tab = function(element, options) {
    this.$element = $(element);
    this.options  = options;
  };

  Tab.prototype.show = function() {
    var indicator = this.$element.data('indicator'),
        $tabPane  = $(this.$element.attr('href')),
        $tabTitle = indicator === '' || indicator === undefined ?
          this.$element : this.$element.parents(indicator);

    // @todo 使用 .siblings() 的话对 DOM 结构有一定的约束。
    $tabTitle.addClass(this.options.activeTitleClass)
      .siblings().removeClass(this.options.activeTitleClass);
    $tabPane.show().addClass(this.options.activePaneClass)
      .siblings().hide().removeClass(this.options.activePaneClass);
  };

  // Tab Default Options

  Tab.DEFAULTS = {
    'activeTitleClass': 'on',
    'activePaneClass' : 'on'
  };


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
            typeof option == 'object' && option
          );

      if (!data) $this.data('tab', (data = new Tab(this, options)));
      if (typeof option == 'string') data[option]();
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

})(jQuery);
