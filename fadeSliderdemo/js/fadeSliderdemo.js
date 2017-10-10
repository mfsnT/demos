$(function () {
  var $slider = $('.slider');
  var $imgs_ct = $('.imgs-container');
  var $imgs = $imgs_ct.children();
  var $prev_btn = $('.prev-btn');
  var $next_btn = $('.next-btn');
  var $bullet = $('.bullet');
  var $bullet_btns = $bullet.children();
  var index = 0;
  var btn_clock = false;
  var timmer = null;


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

    if (index === 4) {
      index = 0;
    } else if (index === -1) {
      index = 3;
    }

    $imgs.eq(index).show();
    $imgs_ct.children('.active-img').fadeOut(function () {
      btn_clock = false;
      $imgs.removeClass('active-img').eq(index).addClass('active-img');
      showActiveBtn(index);
    });
  }

  function showActiveBtn (index) {
    $bullet_btns.removeClass('active').eq(index).addClass('active');
  }
});