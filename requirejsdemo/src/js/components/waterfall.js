define(['jquery'], function ($) {
  function WaterFall($ct, num) {
    this.$ct = $ct;
    this.btn_clock = null;
    this.heightArr = [];
    this.num = num;
    this.init();
  }

  WaterFall.prototype = {
    init: function () {
      var $ct = this.$ct;
      var $imgs = this.$imgs = $ct.children('.imgs');
      var nodeWidth = this.nodeWidth = $ct.find('.imgs-item').outerWidth(true);
      var cols = Math.floor($imgs.width() / nodeWidth);
      this.$btn = $ct.find('.loadmore');

      $ct.css('width', nodeWidth * cols);

      for (var i = 0; i < cols; i++) {
        this.heightArr[i] = 0;
      }

      this.bind();
    },
    bind: function () {
      var $btn = this.$btn;
      var self = this;

      $btn.on('click', function () {
        if (self.btn_clock) {
          return;
        }

        self.load();
      }).trigger('click');
    },
    load: function () {
      var self = this;
      this.btn_clock = true;
      this.$btn.text('加载中...');

      $.get({
        url: '/getImgs',
        dataType: 'json',
        data: {
          num: self.num,
        }
      }).done(function (data) {
          if (data.status === 0) {
            self.render(self.getNode(data));
            self.btn_clock = false;
            self.$btn.text('加载更多')
          }
        }).fail(function () {
          document.write('获取数据失败，请检查网络连接');
          self.btn_clock = false;
          self.$btn.text('加载更多')
      });
    },
    getNode: function (data) {
      var node = '';

      data.data.forEach(function (url) {
        node += '<li class="imgs-item"><img src="' + url + '"></li>';
      });

      return $(node);
    },
    render: function ($nodes) {
      var $imgs = this.$imgs;
      var self = this;

      $nodes.each(function () {
        var $this = $(this);

        $this.find('img').on('load', function () {
          $imgs.append($this);
          self.layout($this);
        });
      });
    },
    layout: function ($node) {
      var minHeight = Math.min.apply(null, this.heightArr);
      var minHeightIndex = this.heightArr.indexOf(minHeight);
      var $imgs = this.$imgs;

      $node.css({
        top: minHeight,
        left: this.nodeWidth * minHeightIndex,
        opacity: 1
      });

      this.heightArr[minHeightIndex] = this.heightArr[minHeightIndex] + $node.outerHeight(true);
      $imgs.css('height', Math.max.apply(null, this.heightArr));
    }
  }

  return {
    init: function ($ct, num) {
      $ct.each(function () {
        new WaterFall($(this), num);
      });
    }
  }
});