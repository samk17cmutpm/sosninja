var React = require('react');
var Reflux = require('reflux');
var AuthTokenStore = require('../stores/authtoken-store');
var Actions = require('../actions');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

module.exports = React.createClass({
  mixins : [
    Reflux.listenTo(AuthTokenStore, 'onChange')
  ],
  getInitialState : function () {
    return {
      authTokenResponse : {}
    }
  },
  componentWillMount : function () {
    Actions.getAuthToken();
  },
  render : function () {
    return <div className = "list-group">
              {this.renderAuthToken()}
          </div>
  },
  renderAuthToken : function () {
      console.log(this.state.authTokenResponse.message)
      return <h3>{this.state.authTokenResponse.message}</h3>
  },
  onChange : function(event, authTokenResponse) {
    this.setState({authTokenResponse : authTokenResponse});
  }
});
