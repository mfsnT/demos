$(function () {
  var $btn =$('.btn');
  var $ct = $('.container');
  var newsIndex = 0;
  var clickclock = false;

  $btn.on('click', function () {
    if (clickclock) {
      return;
    } else {
      $btn.text('加载中...');
      $btn.addClass('loading');
      clickclock = true;

      $.get('/getInfo', {index: newsIndex, length: 5}).done(function (data) {
        if (data.length === 0) {
          var $div = $btn.parent();

          $btn.remove();
          $div.text('没有更多了');
        } else {
          var html = '';

          $.each(data, function (index, data) {
            html += '<li>' + data + '</li>'
          });

          $ct.append(html);
          newsIndex += 5;
          $btn.removeClass('loading').text('加载更多');
          clickclock = false;
        }
      }).fail(function () {
        console.log(arguments)
        $btn.removeClass('loading').text('加载失败');
      });
    }
  });
});
