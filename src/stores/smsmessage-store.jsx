var Api = require('../utils/api');
var Reflux = require('reflux');
var Actions = require('../actions');
var AUTHTOKEN = 'AUTHTOKEN';

module.exports = Reflux.createStore({
  listenables : [Actions],
  getSmsMessageList : function () {
      var retrievedObject = localStorage.getItem(AUTHTOKEN);
      var urlEncode = 'showsmsmessage?authToken=' + retrievedObject;
      return Api.getSmsMessage(urlEncode)
                .then(function(json){
                    this.smsmessages = json.listSmsMessage;
                    this.triggerChange();
                }.bind(this))
  },
  triggerChange : function () {
    this.trigger('change', this.smsmessages);
  }
});
