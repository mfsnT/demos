$(function () {
  var $slider = $('.slider');
  var $imgs_ct = $('.imgs-container');
  var $img = $imgs_ct.children();
  var $first_img = $img.first().clone();
  var $prev_btn = $('.prev-btn');
  var $next_btn = $('.next-btn');
  var $bullet = $('.bullet');
  var $bullet_btns = $bullet.children();
  var width = $imgs_ct.width();
  var index = 0;
  var btn_clock = false;
  var timmer = null;
  var imgs_len = $img.length;

  $imgs_ct.append($first_img);
  $imgs_ct.css('width', (imgs_len + 1) * width);

  $next_btn.on('click', function () {
    if (btn_clock) {
      return;
    }

    index++;
    slider();
  });

  $prev_btn.on('click', function () {
    if (btn_clock) {
      return;
    }

    index--;
    slider();
  });

  $bullet.on('click', 'li', function () {
    index = $(this).index();
    slider();
  });

  $slider.on('mouseenter', function () {
    window.clearInterval(timmer);
  }).on('mouseleave', function () {
    timmer = window.setInterval(function () {
      $next_btn.trigger('click');
    }, 2000)
  }).trigger('mouseleave');

  function slider() {
    btn_clock = true;

    if (index === -1) {
      $imgs_ct.css('left', - imgs_len * width);
      $imgs_ct.animate({left: - (imgs_len - 1) * width}, function () {
        btn_clock = false;
        index = 3;
        showActiveBtn(index);
      });

      return;
    } else if (index === imgs_len) {
      $imgs_ct.animate({left: - index * width}, function () {
        $(this).css('left', 0);
        btn_clock = false;
        index = 0;
        showActiveBtn(index);
      });

      return;
    }

    $imgs_ct.animate({left: - index * width}, function () {
      btn_clock = false;
      showActiveBtn(index);
    });
  }

  function showActiveBtn (index) {
    $bullet_btns.removeClass('active').eq(index).addClass('active');
  }
});