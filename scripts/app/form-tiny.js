define(['jquery'], function($) {
  var identifie = '[required]',
      pattern = {
            'number': '^[1-9]\\d*$',
            'tel': '1\\d{10}',
            'mobilephone': '^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$',
            'idcard': '\\d{15}|\\d{18}',
            'qq': '[1-9][0-9]{4,}',
            'ip': '\\d+\\.\\d+\\.\\d+\\.\\d+',
            'zipcode': '[1-9]\\d{5}(?!\\d)'
          };

  $('form')
    .filter(function() {
      return $(this).find(identifie).length > 0;
    })
    .attr('novalidate', true)
    .on('submit', function(e) {
      var result = true;

      $(identifie, this).each(function() {
        var $this = $(this),
            type = $this.data('type'),
            isEmpty = $.trim($this.val()) === '',
            isError = !new RegExp(pattern[type]).test($this.val());

        if (isEmpty || isError) {
          var tip = '';

          if (isEmpty) tip = $this.data('validationEmpty');
          else if (isError) tip = $this.data('validationError');

          e.preventDefault();
          if (typeof art != 'undefined') {
            art.dialog.tips(tip, 2);
          } else {
            alert(tip);
          }

          result = false;
          return false;
        }
      });

      if (result) $(window).trigger('loading');

      return result;
    });

  if ($('html').hasClass('lt-ie9')) {
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
          if ($this.val() === "") {
            $this.val(placeholder).css("color", "#ccc");
          }
        });
    });
  }

  return {

    /**
     * 复选框批量操作
     * @param  { Object } $trigger    jQuery对象。单数，指触发“全选”或“反选”的复选框。
     * @param  { Object } $checkboxes jQuery对象。指待批量操作的复选框。
     * @return { Null }
     */
    checkAllBox: function($trigger, $checkboxes) {
      $trigger.on('change', function() {
        $checkboxes.prop('checked', $trigger.prop('checked'));
      });

      $checkboxes.on('change', function() {
        if ($(this).prop('checked') == false) {
          $trigger.prop('checked', false);
        }
      });
    }
  }
});
