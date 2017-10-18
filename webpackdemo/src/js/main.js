var $ = require('jquery');
var slider = require('./components/slider.js');
var waterfall = require('./components/waterfall');
var gotop = require('./components/gotop');


$(function () {
  var $slider = $('.slider');
  slider.init($slider);

  var $waterfall = $('.waterfall');
  waterfall.init($waterfall, 20);

  gotop.init();
});

