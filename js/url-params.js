'use strict';

var params = {};

document.addEventListener('DOMContentLoaded', getParams);

function getParams() {
  var match = null;
  var space = /\+/g;
  var search = /([^&=]+)=?([^&]*)/g;
  var query = window.location.search.substring(1);

  function decode(url) {
    return decodeURIComponent(url.replace(space, ' '));
  }

  while (match = search.exec(query))
    params[decode(match[1])] = decode(match[2]);
}
