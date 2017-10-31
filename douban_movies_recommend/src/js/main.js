var $ = require('jquery')
var Exposure = require('./components/exposure.js')
var GetMovies = require('./components/getMovies.js')

$(function () {
  (function () {
    var $section = $('section')
    var $btn_group = $('.btn-group')
    var $btns = $btn_group.children()
    var $top250 = $('.top')
    var $north_america = $('.north-america')
    var $search = $('.search')
    var $north_america_ct = $north_america.children('.movie-list')
    var top250_movies = new GetMovies($top250.children('.movie-list'))
    var north_america_movies = new GetMovies($north_america_ct)
    var search_movies = new GetMovies($search.children('.movie-list'))

    new Exposure($top250.children('.update-icon'), $top250, true, function ($target) {
      top250_movies.getMovies('top250')
    })

    new Exposure($search.children('.update-icon'), $search, false, function ($target) {
      search_movies.getMovies('search')
    })

    $btn_group.on('click', 'li', function () {
      var $this = $(this)
      var index = $this.index()

      if ($this.hasClass('active-btn')) {
        return
      }

      if (index === 1 && $north_america_ct.html() ? false : true) {
        $north_america.children('.update-icon').addClass('rotate')
        north_america_movies.getMovies('us_box', function ($icon) {
          $icon.hide()
        })
      }

      $section.eq(index).addClass('current-section').siblings().removeClass('current-section')
      $btns.eq(index).addClass('active-btn').siblings().removeClass('active-btn')
    })
  })()
})