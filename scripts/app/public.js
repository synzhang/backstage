if (window.jQuery) {
    $(function(){
        var $html = $('html'),
            $loading = $(parent.document.getElementById('loading')).length === 0 ?
              $('#loading') : $(parent.document.getElementById('loading')),
            $overlay = $('<div id="overlay" />')
                        .height($(document)
                        .height())
                        .appendTo('body')
                        .hide();

        /**
         * “正在加载...”提示
         */

        $(window).on('loading', function() {
            if ($loading.is(':hidden')) $loading.show();
        }).on('loaded', function() {
            $loading.hide();
        }).load(function() {
            $(this).trigger('loaded');
        });
        $(document).ajaxStart(function() {
            $(window).trigger('loading');
        }).ajaxStop(function() {
            $(window).trigger('loaded');
        });
        $('.js-loading-trigger').on('click', function() {
            $(window).trigger('loading');
        });

        $.fn.chosen && $('select.selectbox').chosen();
        $.fn.fixedHead && $('.table>thead').length && $('.table').has('thead').fixedHead({
            head: 'thead',
            headClass: 'fixedHead',
            wrapper: 'table',
            body: 'tbody'
        });

        /**
         * 兼容性处理
         */

        if ($html.hasClass('lt-ie10')) {
          $('[placeholder]').each(function() {
            var $this       = $(this),
                placeholder = $this.attr('placeholder');

            $this
              .val(placeholder)
              .css("color", "#ccc")
              .focus(function(){
                $this.css("color", "black");
                if ($this.val() == placeholder) {
                  $this.val("");
                }
              })
              .blur(function(){
                if ($this.val() == "") {
                  $this.val(placeholder).css("color", "#ccc");
                }
              });
          });
        } else if ($html.hasClass('lt-ie9')) {
        } else if ($html.hasClass('lt-ie8')) {
        } else if ($html.hasClass('lt-ie7')) {
          $('.table_hover>tbody>tr').on('mouseover', function(){
            $(this).addClass('tr_hover');
          }).on('mouseout', function(){
            $(this).removeClass('tr_hover');
          });

          // 修复 IE 6 下 <select> 层叠顺序过高
          $.fn.bgiframe && $('.fix-z-index').bgiframe();
        }
    });
}

/**
 * 复选框批量操作
 * @param  {object} $trigger jQuery对象。单数，指触发“全选”或“反选”的复选框。
 * @param  {object} $checkboxes jQuery对象。指待批量操作的复选框。
 * @return {null}
 */

function checkAllBox($trigger, $checkboxes) {
    $trigger.on('change', function() {
        $checkboxes.prop('checked', $trigger.prop('checked'));
    });

    $checkboxes.on('change', function() {
        if ($(this).prop('checked') == false) {
            $trigger.prop('checked', false);
        }
    });
}
