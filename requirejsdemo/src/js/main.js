require.config({
  baseUrl: 'src/js',
  paths: {
    'jquery': 'https://cdn.bootcss.com/jquery/1.12.4/jquery.min',
    'slider': 'components/slider',
    'waterfall': 'components/waterfall',
    'gotop': 'components/gotop'
  }
});
require(['jquery', 'slider', 'waterfall', 'gotop'], function ($, slider, waterfall,gotop) {
  $(function () {
    var $slider = $('.slider');
    slider.init($slider);

    var $waterfall = $('.waterfall');
    waterfall.init($waterfall, 20);

    gotop.init();
  });
})
