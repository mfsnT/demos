define(['jquery'], function ($) {
  function GoTop() {
    this.init();
  }

  GoTop.prototype = {
    init: function () {
      var $gotop = $('<div class="gotop">回到顶部</div>');
      var btn_clock = false;

      $gotop.on('click', function () {
        if (btn_clock) {
          return;
        }

        btn_clock = true;

        $('html').animate({scrollTop: 0}, 800, function () {
          btn_clock = false;
        });
      });

      $('body').append($gotop);
    }
  }

  return {
    init: function () {
      new GoTop();
    }
  }
});