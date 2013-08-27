define(['jquery'], function($) {
  var instance;

  function init() {
    var _separator = ' - ',
        _crumb = window.top.document.getElementById('crumb');

    /**
     * 组合导航
     * @param  { String } title 当前级别导航提示
     * @param  { Number } level 导航级别
     * @return { Null }
     */
    function _join(title, level) {
      var crumbs = _crumb.innerHTML.split(_separator),
          length = crumbs.length;

      crumbs = crumbs.slice(0, level);
      crumbs.push(title);
      _crumb.innerHTML = crumbs.join(_separator);
    }

    return {

      /**
       * 元素在激活（点击）时更新导航
       * @param  { Object }  $element jQuery 对象，触发元素
       * @param  { Object }  $parent  jQuery 对象，触发元素的父级元素
       * @param  { Boolean } level    导航级别
       * @return { Null }
       */
      register: function($element, $parent, level) {
        $element.on('click.crumb', function() {
          $parent.trigger('click.crumb');
          _join(this.innerHTML, level);
        });
      }
    };
  }

  return {
    getInstance: function() {
      if (!instance) {
        instance = init();
      }
      return instance;
    }
  };
});
