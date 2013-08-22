/* ==========================================================================
 * @author: zeyanzhang.china@gmail.com  (Syn Zhang)
 * ========================================================================== */

(function($, Dialog) {

  // Dialog Public Class Definition
  // ==============================

  // @see artDialog

  // Dialog Default Options

  Dialog.DEFAULTS = {};


  // Dialog jQuery Plugin Definition
  // ===============================

  var old = $.fn.dialog;

  $.fn.dialog = function(option) {
    return this.each(function() {
      var $this = $(this),
          data  = $this.data('dialog'),
          options;

      if (!data) {
        if ($this.data('content-type') !== 'string') {
          $this.data('content', $($this.data('content'))[0]);
        }
        // @todo 待补充 options 参数为 Array、Function 等类型时的情况
      }

      options = $.extend(
        {},
        Dialog.DEFAULTS,
        $this.data(),
        typeof option == 'object' && option
      );

      /**
       * 执行 close() 后（如点击对话框右上角的关闭按钮）会销毁 dialog 对象，
       * 因此需要重新创建
       */

      if ((data && data.closed === true) || !data) $this.data('dialog', (data = new Dialog(options)));
      if (typeof option == 'string') data[option]();
    });
  };

  $.fn.dialog.Constructor = Dialog;


  // Dialog No Conflict
  // ==================

  $.fn.dialog.noConflict = function() {
    $.fn.dialog = old;
    return this;
  };


  // Dialog Data-API
  // ===============

  $(document).on('click.dialog.data-api', '[data-toggle="dialog"]', function(e) {
    var $this = $(this);

    e.preventDefault();

    $this.dialog();

    // @todo 补充带参数的调用
  });

})(jQuery, artDialog);
