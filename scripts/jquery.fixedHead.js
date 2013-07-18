// IE 6 Fixed Position Hack
// * html, * html body {
//   background-image: url(about:blank);
//   background-attachment:fixed;
// }

// * html .ie6fixedTop {
//   position: absolute;
//   /*left: expression(eval(document.documentElement.scrollLeft));*/
//   top: expression(eval(document.documentElement.scrollTop));
// }
(function($) {
	function createObj(o) {
		function F() {}
		F.prototype = o;
		return new F();
	}

	FixedHead = {
		init: function(elem, options) {
			var self = this;
			self.$elem = $(elem);
			self.options = $.extend({}, $.fn.fixedHead.options, options);

			self.$head = self.$elem.find(self.options.head);
			self.$headCloneWraped = $('<' + self.options.wrapper + ' />')
			.append(self.$head.clone(true))
			.addClass(self.options.headClass)
			.hide()
			.appendTo('body');
			self.$body = self.$elem.find(self.options.body);

			if ($('html').hasClass('lt-ie7')) {
				self.$headCloneWraped.addClass('ie6fixedTop').css({
					'left': function() {
						return self.$elem.offset().left;
					}
				});
			} else {
				self.$headCloneWraped.css({
					'position': 'fixed',
					'top': 0,
					'left': function() {
						return self.$elem.offset().left;
					}
				});
			}

			self.align(self.$head, self.$headCloneWraped.children());

			self.timer = 0;
			$(window).on('scroll', function() {
				if (!self.timer) {
					self.timer = setTimeout(function() {
						var scrollTop = $(window).scrollTop();
						self.$headCloneWraped[scrollTop >= self.$head.offset().top && scrollTop <= (self.$body.offset().top + self.$body.height()) ? 'show' : 'hide']();
						self.timer = 0;
					}, 100);
				}
			}).on('resize', function() {
				self.align(self.$head, self.$headCloneWraped.children());
			});
		},

		align: function($elem, $elemClone) {
			var self = this;

			for (var i = 0,j = $elemClone.length; i < j; i++) {
				var $curElem = $elem.eq(i);
				var $curElemClone = $elemClone.eq(i);

				$curElemClone.css({
					width: function() {return parseInt($curElem.css('width')) + self.options.gutter;},
					left: function() {return $curElem.css('left');}
				});

				if ($curElemClone.children().length !== 0) {
					self.align($curElem.children(), $curElemClone.children());
				}
			}
		}
	};

	$.fn.fixedHead = function(options) {
		var data = this.data('fixedHead');
		if (data) return data;

		return this.each(function() {
			var fixedHead = createObj(FixedHead);
			fixedHead.init(this, options);
			$(this).data('fixedHead', fixedHead);
		});
	};

  // @param head 需要固定显示的元素
  // @param headClass 可选，添加到固定头部的 css class
  // @param wrapper 固定头部的包装器元素，为防止固定（Fixed）的设置影响头部元素，将固定（Fixed）设置在包装器上
  // @param body 需要固定头部提示的主体元素
  // @param gutter 固定头部内子元素之间的间距  @TODO
  $.fn.fixedHead.options = {
    head: '',
    headClass: '',
    wrapper: 'div',
    body: '',
    gutter: 0
  };
})(jQuery);
