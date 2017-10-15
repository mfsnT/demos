$(function () {
  function FadeSlider($ct) {
    this.$ct = $ct;
    this.index = 0;
    this.btn_clock = false;
    this.timmer = null;

    this.init();
  }

  FadeSlider.prototype = {
    init: function () {
      var $imgs_ct = this.$imgs_ct = this.$ct.children('.imgs-container');
      var $bullet = this.$bullet = this.$ct.children('.bullet');
      this.$imgs = $imgs_ct.children();
      this.$prev_btn = this.$ct.children('.prev-btn');
      this.$next_btn = this.$ct.children('.next-btn');
      this.$bullet_btns = $bullet.children();

      this.bind();
    },
    bind: function () {
      var $next_btn = this.$next_btn;
      var $prev_btn = this.$prev_btn;
      var $bullet = this.$bullet;
      var $ct = this.$ct;
      var self = this;

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
      var $imgs = this.$imgs;
      var $imgs_ct = this.$imgs_ct;
      var self = this;

      self.btn_clock = true;

      if (self.index === 4) {
        self.index = 0;
      } else if (self.index === -1) {
        self.index = 3;
      }

      $imgs.eq(self.index).show();
      $imgs_ct.children('.active-img').fadeOut(function () {
        self.btn_clock = false;
        $imgs.removeClass('active-img').eq(self.index).addClass('active-img');
        self.showActiveBtn(self.index);
      });
    },
    showActiveBtn: function (index) {
      this.$bullet_btns.removeClass('active').eq(this.index).addClass('active');
    }
  }

    var fadeSlider = (function () {
      return {
        init: function ($ct) {
          $ct.each(function () {
            new FadeSlider($(this));
          })
        }
      }
    })();

    fadeSlider.init($('.slider'));
});