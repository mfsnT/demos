var $ = require('jquery')
var Exposure = require('./components/exposure.js')  // 曝光组件
var GetMovies = require('./components/getMovies.js')

$(function () {
  (function () {
    var $section = $('section')
    var $top250_section = $('.top')
    var $north_america_section = $('.north-america')
    var $search_section = $('.search')
    var $btn_group = $('.btn-group')
    var $btns = $btn_group.children()
    var $north_america_movies_ct = $north_america_section.children('.movie-list')
    var top250_movies = new GetMovies($top250_section.children('.movie-list'))
    var north_america_movies = new GetMovies($north_america_movies_ct)
    var search_movies = new GetMovies($search_section.children('.movie-list'))

    // top250区域滑动到底部时自动加载电影
    new Exposure($top250_section.children('.update-icon'), $top250_section, true, function ($target) {
      top250_movies.getMovies('top250')
    })

    // 搜索区域在已经加载过电影的前提下滑动到底部自动加载电影
    new Exposure($search_section.children('.update-icon'), $search_section, false, function ($target) {
      search_movies.getMovies('search')
    })

    $btn_group.on('click', 'li', function () {
      var $this = $(this)
      var index = $this.index()
      var flag = $north_america_movies_ct.html() ? false : true

      if ($this.hasClass('active-btn')) {
        return
      }

      // 当点击的按钮为北美时如果北美区域还没加载过电影则自动加载电影
      if (index === 1 && flag) {
        $north_america_section.children('.update-icon').addClass('rotate')
        north_america_movies.getMovies('us_box', function ($icon) {
          $icon.hide()
        })
      }

      $section.eq(index).addClass('current-section').siblings().removeClass('current-section')
      $btns.eq(index).addClass('active-btn').siblings().removeClass('active-btn')
    })
  })()
})