/* ==========================================================================
 * @author: zeyanzhang.china@gmail.com  (Syn Zhang)
 * ========================================================================== */

(function($, Calendar) {

  // Calendar Public Class Definition
  // ================================

  // @see JSCal

  // Calendar Default Options

  Calendar.DEFAULTS = {
    'dateFormat': '%Y-%m-%d',
    'onSelect'  : function() {this.hide();}
  };


  // Calendar jQuery Plugin Definition
  // =================================

  var old = $.fn.calendar;

  $.fn.calendar = function(option) {
    return this.each(function() {
      var $this   = $(this),
          data    = $this.data('calendar'),
          options = $.extend(
            {},
            Calendar.DEFAULTS,
            $this.data(),
            typeof option == 'object' && option
          );

      // @todo 待补充 options 参数为 Function 等类型时的情况

      if (!data) $this.data('calendar', (data = new Calendar(options)));
      if (typeof option == 'string') data[option]();
    });
  };

  $.fn.calendar.Constructor = Calendar;


  // Calendar No Conflict
  // ====================

  $.fn.calendar.noConflict = function() {
    $.fn.calendar = old;
    return this;
  };


  // Calendar Data-API
  // =================

  $(document).on('focus.calendar.data-api', '[data-toggle="calendar"]', function(e) {
    var $this = $(this);

    e.preventDefault();

    $this.calendar();

    // @todo 补充带参数的调用
  });

})(jQuery, Calendar);
