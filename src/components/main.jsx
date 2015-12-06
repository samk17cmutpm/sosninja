var React = require('react');
var Header = require('./header');
var Footer = require('./footer');
var Login = require('./login');
var ListContact = require('../info/listcontact');
var ShowToken =  require('./showtoken');
var Break = require('../components/break');
module.exports = React.createClass ({
  render : function () {
    return <div>
              <Header />
              <Break />
              <Break />
              {this.props.children}
           </div>
  }
});
