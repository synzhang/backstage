if (window.jQuery) {
    $(function(){
        var $html = $('html'),
						$loading = $(parent.document.getElementById('loading')).length === 0 ?
							$('#loading') : $(parent.document.getElementById('loading'));

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
        if ($html.hasClass('lt-ie7')) {
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
