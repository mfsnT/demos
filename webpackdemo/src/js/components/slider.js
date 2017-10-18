  var $ = require('jquery');
  
  function Slider($ct) {
    this.$ct = $ct;
    this.index = 0;
    this.btn_clock = false;
    this.timmer = null;

    this.init();
  }

  Slider.prototype = {
    init: function () {
      var $ct = this.$ct;
      var $imgs_ct = this.$imgs_ct = $ct.children('.imgs-container');
      var windowWidth = $(window).width();
      var $imgs = $imgs_ct.children();

      $imgs.each(function () {
        $(this).width(windowWidth);
      });

      var $first_img = $imgs.first().clone();
      var imgs_len = this.imgs_len = $imgs.length;
      var width = this.width = $imgs_ct.width();
      var $bullet = this.$bullet = $ct.children('.bullet');
      this.$next_btn = $ct.children('.next-btn');
      this.$prev_btn = $ct.children('.prev-btn');
      this.$bullet_btns = $bullet.children();

      $imgs_ct.append($first_img);
      $imgs_ct.css('width', (imgs_len + 1) * width);

      this.bind();
    },
    bind: function () {
      var self = this;
      var $next_btn = this.$next_btn;
      var $prev_btn = this.$prev_btn;
      var $ct = this.$ct;
      var $bullet = this.$bullet;

      $next_btn.on('click', function () {
        if (self.btn_clock) {
          return;
        }

        self.index++;
        self.slider();
      });

      $prev_btn.on('click', function () {
        if (self.btn_clock) {
          return;
        }

        self.index--;
        self.slider();
      });

      $bullet.on('click', 'li', function () {
        if ($(this).hasClass('active')) {
          return;
        }

        self.index = $(this).index();
        self.slider();
      });

      $ct.on('mouseenter', function () {
        window.clearInterval(self.timmer);
      }).on('mouseleave', function () {
        self.timmer = window.setInterval(function () {
          $next_btn.trigger('click');
        }, 2000)
      }).trigger('mouseleave');
    },
    slider: function () {
      var self = this;
      var $imgs_ct = this.$imgs_ct;
      var width = this.width;
      var imgs_len = this.imgs_len;
      self.btn_clock = true;

      if (self.index === -1) {
       $imgs_ct.css('left', - imgs_len * width);
        $imgs_ct.animate({left: - (imgs_len - 1) * width}, function () {
          self.btn_clock = false;
          self.index = 3;
          self.showActiveBtn(self.index);
        });

        return;
      } else if (self.index === imgs_len) {
        $imgs_ct.animate({left: - self.index * width}, function () {
          $(this).css('left', 0);
          self.btn_clock = false;
          self.index = 0;
          self.showActiveBtn(self.index);
        });

        return;
      }

      $imgs_ct.animate({left: - self.index * width}, function () {
        self.btn_clock = false;
        self.showActiveBtn(self.index);
      });
    },
    showActiveBtn: function (index) {
      this.$bullet_btns.removeClass('active').eq(index).addClass('active');
    }
  }

  module.exports = {
    init: function ($ct) {
      $ct.each(function () {
        new Slider($(this));
      });
    }
  }
