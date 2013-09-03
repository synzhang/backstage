# Backstage

## 简介

  借用 PHPCMS 设计风格开发的管理后台模版。[[GitHub](https://github.com/SynZhang/backstage)]

### 浏览器支持

* Chrome (Mac, Windows)
* Firefox (Mac, Windows)
* Safari (Mac, Windows)
* Opera (Mac, Windows)
* IE (IE 6+)

## 开发规范

### 统一代码风格

  **强烈推荐**安装 [EditorConfig](http://editorconfig.org/ "支持 AppCode、Code::Blocks、Emacs、Geany、Gedit、IntellijIDEA、jEdit、Notepad++、PHPStrom、PyCharm、RubyMine、Sublime Text、TextMate、Vim、Visual Studio、WebStorm。") 的编辑器插件并使用当前 .editorconfig 配置编写统一风格的代码。

### 目录结构

```
    backstage/
    ├── dist/ ----------------------------------- 构建目录
    │   ├── images/ ----------------------------- 图片目录
    │   ├── scripts/ ---------------------------- JavaScript 脚本目录
    │   ├── styles/ ----------------------------- CSS 样式目录
    │   ├── index.html -------------------------- 首页
    ├── images/ --------------------------------- 图片目录
    ├── node_modules/ --------------------------- Node.js 模块目录
    │   ├── *.* --------------------------------- Node.js 模块
    ├── scripts/ -------------------------------- JavaScript 脚本目录
    │   ├── app/ -------------------------------- backstage JavaScript 模块目录
    │   │   ├── main/ --------------------------- 各个 Page 主入口 JavaScript目录
    │   │   │   ├── common.js ------------------- 主入口 JavaScript 中的通用代码
    │   │   │   ├── *.js ------------------------ 主入口 JavaScript
    │   │   ├── *.js ---------------------------- JavaScript 模块
    │   ├── lib/ -------------------------------- 第三方 JavaScript 目录
    │   │   ├── *.* ----------------------------- 第三方 JavaScript 模块
    │   ├── config.js --------------------------- RequireJS 全局配置文件
    ├── styles/ --------------------------------- CSS 样式目录
    │   ├── backstage.css ----------------------- CSS 主文件
    │   ├── *.css ------------------------------- CSS 模块
    │   ├── shame.css --------------------------- CSS 补丁
    └── templates/ ------------------------------ 示例模版目录
    │   ├── *.html ------------------------------ 示例模版文件
    ├── .editorconfig --------------------------- EditorConfig 编辑器插件配置文件
    ├── Gruntfile.js ---------------------------- Grunt 任务配置文件
    ├── index.html ------------------------------ 首页
    ├── package.json ---------------------------- Node.js 包描述文件
    └── readme.md ------------------------------- 项目简介
```

### 基本模板

  请参考文件 templates/template.html 。

### 注释

#### HTML

    <form>
    </form> <!-- / form -->

    <div id="wrapper">
    </div> <!-- / #wrapper -->

    <div class="module">
    </div> <!-- / .module -->

#### CSS

  遵守 [KSS](http://warpspire.com/kss/)，建立 Live StyleGuide 。

    /*
    [description] || Experimental: [description] || Deprecated: [description] YYYY-MM-DD

    .class               - [description]
    :pseudo-class        - [description]

    Styleguide 0.0.0. || No styleguide reference.
    */

#### JavaScript

  遵守 [JSDoc](http://usejsdoc.org/) 。

    /**
     * [description]
     * @param  {[type]} param       [description]
     * @return {[type]}             [description]
     */

  详细的标签使用建议参考 Google JavaScript Style Guide 中的 [Comments](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml#Comments) 章节。

### 建议设计模式

#### CSS 组件

    .component --------------------------------- 组件
    .component_module -------------------------- 组件子模块
    .component-modifier ------------------------ 组件派生类
    .is-state ---------------------------------- 组件状态
    .js-hook ----------------------------------- JavaScript 专属钩子
    .shame-classname --------------------------- 补丁（统一放在 styles/shame.css 中，详细注释并定期修复）

  由于 IE 6 不支持部分常用选择器（如：子选择器 .foo > .bar ，链式选择器 .foo.bar 等），因此采用以下命名方式填补不足：

    .is-component_module-modifier

#### jQuery 插件

  Bootstrap 的 [Data-API](http://getbootstrap.com/javascript/) 模式能有效分离内容、样式、行为。

  HTML:

    <element attribute="value" data-attribute="value"></element>

  JavaScript:

    (function($) {

      // Module Public Class Definition
      // ==============================

      var Module = function(element, options) {
        this.$element = $(element);
        this.options  = options;
      };

      Module.prototype.method = function() {
        // do something...
      };

      // Module Default Options

      Module.DEFAULTS = {
        'key': 'value'
      };


      // Module jQuery Plugin Definition
      // ===============================

      var old = $.fn.module;

      $.fn.module = function(option) {
        return this.each(function() {
          var $this   = $(this),
              data    = $this.data('module'),
              options = $.extend(
                {},
                Module.DEFAULTS,
                $this.data(),
                typeof option == 'object' && option
              );

          if (!data) $this.data('module', (data = new Module(this, options)));
          if (typeof option == 'string') data[option]();
        });
      };

      $.fn.module.Constructor = Module;


      // Module No Conflict
      // ==================

      $.fn.module.noConflict = function() {
        $.fn.module = old;
        return this;
      };


      // Module Data-API
      // ===============

      $(document).on('event.module.data-api', '[data-toggle="module"]', function(e) {
        e.preventDefault();

        $(this).module('method');
        // do something...
      });

    })(jQuery);

## 任务自动化

  建立项目前请确认已安装 [Node.js](http://nodejs.org/)、 [Grunt](http://gruntjs.com/) 。

  在终端中切换至项目目录，然后根据任务运行如下命令：

  * 项目初始化-安装 NPM 模块： `npm install`
  * 开发－启动 Web 服务器，实时监测项目目录中的文件更新并刷新浏览器：`grunt`
  * 构建发布版本－校验 CSS、JavaScript，合并压缩 CSS 、JavaScript 模块：`grunt build`
