var $ = require('jquery')

function GetMovies($ct) {
  this.$ct = $ct
  this.start = 0
  this.$icon = $ct.siblings('.update-icon')
  this.canGetMovies = true

  if ($ct.parent().hasClass('search')) {
    var $search_bar = $ct.siblings('.search-bar')
    this.$input = $search_bar.children('.input')
    this.$btn = $search_bar.children('.search-btn')
    this.current_query_str = ''

    this.bind()
  }
}

GetMovies.prototype = {
  bind: function () {
    var $input = this.$input
    var $btn = this.$btn
    var $icon = this.$icon
    var $ct = this.$ct
    var _this = this

    $btn.on('click', function () {
      if (_this.canGetMovies) {
        var val = $input.val()

        if (/^\s*$/.test(val)) {
          return
        }

        if (_this.current_query_str !== val) {
          _this.current_query_str = val
          $ct.empty()
          _this.start = 0
        }

        $icon.show().addClass('rotate')
        _this.getMovies('search')
      }
    })
  },
  getMovies: function (keyword, callback) {
    if (this.canGetMovies) {
      this.canGetMovies = false
      var _this = this
      var $icon = this.$icon
      var option = {
        dataType: 'jsonp',
        data: {
          start: _this.start
        }
      }

      if (keyword === 'top250') {
        option.url = 'http://api.douban.com/v2/movie/top250'
      } else if (keyword === 'us_box') {
        option.url = 'http://api.douban.com/v2/movie/us_box'
      } else if (keyword === 'search') {
        option.url = 'http://api.douban.com/v2/movie/search'
        option.data.q = this.current_query_str
      }

      $.ajax(option).done(function (data) {
        render(_this.$ct, data)
        $icon.removeClass('rotate')
        callback && callback($icon)
        _this.start += 20
        _this.canGetMovies = true
      }).fail(function () {
        console.log('出错了')
      })

      function render($ct, data) {
        var fragment = document.createDocumentFragment()
        var template = '<li class="movie-list-item"><a>'
                  + '<div class="cover"><img></div>'
                  + '<div class="movie-message"><h2></h2>'
                  + '<p><span class="score"></span>分 / <span class="collect"></span>收藏</p>'
                  + '<p><span class="year"></span> / <span class="type"></span></p>'
                  + '<p>导演：<span class="director"></span></p>'
                  + '<p>主演：<span class="actor"></span></p>'
                  + '</div></a></li>'

        if (data.title === '豆瓣电影北美票房榜') {
          data.subjects.forEach(function (item) {
            var tpl = template
            var actors = ''
            var directors = ''
            var $item = $(template)

            item.subject.directors.forEach(function (obj, index) {
              if (index === item.subject.directors.length - 1) {
                directors += obj.name
              } else {
                directors += obj.name + '、'
              }
            })

            item.subject.casts.forEach(function (obj, index) {
              if (index === item.subject.casts.length - 1) {
                actors += obj.name
              } else {
                actors += obj.name + '、'
              }
            })

            $item.find('a')[0].href = item.subject.alt
            $item.find('.cover img')[0].src = item.subject.images.medium
            $item.find('h2').text(item.subject.title)
            $item.find('.score').text(item.subject.rating.average)
            $item.find('.collect').text(item.subject.collect_count)
            $item.find('.year').text(item.subject.year)
            $item.find('.type').text(item.subject.genres.join(' / '))
            $item.find('.director').text(directors)
            $item.find('.actor').text(actors)

            fragment.appendChild($item[0])
          })
        } else {
          data.subjects.forEach(function (item) {
            var tpl = template
            var actors = ''
            var directors = ''
            var $item = $(template)

            item.directors.forEach(function (obj, index) {
              if (index === item.directors.length - 1) {
                directors += obj.name
              } else {
                directors += obj.name + '、'
              }
            })

            item.casts.forEach(function (obj, index) {
              if (index === item.casts.length - 1) {
                actors += obj.name
              } else {
                actors += obj.name + '、'
              }
            })

            $item.find('a')[0].href = item.alt
            $item.find('h2').text(item.title)
            $item.find('.cover img')[0].src = item.images.medium
            $item.find('.score').text(item.rating.average)
            $item.find('.collect').text(item.collect_count)
            $item.find('.year').text(item.year)
            $item.find('.type').text(item.genres.join(' / '))
            $item.find('.director').text(directors)
            $item.find('.actor').text(actors)

            fragment.appendChild($item[0])
          })
        }

        $ct.append(fragment)
      }
    }
  }
}

module.exports = GetMovies

