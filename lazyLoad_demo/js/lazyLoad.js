$(function () {
  var clock;
  var $imgs = $('.img-list a img');

  function isVisible($node) {
    var windowHeight = $(window).height();
    var scrollTopHeight = $(window).scrollTop();
    var nodeOffsetTop = $node.offset().top;

    if (nodeOffsetTop > scrollTopHeight && nodeOffsetTop < windowHeight + scrollTopHeight) {
      return true;
    }

    return false;
  }

  function isLoad($node) {
    return $node.attr('src') === $node.attr('data-src');
  }

  function showImg($node) {
    $node.attr('src', $node.attr('data-src'));
  }

  function lazyLoad() {
    $imgs.each(function () {
      if (isVisible($(this)) && !isLoad($(this))) {
        showImg($(this));
      }
    });
  }

  $(window).on('scroll', function () {
    if (clock) {
      window.clearTimeout(clock);
    }

    clock = window.setTimeout(function () {
      lazyLoad();
    }, 500);
  }).trigger('scroll');
});