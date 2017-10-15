$(function () {

  function Exposure($node, handle) {
    this.$node = $node;
    this.timmer = null;

    this.bind(handle);
  }

  Exposure.prototype = {
    bind: function (handle) {
      var self = this;
      var $node = this.$node;

      $(window).on('scroll', function () {
        if (self.timmer) {
          window.clearTimeout(self.timmer);
        }

        self.timmer = window.setTimeout(function () {
          if (self.isVisible($node) && self.isFirstShow($node)) {
            handle($node);
          }
        }, 500);
      }).trigger('scroll');
    },
    isVisible: function ($node) {
      var windowHeight = $(window).height();
      var scrollTopHeight = $(window).scrollTop();
      var nodeOffsetTop = $node.offset().top;

      if (nodeOffsetTop > scrollTopHeight && nodeOffsetTop < windowHeight + scrollTopHeight) {
        return true;
      }

      return false;
    },
    isFirstShow: function ($node) {
      if (!$node.attr('data-isFirstShow')) {
        $node.attr('data-isFirstShow', 'true');
        return true;
      } else if ($node.attr('data-isFirstShow') === 'true') {
        $node.attr('data-isFirstShow', 'false');
      }

      return false;
    }
  }

  var exposure = (function () {
    return {
      init: function ($nodes, handle) {
        $nodes.each(function () {
          new Exposure($(this), handle);
        });
      }
    }
  })();

  exposure.init($('.img-collection a img'), function ($img) {
    $img.attr('src', $img.attr('data-src'));
  });
});