/* ==========================================================================
 * @author: zeyanzhang.china@gmail.com  (Syn Zhang)
 * ========================================================================== */

// CSS 中加入以下代码：
// IE 6 Fixed Position Patch
//
// * html, * html body {
//   background-image: url(about:blank);
//   background-attachment:fixed;
// }

(function($) {

  // FixedHead Public Class Definition
  // =================================

  var FixedHead = function(element, options) {
    this.$element = $(element);
    this.options  = options;
    this.$target  = $(this.options.target);
    this.$clone   = null;
  };

  /**
   * 复制目标元素
   * 需要改变元素 position 为 fixed。
   * IE 6 不支持 postion: fixed，IE 7 中 <thead> position: fixed 也有问题。因此
   * 加多一层包装，修改包装元素的 position。
   * 如果无需支持 IE 6/7，可替换为注释的代码。
   * @return void
   */

  FixedHead.prototype.clone = function() {
    var self       = this;
        coordinate = self.$element.offset();

    // IE 6/7 补丁
    self.$clone = $('<' + self.options.wrapper + ' />')
                    .addClass(self.options.wrapperClass)
                    .append(self.$element.clone(true))
                    .appendTo('body')
                    .hide();
    /*self.$clone = self.$element.clone(true)
                    .insertAfter(self.$element)
                    .hide();*/

    if (!!window.ActiveXObject && !window.XMLHttpRequest) {
      // IE 6 补丁，模拟 position: fixed
      self.$clone.css({
        'position': 'absolute',
        'left': coordinate.left
      });

      $(window).on('scroll.fixedHead.data-api', function() {
        self.$clone.css('top', function() {
          return document.documentElement.scrollTop;
        });
      });
    } else {
      self.$clone.css({
        'position': 'fixed',
        'top': 0,
        'left': coordinate.left
      });
    }

    // IE 6/7 补丁
    self.align(self.$element, self.$clone.children());
    // self.align(self.$element, self.$clone);
  };

  /**
   * 监听
   * @return void
   */

  FixedHead.prototype.spy = function() {
    var self      = this,
        scrollTop = $(window).scrollTop(),
        top       = self.$element.offset().top,
        bottom    = self.$target.offset().top + self.$target.outerHeight() -
                      self.$element.outerHeight();

    if (!self.$clone) self.clone();
    self[scrollTop >= top && scrollTop <= bottom ? 'show' : 'hide']();
  };

  /**
   * 显示复制的固定元素，并隐藏原始元素
   * @return void
   */

  FixedHead.prototype.show = function() {
    var self = this;

    self.$clone.show();
    self.$element.css('visibility', 'hidden');
  };

  /**
   * 显示原始元素，并隐藏复制的固定元素
   * @return void
   */

  FixedHead.prototype.hide = function() {
    var self = this;

    self.$element.css('visibility', 'visible');
    self.$clone.hide();
  };

  /**
   * 对齐复制的元素
   * @return void
   */

  FixedHead.prototype.align = function($element, $clone) {
    var self = this;

    for (var i = 0, j = $clone.length; i < j; i++) {
      var $currentElement = $element.eq(i),
          $currentClone   = $clone.eq(i);

      $currentClone.css('width', $currentElement.css('width'));

      if ($currentClone.children().length !== 0) {
        self.align($currentElement.children(), $currentClone.children());
      }
    }
  };

  // FixedHead Default Options

  FixedHead.DEFAULTS = {
    target      : '',    // 固定元素提示的主体元素
    wrapper     : 'div', // IE 6/7 补丁，固定元素的包装元素
    wrapperClass: ''     // IE 6/7 补丁，可选，添加到固定元素的 CSS class
  };


  // FixedHead jQuery Plugin Definition
  // ==================================

  var old = $.fn.fixedHead;

  $.fn.fixedHead = function(option) {
    return this.each(function() {
      var $this   = $(this),
          data    = $this.data('fixedHead'),
          options = $.extend(
            {},
            FixedHead.DEFAULTS,
            $this.data(),
            typeof option == 'object' && option
          );

      if (!data) $this.data('fixedHead', (data = new FixedHead(this, options)));
      if (typeof option == 'string') data[option]();
    });
  };

  $.fn.fixedHead.Constructor = FixedHead;


  // FixedHead No Conflict
  // =====================

  $.fn.fixedHead.noConflict = function() {
    $.fn.fixedHead = old;
    return this;
  };


  // FixedHead Data-API
  // ==================

  var timer = 0;

  $(window).on('scroll.fixedHead.data-api', function() {
    if (!timer) {
      timer = setTimeout(function() {
        $('[data-spy="fixedHead"]').fixedHead('spy');
        timer = 0;
      }, 50);
    }
  });

})(jQuery);
