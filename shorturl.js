function getActiveTabURL(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.log(url);
    callback(url);
  });
}

function updateURL(shorturl) {
  document.getElementById('str_url').value = shorturl;
}

document.addEventListener('DOMContentLoaded', function() {
  // get short URL
  getActiveTabURL(function(url) {
    var request = "http://tiny-url.info/api/v1/create?" +
                  "apikey=<YOUR TINYURL API KEY HERE>&" +
                  "provider=bit_ly&" +
                  "format=text&" +
                  "url=" + url;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", request, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        updateURL(xhr.responseText);
      }
    }
    xhr.send();
  });

  // register copy action to button
  var btn_copy = document.getElementById('btn_copy');
  btn_copy.addEventListener('click', function() {
    var str_url = document.getElementById('str_url');
    str_url.select();

    document.execCommand('copy');
  }, false);
});