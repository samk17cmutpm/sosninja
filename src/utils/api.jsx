var Fetch = require('whatwg-fetch');
var rootUrl = 'http://128.199.169.48/sosninja/';

module.exports = window.api = {
  getContact : function(url) {
    return fetch (rootUrl + url, {
      method : 'post',
      header : {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(function(response){
      return response.json()
    })
  },
  getAuthToken : function(url) {
    return fetch (rootUrl + url, {
      method : 'post',
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then (function(response) {
      return response.json()
    })
  },
  getUserDevice : function(url) {
    return fetch (rootUrl + url, {
      method : 'post',
      header : {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(function(response) {
      return response.json()
    })
  },
  getHistoryCall : function(url) {
    return fetch (rootUrl + url, {
      method : 'post',
      header : {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(function(response){
      return response.json()
    })
  },
  getSmsMessage : function(url) {
    return fetch (rootUrl + url, {
      method : 'post',
      header : {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(function(response){
      return response.json()
    })
  },
  getLocation : function(url) {
    return fetch (rootUrl + url, {
      method : 'post',
      header : {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(function(response){
      return response.json()
    })
  }
};
