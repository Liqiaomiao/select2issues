# select2-mcustomscrollbar-issues
  解决select2 结合 mcustomscrollbar悬停在下拉列表不能滚动
  原因：select2插件绑定了滚动事件
  解决方式：取消select2的scroll绑定
   $("select").on('select2:open', function (evt) {
          $(".select2-results ul.select2-results__options").unbind("mousewheel");
          $('.select2-results').mCustomScrollbar();
      });
# select2 按选择先后顺序显示在输入框
  按选择先后顺序显示在输入框，并且下拉列表保持初始顺序
  取值做的更改：原select2.js 1665行增加id，方便重排序后的取值。
