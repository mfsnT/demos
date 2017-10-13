$(function () {
  var $ct = $('.ct');
  var $bottom_block = $('.bottom-block');
  var timmer = null;

  function Barrel ($ct, imgNum, imgBaseHeight) {
    this.ct = $ct; //存放照片墙的父容器
    this.imgNum = imgNum; // 一次加载图片的数量
    this.imgBaseHeight = imgBaseHeight; // 设置图片的基本高度（会修改）
    this.imgArr = []; // 存放一行的图片
    this.imgLoad();
  }

  Barrel.prototype = {
    // 随机获取图片的url地址，返回一个url数组
    getImgUrls: function (imgNum) {
      var urlsArr = [];

      for (var i = 0; i < imgNum; i++) {
        var r1 = Math.floor(Math.random() * 5 + 3);
        var r2 = Math.floor(Math.random() * 5 + 3);

        urlsArr.push('https://picsum.photos/' + r1 + '00/' + r2 + '00/?random');
      }

      return urlsArr;
    },

    // 加载图片，等图片加载完毕后触发事件
    imgLoad: function () {
      var urlsArr = this.getImgUrls(this.imgNum);
      var ctWidth = this.ct.width();
      var self = this;

      $.each(urlsArr, function () {
        var $img = $('<img>');

        $img.attr('src', this);
        $img.on('load', function () {
          var imgInfo = {
            target: $(this),
            height: self.imgBaseHeight,
            width: this.width / this.height * self.imgBaseHeight + 10
          }

          self.imgArr.push(imgInfo);
          self.render();
        })
      })
    },

    // 计算一行中存放图片的数量
    render: function () {
      var totalWidth = 0;
      var ctWidth = this.ct.width();
      var lastImg;

      $.each(this.imgArr, function () {
        totalWidth += this.width;
      });

      if (totalWidth > ctWidth) {
        lastImg = this.imgArr.pop();
        totalWidth -= lastImg.width;

        var newImgHeight = ctWidth * this.imgBaseHeight / totalWidth;
        this.layout(newImgHeight);

        this.imgArr = [];
        this.imgArr.push(lastImg);
      }
    },

    // 修改图片的宽高，把图片放到网页中
    layout: function (newImgHeight) {
      var $img_row = $('<div class="img-row"></div>');

      $.each(this.imgArr, function () {
        this.target.height(newImgHeight);

        var $img_box = $('<div class="img-box"></div>');
        $img_box.append(this.target);
        $img_row.append($img_box);
      });

      this.ct.append($img_row);
    }
  }

  // 判断网页是否滚动到底部
  function isBottom($bottomBlock) {
    var windowHeight = $(window).height();
    var scrollTop = $(window).scrollTop();
    var offsetTop = $bottomBlock.offset().top;

    if (offsetTop < windowHeight + scrollTop) {
      return true;
    }

    return false;
  }

  // 如果网页滚动到底部，则加载新的图片
  $(window).on('scroll', function () {
    window.clearTimeout(timmer);

    if (isBottom($bottom_block)) {
      timmer = window.setTimeout(function () {
        new Barrel($ct, 20, 200);
      }, 500);
    }
  }).trigger('scroll');

});