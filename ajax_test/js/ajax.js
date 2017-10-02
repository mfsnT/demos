var btn =document.querySelector('.btn');
var ct = document.querySelector('.container');
var newsIndex = 0;

btn.addEventListener('click', function () {
  btn.setAttribute('disabled', 'disabled');
  btn.innerText = '加载中...';
  btn.classList.add('loading');

  var queryString = '?index=' + newsIndex + '&length=5';
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200 || xhr.status === 304) {
        var newsArr = JSON.parse(xhr.responseText);

        if (newsArr.length === 0) {
          var div = btn.parentElement;
          div.removeChild(btn);
          div.innerText = '没有更多了';
        } else {
          var fragment = document.createDocumentFragment();

          for (var i = 0; i < newsArr.length; i++) {
            var li = document.createElement('li');
            li.innerText = newsArr[i];
            fragment.appendChild(li);
          }

          ct.appendChild(fragment);
          newsIndex += 5;
          btn.classList.remove('loading');
          btn.innerText = '加载更多';
          btn.removeAttribute('disabled');
        }
      }
    }
  }
  xhr.open('get', '/getInfo' + queryString, true);
  xhr.send();
})