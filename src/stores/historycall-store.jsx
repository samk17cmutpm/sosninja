var Api = require('../utils/api');
var Reflux = require('reflux');
var Actions = require('../actions');
var AUTHTOKEN = 'AUTHTOKEN';

module.exports = Reflux.createStore({
  listenables : [Actions],
  getHistoryCallList : function () {
    var retrievedObject = localStorage.getItem(AUTHTOKEN);
    var urlEncode = 'showhistorycall?authToken=' + retrievedObject;
    return Api.getHistoryCall(urlEncode)
              .then(function(json){
                this.historycalls = json.contactList;
                this.triggerChange();
              }.bind(this))
  },
  triggerChange : function () {
    this.trigger('change', this.historycalls);
  }
});
