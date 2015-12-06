var React = require('react');
var AUTHTOKEN = 'AUTHTOKEN';
module.exports = React.createClass({
  contextTypes: {
   router: React.PropTypes.func
  },
  render : function () {
    return <nav className="navbar navbar-inverse navbar-fixed-top">
              <div className="container-fluid">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span className="sr-only">Toggle navigation</span>

                  </button>
                  <a className="navbar-brand" href="#">Sosninja</a>
                </div>
                <div id="navbar" className="navbar-collapse collapse">
                  <ul className="nav navbar-nav navbar-right">
                    <li onClick = {this.handleSubmitClick}><a>Log Out</a></li>

                  </ul>
                </div>
              </div>
            </nav>
  },
  handleSubmitClick : function () {
    localStorage.clear();
    this.context.router.transitionTo('login');
  }
})
