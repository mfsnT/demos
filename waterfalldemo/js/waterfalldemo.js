$(function () {
  var curPage = 1;
  var timmer = null;
  var $ct = $('.news');
  var $bottom_block = $('.bottom-block');
  var nodeWidth = $('.news .news-item').outerWidth(true); // 获取元素的宽度，包括内外边距和边框
  var cols = Math.floor($ct.width() / nodeWidth); // 计算容器中排列元素的列数
  var heightArr = []; // 存放各列的元素高度之和

  // 给容器的外层设置宽度，使整个容器居中
  $ct.parent().css('width', nodeWidth * cols);

  // 初始化列高度数组，
  for (var i = 0; i < cols; i++) {
    heightArr[i] = 0;
  }


  // 通过jsonp的方式向后端获取数据
  function load() {
    $.ajax({
      url: 'https://platform.sina.com.cn/slide/album_tech',
      dataType: 'jsonp',
      jsonp: 'jsoncallback',
      data: {
        app_key: 1271687855,
        num: 10,
        page: curPage
      }
    }).done(function (data) {
        if (data && data.status && data.status.code === '0') {
          curPage++;
          render(getNode(data));
        }
      }).fail(function () {
        document.write('获取数据失败，请检查网络连接');
      });
  }

  // 将得到的数据拼接成DOM字符串，再将这个字符串转换为jQuery对象并返回出去
  function getNode(data) {
    var node = '';

    data.data.forEach(function (obj) {
      node += '<li class="news-item"><a href="' + obj.url + '">';
      node += '<img src="' + obj.img_url + '">';
      node += '<h3>' + obj.name + '</h3>';
      node += '<p>' + obj.short_intro + '</p></a></li>';
    });

    return $(node);
  }

  /*遍历jQuery对象，给每个对象的后代元素‘img’绑定一个‘load’事件，
    等到图片加载完毕后，再将加载完毕的图片所在的jQuery对象渲染到网页上
  */
  function render($node) {
    $node.each(function () {
      var $this = $(this);

      $this.find('img').on('load', function () {
        $ct.append($this);
        waterfall($this);
      });
    });
  }

  // 计算jQuery对象在网页中摆放的位置，形成瀑布流的效果
  function waterfall ($node) {
    var minHeight = Math.min.apply(null, heightArr);
    var minHeightIndex = heightArr.indexOf(minHeight);

    $node.css({
      top: minHeight,
      left: nodeWidth * minHeightIndex,
      opacity: 1
    });

    heightArr[minHeightIndex] = heightArr[minHeightIndex] + $node.outerHeight(true);
    $ct.css('height', Math.max.apply(null, heightArr)); // 给容器设置高度
  }

  // 判断隐藏的元素是否到达网页底部
  function isVisible($node) {
    var widthHeight = $(window).height();
    var srcollTop = $(window).scrollTop();
    var nodeOffsetTop = $node.offset().top;

    if (nodeOffsetTop - 400 <= widthHeight + srcollTop) {
      return true;
    }

    return false;
  }

  // 如果滑动到网页的底部，则自动加载新的数据
  $(window).on('scroll', function () {
    window.clearTimeout(timmer);

    if (isVisible($bottom_block)) {
        timmer = window.setTimeout(function () {
          load();
      }, 500);
    }
  }).trigger('scroll');
});