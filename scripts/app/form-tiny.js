define(['jquery'], function($) {
  $('form')
    .filter(function() {
      return $(this).find(identifie).length > 0;
    })
    .attr('novalidate', true)
    .on('submit', function(e) {
      var result = true;

      $(identifie, this).each(function() {
        if ($(this).val() === '') {
          var tip = $(this).data('validationEmpty');

          e.preventDefault();
          if (typeof art != 'undefined') {
            art.dialog.tips(tip, 2);
          } else {
            alert(tip); // 兼容下先
          }

          result = false;
          return false;
        }
      });

      if (result) $(window).trigger('loading');

      return result;
    });
});
