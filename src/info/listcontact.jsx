var React = require('react');
var Reflux = require('reflux');
var ContactStore = require('../stores/contact-store');
var Actions = require('../actions');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Spinner = require('react-spinkit');
var AUTHTOKEN = 'AUTHTOKEN';

module.exports = React.createClass({
  contextTypes: {
   router: React.PropTypes.func
  },
  mixins : [
    Reflux.listenTo(ContactStore, 'onChange')
  ],
  getInitialState : function () {
    return {
      contacts : [],
      isLoaded : false
    }
  },
  componentWillMount : function () {
    var retrievedObject = localStorage.getItem(AUTHTOKEN);
    if(retrievedObject !== null) {
        Actions.getContactList();
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
                          <th>Phone Number</th>
                          <th>Email</th>
                          <th>Name</th>
                          <th>Date Created</th>
                        </tr>
                      </thead>
                      <tbody>
                          {  this.renderContacts() }
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
  renderContacts : function () {
    return this.state.contacts.map(function(contact){
      return  <tr key={contact.id}>
                  <td>{contact.phoneNumber}</td>
                  <td>{contact.email}</td>
                  <td>{contact.name}</td>
                  <td>{contact.dateCreated }</td>
              </tr>
    });
  },
  onChange : function(event, contacts) {
    this.setState({contacts : contacts});
    this.setState({isLoaded : true});
  }
});
