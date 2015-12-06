var React = require('react');
var Reflux = require('reflux');
var SmsMessageStore = require('../stores/smsmessage-store');
var Actions = require('../actions');
var ReactRouter = require('react-router');
var Spinner = require('react-spinkit');
var AUTHTOKEN = 'AUTHTOKEN';


module.exports = React.createClass({
  contextTypes : {
    router : React.PropTypes.func
  },
  mixins : [
    Reflux.listenTo(SmsMessageStore, 'onChange')
  ],
  getInitialState : function () {
    return {
      smsmessages : [],
      isLoaded : false
    }
  },
  componentWillMount : function () {

    var retrievedObject = localStorage.getItem(AUTHTOKEN);
    if(retrievedObject !== null) {
      Actions.getSmsMessageList();
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
                          <th>Content</th>
                          <th>Type</th>
                          <th>Phone Number</th>
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
    return this.state.smsmessages.map(function(smsmessage){
      return  <tr key={smsmessage.id}>
                  <td>{smsmessage.bodyMessage}</td>
                  <td>{smsmessage.type}</td>
                  <td>{smsmessage.phoneNumber}</td>
                  <td>{smsmessage.dateCreated }</td>
              </tr>
    });
  },
  onChange : function(event, smsmessages) {
    this.setState({smsmessages : smsmessages});
    this.setState({isLoaded : true});
  }
})
