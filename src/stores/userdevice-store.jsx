var Api = require('../utils/api');
var Reflux = require('reflux');
var Actions = require('../actions');
var AUTHTOKEN = 'AUTHTOKEN';

module.exports = Reflux.createStore({
  listenables : [Actions],
  getUserDeviceList : function () {
    var retrievedObject = localStorage.getItem(AUTHTOKEN);
    var urlEncode = 'showuserdevice?authToken=' + retrievedObject;
    return Api.getUserDevice(urlEncode)
           .then(function(json){
              this.userdevices = json.userdeviceList;
              this.triggerChange();
           }.bind(this))
  },
  triggerChange : function () {
    this.trigger('change', this.userdevices);
  }
});
