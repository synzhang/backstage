require(['app/crumb', 'jquery.tab', 'jquery.accordion'],
  function(breadcrumb) {
    var $html        = $('html'),
        crumb        = breadcrumb.getInstance(),
        $loading     = $('.loading'),
        offsetAside  = $('.aside_switch').offset().left,
        isAsideShown = true;

    require(['app/main/common']);

    // 导航提示 @todo
    crumb.register($('.tab-nav [data-toggle="tab"]'),
                    $(), 1);
    crumb.register($('.aside [data-toggle="accordion"]'),
                    $('.tab-nav .is-tab_title-on > a'), 2);
    crumb.register($('.aside .menu_item'),
                    $('.aside .is-accordion_head-on'), 3);
    $('.aside .is-accordion_head-on').trigger('click.crumb');

    // 切换菜单激活样式
    $('.aside').find('.menu_item').on('click', function() {
      $('.menu_item').removeClass('is-menu_item-on');
      $(this).addClass('is-menu_item-on');
    });

    // 侧边栏切换显示／隐藏
    $('.aside_switch').on('click', function() {
      isAsideShown = !isAsideShown;
      var offset = isAsideShown ? (0 - offsetAside) : offsetAside;

      $('.aside')[isAsideShown ? 'show' : 'hide']();

      $('.aside_switch').css('left', function() {
        return $(this).offset().left - offset;
      });

      if (isAsideShown) {
        $('.aside_switch')
          .removeClass('is-aside_switch-off')
          .addClass('is-aside_switch-on');
      } else {
        $('.aside_switch')
          .removeClass('is-aside_switch-on')
          .addClass('is-aside_switch-off');
      }

      $('.maincontainer').css('left', function() {
        return $(this).offset().left - offset;
      });

      if ($html.hasClass('lt-ie7')) {
        fillWidthHeight('.maincontainer', 'width');
      }

      $('.crumb').css('left', function() {
        return $(this).offset().left - offset;
      });
    });

    /**
     * 兼容性处理
     */
    if ($html.hasClass('lt-ie7')) {
      // IE 6

      var params = [
          {
            selector: '.aside', // .aside 只有 line-height 的高度，没自适应剩余高度
            attribute: 'height'
          },
          {
            selector: '.maincontainer', // .maincontainer 宽度超出自身 left 大小的宽度，高度超出自身 top 大小的高度
            attribute: 'width'
          },
          {
            selector: '.maincontainer',
            attribute: 'height'
          },
          {
            selector: '.aside_switch',
            attribute: 'height'
          }
        ];

      $(window).on('resize', function() {
        var length = params.length;
        for (var i = 0; i < length; i++) {
          var param = params[i];
          fillWidthHeight(param.selector, param.attribute);
        }
      });
      $(window).trigger('resize');
    } else if ($html.hasClass('lt-ie8') && !$html.hasClass('lt-ie7')) {
      // IE 7

      // .main(iframe) 高度没自适应为 100%
      $('.main').css('height', function() {
        return $(this).parent().height();
      });
    }

    /**
     * 补充剩余宽度或高度
     * @param  { Object } selector 选择器，指需要自适应宽度或高度的元素。
     * @param  { String } attribute 'width' 或者 'height'。
     * @return { Null }
     */
    function fillWidthHeight(selector, attribute) {
      var attr = attribute.toLowerCase();
      if (attr === 'width' || attr === 'height') {
        $(selector).css(attr, function() {
          return $(this).parent()[attr == 'width' ? 'width' : 'height']() -
            parseInt($(this).css(attr == 'width' ? 'left' : 'top'), 10) -
            parseInt($(this).css(attr == 'width' ? 'right' : 'bottom'), 10);
        });
      }
    }
});
