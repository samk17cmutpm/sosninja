var Api = require('../utils/api');
var Reflux = require('reflux');
var Actions = require('../actions');
var AUTHTOKEN = 'AUTHTOKEN';

module.exports = Reflux.createStore({
  listenables : [Actions],
  getLocationList : function () {
    var retrievedObject = localStorage.getItem(AUTHTOKEN);
    var urlEncode = 'showlocation?authToken=' + retrievedObject;
    return Api.getLocation(urlEncode)
              .then(function(json){
                this.locations = json.locationList;
                this.triggerChange();
              }.bind(this))
  },
  triggerChange : function () {
    this.trigger('change', this.locations);
  }
});
