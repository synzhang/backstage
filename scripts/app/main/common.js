require(['jquery'], function($) {
  var $html    = $('html'),
      $window  = $(window),
      $loading = $('.loading');

  /**
   * UI 常用模块初始化
   */

  // “正在加载...”提示
  $window.on('loading', function() {
    if ($loading.is(':hidden')) $loading.show();
  }).on('loaded', function() {
    $loading.hide();
  }).on('load', function() {
    $window.trigger('loaded');
  });

  $('.js-loading-trigger').on('click', function() {
    $window.trigger('loading');
  });

  $(document).ajaxStart(function() {
    $window.trigger('loading');
  }).ajaxStop(function() {
    $window.trigger('loaded');
  });

  $('.main').on('load', function() {
    $window.trigger('loaded');
  });

  // artDialog 对话框全局配置
  if (typeof art != 'undefined') {
    var config = art.dialog.defaults;

    config['padding'] = '10px';
  }

  $.fn.chosen && $('.chosen-select').chosen();

  /**
   * 兼容性处理
   */

  if ($html.hasClass('lt-ie7')) {
    // IE 6

    $('.table').not('.table-form').find('tbody tr').hover(function() {
      $(this).toggleClass('is-tr-hover');
    });

    // 修复 IE 6 下 <select> 层叠顺序过高
    $.fn.bgiframe && $('.shame-z-index').bgiframe();
  }
});
