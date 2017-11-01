var $ = require('jquery')

function Exposure($target, $target_ct, shouldTriggerFirstTime, handle) {
  this.$target = $target
  this.$target_ct = $target_ct
  this.handle = handle
  this.timer = null
  this.shouldTriggerFirstTime = shouldTriggerFirstTime

  this.bind()
}

Exposure.prototype = {
  bind: function () {
    var $target = this.$target
    var $target_ct = this.$target_ct
    var _this = this

    $target_ct.on('scroll', function () {
      clearTimeout(_this.timer)

      if (isExposure($target, $(this))) {
        setTimeout(function () {
          $target.addClass('rotate')
        }, 20)

        _this.timer = setTimeout(function () {
          _this.handle($target)
        }, 1000)
      }
    })

    if (_this.shouldTriggerFirstTime) {
      $target.trigger('scroll')
    }

    // 判断目标是否出现在容器上
    function isExposure($target, $target_ct) {
      var target_offset_top = $target.offset().top
      var target_ct_height = $target_ct.height()

      if (target_offset_top < target_ct_height) {
        return true
      }

      return false
    }
  }
}

module.exports = Exposure
