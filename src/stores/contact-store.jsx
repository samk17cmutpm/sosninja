var Api = require('../utils/api');
var Reflux = require('reflux');
var Actions = require('../actions');
var AUTHTOKEN = 'AUTHTOKEN';

module.exports = Reflux.createStore({
  listenables : [Actions],
  getContactList : function () {
    var retrievedObject = localStorage.getItem(AUTHTOKEN);
    var urlEncode = 'showcontact?authToken=' + retrievedObject;
    return Api.getContact(urlEncode)
           .then(function(json){
             this.contacts = json.contactList;
             this.triggerChange();
           }.bind(this))
  },
  triggerChange : function () {
    this.trigger('change', this.contacts);
  }
});
