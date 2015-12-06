var React = require('react');
var Reflux = require('reflux');
var HistoryCallStore = require('../stores/historycall-store');
var Actions = require('../actions');
var ReactRouter = require('react-router');
var Spinner = require('react-spinkit');
var AUTHTOKEN = 'AUTHTOKEN';

module.exports = React.createClass({
  contextTypes : {
    router : React.PropTypes.func
  },
  mixins : [
    Reflux.listenTo(HistoryCallStore, 'onChange')
  ],
  getInitialState : function () {
    return {
      historycalls : [],
      isLoaded : false
    }
  },
  componentWillMount : function () {

    var retrievedObject = localStorage.getItem(AUTHTOKEN);
    if(retrievedObject !== null) {
      Actions.getHistoryCallList();
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
                          <th>Duration</th>
                          <th>Type</th>
                          <th>Phone Number</th>
                          <th>Date Created</th>
                        </tr>
                      </thead>
                      <tbody>
                          {  this.renderHistoryCalls() }
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
  renderHistoryCalls : function () {
    return this.state.historycalls.map(function(historycall){
      return  <tr key={historycall.id}>
                  <td>{historycall.duration}</td>
                  <td>{historycall.type}</td>
                  <td>{historycall.phoneNumber}</td>
                  <td>{historycall.dateCreated }</td>
              </tr>
    });
  },
  onChange : function(event, historycalls) {
    this.setState({historycalls : historycalls});
    this.setState({isLoaded : true});
  }
})
