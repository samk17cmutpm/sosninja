var Api = require('../utils/api');
var Reflux = require('reflux');
var Actions = require('../actions');

module.exports = Reflux.createStore({
  listenables : [Actions],
  getAuthToken : function () {
    return Api.getAuthToken('login')
           .then(function(json){
             this.authTokenResponse = json;
             this.triggerChange();
           }.bind(this))
  },
  triggerChange : function () {
    this.trigger('change', this.authTokenResponse);
  }
});
