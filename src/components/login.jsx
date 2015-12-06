var React = require('react');
var Api = require('../utils/api');
var Reflux = require('reflux');
var Actions = require('../actions');
var AuthTokenStore = require('../stores/authtoken-store');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Break = require('./break');
var Spinner = require('react-spinkit');
var AUTHTOKEN = 'AUTHTOKEN';

module.exports = React.createClass({
  contextTypes: {
   router: React.PropTypes.func
  },
  componentWillMount : function () {
    var retrievedObject = localStorage.getItem(AUTHTOKEN);
    if(retrievedObject !== null) {
      this.context.router.transitionTo('dashboard/contacts');
    }
  },
  getInitialState : function () {
    return {
      userName : '',
      password : '',
      notAuthetication : false,
      someThingWrong : false,
      authTokenResponse : {}
    }
  },
  render : function () {
    return <div className="container">

                  <div className="row">
                      <div className="col-md-3"></div>
                      <div className="col-md-6">
                          <Break />
                          <Break />
                          <form className="form-horizontal">
                              <div className="form-group">
                                <label for="inputEmail3" className="col-sm-2 control-label">Email</label>
                                <div className="col-sm-10">
                                  <input
                                        value = {this.state.userName}
                                        onChange = {this.handeUserNameChange}
                                        type="text" className="form-control"
                                        id="inputEmail3"
                                        placeholder="User Name" />
                                </div>
                              </div>
                              <div className="form-group">
                                <label for="inputPassword3" className="col-sm-2 control-label">Password</label>
                                <div className="col-sm-10">
                                  <input
                                        value = {this.state.password}
                                        onChange = {this.handePasswordChange}
                                        type="password"
                                        className="form-control"
                                        id="inputPassword3"
                                        placeholder="Password" />
                                </div>
                              </div>

                              <div className="form-group">
                                <div className="col-sm-offset-2 col-sm-10">
                                {this.state.someThingWrong ?
                                  (  <div className="alert alert-danger" role="alert">Please check again your password and user name</div>)
                                  :
                                  null
                                }

                                </div>
                              </div>

                              <div className="form-group">
                                <div className="col-sm-offset-2 col-sm-10">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <button
                                                onClick = {this.handleSubmitClick}
                                                type="submit" className="btn btn-default">Sign in</button>
                                        </div>
                                        <div className="col-md-9">
                                            { this.state.notAuthetication ? (
                                              <Spinner spinnerName='three-bounce' noFadeIn = 'true'/>
                                            ) : null}

                                        </div>
                                    </div>
                                </div>
                              </div>
                          </form>

                      </div>
                      <div className="col-md-3"></div>
                  </div>
          </div>
  },
  handleSubmitClick : function () {
    if(this.state.userName === '') {
      alert("Please fill user name ");
    } else {
      if(this.state.password === '') {
        alert("Please fill password");
      } else {
        this.getAuthToken();
      }
    }
  },
  getAuthToken : function () {
    this.setState({notAuthetication : true});
    this.setState({someThingWrong : false});
    url = "signin?email=" + this.state.userName + "&passWord=" + this.state.password;
    return Api.getAuthToken(url)
           .then(function(json){
             this.setState({authTokenResponse : json});
             if(this.state.authTokenResponse.success) {
               localStorage.setItem(AUTHTOKEN, this.state.authTokenResponse.authtoken);
               this.context.router.transitionTo('dashboard/contacts');
             } else {
                this.setState({notAuthetication : false});
                this.setState({someThingWrong : true});
             }
           }.bind(this))
  },
  handeUserNameChange : function (event) {
    this.setState({userName : event.target.value});
  },
  handePasswordChange : function (event) {
    this.setState({password : event.target.value});
  }
});
