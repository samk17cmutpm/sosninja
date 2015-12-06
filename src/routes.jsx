var React = require('react');
var ReactRouter = require('react-router');
var HashHistory = require('react-router/lib/HashHistory');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Main = require('./components/main');
var Login = require('./components/login');
var DashBoard = require('./components/dashboard');
var UserDevice = require('./info/userdevice');
var ListContact = require('./info/listcontact');
var HistoryCall = require('./info/historycall');
var SmsMessage = require('./info/smsmessage');
var Locations = require('./info/location');
module.exports = (
  <Router history = {new HashHistory} >
      <Route path = "/" components = {Main} >
          <Route path = "login" components = {Login} />
          <Route path = "dashboard" components = {DashBoard}>
              <Route path = "contacts" components = {ListContact} />
              <Route path = "historycalls" components = {HistoryCall} />
              <Route path = "smsmessages" components = {SmsMessage} />
              <Route path = "locations" components = {Locations} />
          </Route>
      </Route>
  </Router>
)
