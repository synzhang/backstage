define(['jquery.validator'], function() {

  /**
   * 表单验证
   * 引入 validator.js 插件后在待验证的 HTML 表单元素上添加参数配置。
   * @param    { String } data-type 待验证项的数据类型
   * @param    { String } data-validation-empty 验证为空时的提示信息
   * @param    { String } data-validation-error 验证失败时的提示信息
   * @param    { String } data-validation-placement {'top', 'right', 'bottom', 'left'}
   *                      提示信息显示在待验证项周围时的方位
   */
  var identifie = '[required]',
      pattern = {
        'number' : '^[1-9]\\d*$',
        'tel'    : '(\\d{4}-|\\d{3}-)?(\\d{8}|\\d{7})',
        'mobile' : '1\\d{10}',
        'idcard' : '\\d{15}(\\d\\d[0-9xX])?',
        'qq'     : '[1-9]\\d{4,}',
        'ip'     : '((2[0-4]\\d|25[0-5]|[01]?\\d\\d?)\\.){3}(2[0-4]\\d|25[0-5]|[01]?\\d\\d?)',
        'zipcode': '[1-9]\\d{5}'
      };

  // 表单验证初始化
  $('form').validator();

  // 初始化与更新提示信息的内容与位置
  $(identifie).each(function() {
    var $self          = $(this),
        $validation    = $('<div>').addClass('validation')
                          .text($(this).data('validation-empty'))
                          .insertAfter(this),
        placement      = $self.data('validation-placement'),
        type           = $self.data('type'),
        top            = $self.offset().top,
        left           = $self.offset().left,
        validationTop  = top,
        validationLeft = left;

    switch (placement) {
      case 'top':
        validationTop = top - $validation.outerHeight() - 6;
      break;
      case 'right':
        validationLeft = left + $self.outerWidth() + 6;
      break;
      case 'bottom':
        validationTop = top + $self.outerHeight() + 6;
      break;
      case 'left':
        validationLeft = left - $validation.outerWidth() - 6;
      break;
    }

    $validation.css({
      'top' : validationTop,
      'left': validationLeft
    }).addClass('validation-' + placement);

    $(this).attr('pattern', pattern[$(this).data('type')]);
    $($self.data('linkage-trigger')).on('change', function() {
      var type = $(this).children('option[value=' + $(this).val() + ']')
                  .data('linkage-type');
      $self.attr('pattern', pattern[type]).data('type', type);
    });
  }).on('blur', function() {
    var $self = $(this),
        tip = '',
        $validationTarget = $self.closest($self.data('parent'));

    if ($validationTarget.hasClass('empty')) {
      tip = $self.data('validation-empty');
    } else if ($validationTarget.hasClass('error')) {
      tip = $self.data('validation-error');
    }
    $self.next('.validation').text(tip);
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

  // 密码强度验证
  /* var identifie = 'input[type="password"][verified]';

  $(identifie).each(function() {
    var $self = $(this),
    $validation = $('<div>', {
      'class': 'password_strength'
    }).insertAfter(this);

    if (!$('html').hasClass('lt-ie8')) {
      $('.password_strength').css({
        'margin-left': function() { return $(this).prev(identifie).outerWidth(true) + 5; },
        'margin-top': function() { return -$(this).prev(identifie).outerHeight(true); }
      });
    }
  }).password_strength({
    'container': identifie + ' + .password_strength',
    'minLength': 8,
    'texts': {
      1: '密码强度太弱了！请重新输入8位以上包含数字、小写字母、大写字母的密码。',
      2: '密码强度还不够。',
      3: '密码强度适中。',
      4: '密码强度很高！',
      5: '密码强度非常高！'
    },
    'onCheck': function(level) {
      var $btn = $('#changePassword').find('input[type="submit"]');
      if (level > 1) {
        $btn.removeAttr('disabled');
      } else {
        $btn.prop('disabled', true);
      }
    }
  }).on('blur', function() {
    var $passwordStrength = $(this).next('.password_strength');

    if ($passwordStrength.is(':hidden') && $passwordStrength.text() !== '') {
      $passwordStrength.show();
    } else if ($passwordStrength.text() === '') {
      $passwordStrength.hide();
    }
  }).on('keyup', function() {
    if (this.value === '') {
      $(this).next('.password_strength').hide();
    }
  });*/

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
