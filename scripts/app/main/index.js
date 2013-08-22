define(['jquery.accordion', 'jquery.tab'], function() {
    var $html = $('html'),
        asideLeftShow = true,
        offsetOfSidebar = $('#switcher_aside_left').offset().left;

    $('.menu-item').on('click', function(e) {
      $('.menu-item').removeClass('is-menu-item_on');
      $(this).addClass('is-menu-item_on');
      $('#crumb').text($(this)
        .parent('.menu-bd')
        .siblings('.is-menu-hd_on:visible')
        .text()
        + ' - '
        + $('.is-menu-item_on')
        .text());
    });

    $('#switcher_aside_left').on('click', function() {
      asideLeftShow = !asideLeftShow;
      var offset = asideLeftShow ? (0 - offsetOfSidebar) : offsetOfSidebar;

      $('#aside_left')[asideLeftShow ? 'show' : 'hide']();

      $('#switcher_aside_left').css('left', function() {
        return $(this).offset().left - offset;
      });

      if (asideLeftShow) {
        $('#switcher_aside_left').removeClass('is-switcher_vertical_off')
        .addClass('is-switcher_vertical_on');
      } else {
        $('#switcher_aside_left').removeClass('is-switcher_vertical_on')
        .addClass('is-switcher_vertical_off');
      }

      $('#maincontainer').css('left', function() {
        return $(this).offset().left - offset;
      });
      if ($html.hasClass('lt-ie7')) {
        adaptiveWH('.maincontainer', 'width');
      }

      $('#crumbbar').css('left', function() {
        return $(this).offset().left - offset;
      });
    });

    /**
     * 兼容性处理
     */
    if ($html.hasClass('lt-ie7')) {
      // IE 6
      // .aside 高度似乎只有一行高，没自适应剩余高度。
      adaptiveWH('.aside', 'height');
      // $(window).on('resize', adaptiveWH('.aside', 'height'));
      // .maincontainer 宽度超出自身 left 大小的宽度，高度超出自身 top 大小的高度。
      adaptiveWH('.maincontainer', 'width');
      adaptiveWH('.maincontainer', 'height');
      // $(window).on('resize', adaptiveWH('.maincontainer', 'width'));
      // $(window).on('resize', adaptiveWH('.maincontainer', 'height'));
      adaptiveWH('.switcher_aside', 'height');
      // $(window).on('resize', adaptiveWH('.switcher_aside', 'height'));
    } else if ($html.hasClass('lt-ie8') && !$html.hasClass('lt-ie7')) {
      // IE 7
      // .main(iframe) 高度没自适应为 100%。
      $('.main').css('height', function() {
          return $(this).parent().height();
      });
    }

  /**
   * 自适应剩余宽度或高度
   * @param  {Object} elem 选择器，指需要自适应宽度或高度的元素。
   * @param  {String} attr 'width' 或者 'height'。
   * @return {null}
   */
  function adaptiveWH(elem, attr) {
    var attr = attr.toLowerCase();
    if (attr === 'width' || attr === 'height') {
      $(elem).css(attr, function() {
        return $(this).parent()[attr === 'width' ? 'width' : 'height']()
        - parseInt($(this).css(attr === 'width' ? 'left' : 'top'), 10)
        - parseInt($(this).css(attr === 'width' ? 'right' : 'bottom'), 10);
      });
    }
  }
});