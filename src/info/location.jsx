var React = require('react');
var Reflux = require('reflux');
var LocationStore = require('../stores/location-store');
var Actions = require('../actions');
var ReactRouter = require('react-router');
var Spinner = require('react-spinkit');
var AUTHTOKEN = 'AUTHTOKEN';


module.exports = React.createClass({
  contextTypes : {
    router : React.PropTypes.func
  },
  mixins : [
    Reflux.listenTo(LocationStore, 'onChange')
  ],
  getInitialState : function () {
    return {
      locations : [],
      isLoaded : false
    }
  },
  componentWillMount : function () {

    var retrievedObject = localStorage.getItem(AUTHTOKEN);
    if(retrievedObject !== null) {
      Actions.getLocationList();
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
                          <th>Latitude</th>
                          <th>Longtitude</th>
                          <th>Address</th>
                          <th>Date Created</th>
                        </tr>
                      </thead>
                      <tbody>
                          {  this.renderSmsMessages() }
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
  renderSmsMessages : function () {
    return this.state.locations.map(function(location){
      return  <tr key={location.id}>
                  <td>{location.latitude}</td>
                  <td>{location.longtitude}</td>
                  <td>{location.address}</td>
                  <td>{location.dateCreated }</td>
              </tr>
    });
  },
  onChange : function(event, locations) {
    this.setState({locations : locations});
    this.setState({isLoaded : true});
  }
})
