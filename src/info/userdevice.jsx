var React = require('react')
var Reflux = require('reflux');
var UserDeviceStore = require('../stores/userdevice-store');
var Actions = require('../actions');
var Spinner = require('react-spinkit');
var AUTHTOKEN = 'AUTHTOKEN';
module.exports = React.createClass({
  contextTypes: {
   router: React.PropTypes.func
  },
  mixins : [
    Reflux.listenTo(UserDeviceStore, 'onChange')
  ],
  getInitialState : function () {
    return {
      userdevices : [],
      isLoaded : false
    }
  },
  componentWillMount : function () {
    var retrievedObject = localStorage.getItem(AUTHTOKEN);
    if(retrievedObject !== null) {
        Actions.getUserDeviceList();
    } else {
       this.context.router.transitionTo('login');
    }
  },
  render : function () {
    return <div className = "container">
              {this.state.isLoaded ?
                  (
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>androidDeviceId</th>
                          <th>email</th>
                          <th>phoneNumber</th>
                        </tr>
                      </thead>
                      <tbody>
                          {  this.renderUserDevice() }
                      </tbody>
                      </table>
                  )
                  :
                  (
                    <Spinner spinnerName='three-bounce' noFadeIn = 'true'/>
                  )
              }

           </div>
  },
  renderUserDevice : function () {
    return this.state.userdevices.map(function(userdevice){
      return <tr key={userdevice.id}>
                  <td>{userdevice.id}</td>
                  <td>{userdevice.androidDeviceId}</td>
                  <td>{userdevice.email}</td>
                  <td>{userdevice.phoneNumber }</td>
            </tr>
    });
  },
  onChange : function (event, userdevices) {
    this.setState({userdevices : userdevices});
    this.setState({isLoaded : true});
  }
})
