$(function () {
  function AudioPlayer ($ct) {
    this.$ct = $ct
    this.songsArr = []  // 存放加载过的歌曲
    this.current_song_index = 0  // 当前播放歌曲的索引
    this.lyric_timeline = null  // 当前歌词的时间表
    this.current_lyric_index = 0  // 当前歌词的索引
    this.lyric_ct_scroll_height = 0  // 歌词容器的滑动高度
    this.shouldUpdate = true
    this.shouldScroll = true
    this.shouldPlayNextSong = false
    this.shouldShowTips = false

    this.init()
  }

  AudioPlayer.prototype = {
    // 初始化配置
    init: function () {
      var $ct = this.$ct
      this.$cover = $ct.find('.cover img')

      this.$singer = $ct.find('.singer')
      this.$song_title = $ct.find('.song-title')
      this.$lyric_ct = $ct.find('.lyric-ct')

      this.$audio = $ct.find('audio')

      this.$total_progress_bar = $ct.find('.total-progress-bar')
      this.$play_progress_bar = $ct.find('.play-progress-bar')

      this.$channel_btn = $ct.find('.channel a')
      this.$channel_list = $ct.find('.channel-list')
      this.channel_id = $ct.find('.channel-list-item').eq(0).attr('data-channel-id')

      this.$prev_btn = $ct.find('.prev')
      this.$play_btn = $ct.find('.play')
      this.$next_btn = $ct.find('.next')

      this.$vol_panel = $ct.find('.volume-panel')
      this.$vol_btn = $ct.find('.volume a')

      this.$tips = $ct.find('.tips')

      this.bind()
    },
    // 绑定事件
    bind: function () {
      var _this = this

      var $lyric_ct = this.$lyric_ct

      var $audio = this.$audio

      var $total_progress_bar = this.$total_progress_bar
      var $play_progress_bar = this.$play_progress_bar

      var $channel_btn = this.$channel_btn
      var $channel_list = this.$channel_list
      var $channel_item = $channel_list.children()

      var $prev_btn = this.$prev_btn
      var $play_btn = this.$play_btn
      var $i = $play_btn.children()
      var $next_btn = this.$next_btn

      var $vol_btn = this.$vol_btn
      var $vol_panel = this.$vol_panel
      var $vol_bar = $vol_panel.children()
      var $vol_bar_current = $vol_bar.children()


      $audio.on('timeupdate', function () {
        if (_this.shouldUpdate) {
          // 播放条自动变长
          var play_bar_width = Math.floor(this.currentTime / this.duration * 100)
          $play_progress_bar.width(play_bar_width + '%')

          _this.shouldUpdate = false
          _this.lyricScroll(this.currentTime) // 歌词滑动

          setTimeout(function () {
            _this.shouldUpdate = true
          }, 750)
        }
      }).on('playing', function () {
        $i.removeClass('icon-play').addClass('icon-pause')
        $play_btn.attr('data-isPlaying', true)
      }).on('pause', function () {
        $i.removeClass('icon-pause').addClass('icon-play')
        $play_btn.attr('data-isPlaying', false)
      }).on('ended', function (e) {
        $next_btn.trigger('click', e) // 播放完后自动加载下一首歌
      })

      $total_progress_bar.on('click', function (e) {
        var index = 0;

        var currentTime = e.offsetX / 340 * $audio[0].duration
        $audio[0].currentTime = currentTime
        var play_bar_width = Math.floor(currentTime / $audio[0].duration * 100)

        $play_progress_bar.width(play_bar_width + '%')
        _this.lyric_ct_scroll_height = 0 // 清空滑动高度

        // 点击进度条时若播放器不在播放状态则自动播放
        if (!isPlaying($play_btn)) {
           $play_btn.trigger('click', e)
        }

        // 如果播放时间超过歌词时间表的最后一个值
        if (currentTime > _this.lyric_timeline[_this.lyric_timeline.length - 1]) {
          _this.current_lyric_index = _this.lyric_timeline.length - 1
          _this.lyric_ct_scroll_height = _this.lyric_ct_total_height
          return
        }

        // 判断播放时间所对应的歌词
        while (index < _this.lyric_timeline.length) {
          if (currentTime < _this.lyric_timeline[index]) {
            _this.current_lyric_index = index - 1
            break
          }

          _this.lyric_ct_scroll_height += _this.$lyric_collection.eq(index).outerHeight(true) - 10
          index++
        }

        _this.lyric_ct_scroll_height -= _this.$lyric_collection.eq(index).outerHeight(true) - 10
      })



      $channel_btn.on('click', function (e) {
        e.stopPropagation()
        e.preventDefault()
        $channel_list.show()
      })

      $('body').on('click', function () {
        $channel_list.hide()
        $vol_panel.removeClass('show-volume-panel')
      })

      $channel_list.on('click', 'li', function () {
        var $target = $(this)
        var index = $target.index()

        if ($target.hasClass('active-channel')) {
          return
        }

        _this.channel_id = $target.attr('data-channel-id')
        $target.addClass('active-channel').siblings().removeClass('active-channel')
        _this.getSong()  // 切换频道时自动加载新歌
      })

      $prev_btn.on('click', function (e) {
        e.preventDefault()

        if(_this.current_song_index === 0) {
          _this.showTips('已经是最后一首歌曲了')
          return
        }

        var index = --_this.current_song_index

        _this.render(_this.songsArr[index])
        _this.playSong(_this.songsArr[index].url)
      })


      $play_btn.on('click', function (e) {
        e.preventDefault()

        if (!isPlaying($(this))) {
          $audio[0].play()
        } else {
          $audio[0].pause()
        }
      })

      $next_btn.on('click', function (e) {
        e.preventDefault()

        if (_this.shouldPlayNextSong) {
          return
        }

        if (_this.current_song_index + 1 < _this.songsArr.length) {
          var index = ++_this.current_song_index

          _this.render(_this.songsArr[index])
          _this.playSong(_this.songsArr[index].url)

          return
        }

        _this.shouldPlayNextSong = true
        _this.getSong()
      })


      $vol_btn.on('click', function (e) {
        e.preventDefault()
        e.stopPropagation()
        $vol_panel.toggleClass('show-volume-panel')
      })

      $vol_bar.on('click', function (e) {
        var vol_bar_width = Math.floor(e.offsetX / 150 * 100)

        if (vol_bar_width < 0) {
          return
        }

        $vol_bar_current.width(vol_bar_width + '%')
        $audio[0].volume = vol_bar_width / 100
      })

      // 鼠标悬停在歌词容器上时停止歌词滑动
      $lyric_ct.on('mouseenter', function () {
        _this.shouldScroll = false
      }).on('mouseleave', function () {
        _this.shouldScroll = true
      })

      // 判断播放器是否正在播放
      function isPlaying($play_btn) {
        if ($play_btn.attr('data-isPlaying') === 'false') {
          return false
        } else {
          return true
        }
      }

    },
    // 获取歌曲
    getSong: function () {
      var _this = this

      $.get('https://jirenguapi.applinzi.com/fm/getSong.php', {
        channel: _this.channel_id
      }).done(function (data) {
        var song_msg = _this.getSongMsg(JSON.parse(data))

        if (song_msg.url === null) {
          _this.getSong()
          return
        }else if (_this.songsArr.length > 0) {
          _this.current_song_index++
        }

        _this.getLyric(song_msg)
      }).fail(function () {
        _this.showTips('获取歌曲失败，请检查网络')
      })
    },
    // 获取歌词
    getLyric: function (song_msg) {
      var _this = this

      $.get('https://jirenguapi.applinzi.com/fm/getLyric.php', {
        sid: song_msg.sid
      }).done(function (lyric) {
        song_msg.lyric = JSON.parse(lyric).lyric

        _this.songsArr.push(song_msg)
        _this.render(song_msg)
        _this.playSong(song_msg.url)
      }).fail(function () {
        song_msg.lyric = null

        _this.showTips('获取歌词失败')
        _this.songsArr.push(song_msg)
        _this.render(song_msg)
        _this.playSong(song_msg.url)
      })
    },
    // 将歌词信息整理为对象并返回
    getSongMsg: function (song_data) {
      var songMsg = {
        sid: song_data['song'][0]['sid'],
        title: song_data['song'][0]['title'],
        cover: song_data['song'][0]['picture'],
        singer: song_data['song'][0]['artist'],
        url: song_data['song'][0]['url']
      }

      return songMsg
    },
    // 替换audio标签的src
    playSong: function (song_url) {
      this.$play_progress_bar.width(0)
      this.$audio[0].src = song_url
      this.$audio[0].play()
    },
    // 将歌曲信息渲染到播放器上
    render: function (song_msg) {
      var lyric_text = '<p class="current-lyric">音乐来自百度FM, by 饥人谷</p>'
      var index1 = 0
      var index2 = 0
      var lyrics = []
      var timeline = []
      var time = ''
      var prev_time = 0
      var _this = this

      if (song_msg.lyric !== null) {
        lyrics = song_msg.lyric.split(/[\r\n]{1,2}/)

        lyrics = lyrics.filter(function (item) {
          if (/^\[.+\]$/.test(item)) {
            return false
          }

          return true
        })

        lyrics.forEach(function (item, idx) {
          index1 = item.lastIndexOf(']')
          index2 = item.lastIndexOf('[')
          time = item.substr(index2 + 1, 8)

          if (/^\d{2}:\d{2}\.\d{2}$/.test(time)) {
            time = time[1] * 60 + (+(time[3] + time[4]))

            if (time !== 0) {
              if (time === prev_time) {
                lyric_text = lyric_text.substr(0, lyric_text.length - 4) + '<br>' + item.substr(index1 + 1) + '</p>'
              }else {
                prev_time = time
                timeline.push(time)
                lyric_text += '<p>' + item.substr(index1 + 1) + '</p>'
              }
            }
          }
        })

        if (timeline.length === 0) {
          lyric_text += '<p>该歌曲为无歌词</p>'
        }

        this.lyric_timeline = timeline
        this.$lyric_ct.empty().append(lyric_text)
        this.$lyric_collection = this.$lyric_ct.children()
        this.current_lyric_index = 0
        this.lyric_ct_total_height = (function () {
          var height = 0

          for (var i = 0; i < _this.$lyric_collection.length - 2; i++) {
            height += _this.$lyric_collection.eq(i).outerHeight(true) - 10
          }

          return height
        })()
      }

      this.$singer.text(song_msg.singer)
      this.$cover[0].src = song_msg.cover
      this.$song_title.text(song_msg.title)
      this.lyric_ct_scroll_height = 0
      this.$lyric_ct.animate({scrollTop: 0})
      this.shouldPlayNextSong = false
    },
    // 发出信息提示
    showTips: function (tips) {
      var $tips = this.$tips
      var _this = this

      if (this.shouldShowTips) {
        return
      }

      this.shouldShowTips = true

      $tips.text(tips).fadeIn(1000).fadeOut(1000, function () {
        _this.shouldShowTips = false
      })
    },
    // 歌词容器滑动
    lyricScroll: function (currentTime) {
      var _this = this
      var i = _this.current_lyric_index
      var timeline = _this.lyric_timeline
      var lyric_height = _this.$lyric_collection.eq(i).outerHeight(true) - 10

      if (timeline.length <= 2) {
        return
      }
      if (i < timeline.length && timeline[i] <= currentTime) {
        _this.lyric_ct_scroll_height += lyric_height
        _this.$lyric_collection.eq(i + 1).addClass('current-lyric').siblings().removeClass('current-lyric')
        _this.current_lyric_index++

        if (_this.shouldScroll) {
          _this.$lyric_ct.animate({scrollTop: _this.lyric_ct_scroll_height}, 1000)
        }
      }
    }
  }

  var audioplayer = {
    init: function ($ct) {
      var audioplayer = null

      $ct.each(function () {
        audioplayer = new AudioPlayer($(this))
        audioplayer.getSong()
      })
    }
  }

  audioplayer.init($('#app'))

})