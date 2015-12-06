var React = require('react');
var ListContact = require('../info/listcontact');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
module.exports = React.createClass ({
  render : function () {
    return <div className="row">
              <div className="col-md-1">
              </div>
              <div className="col-md-2">
                <div class="list-group">
                  <ul className="nav nav-sidebar">
                    <Link to={"dashboard/contacts"} className="list-group-item">
                      <p>Contacts List</p>
                    </Link>
                    <Link to={"dashboard/historycalls"} className="list-group-item">
                      <p>Historycall List</p>
                    </Link>
                    <Link to={"dashboard/smsmessages"} className="list-group-item">
                      <p>Sms Message List</p>
                    </Link>
                    <Link to={"dashboard/locations"} className="list-group-item">
                      <p>Locations List</p>
                    </Link>
                  </ul>
                </div>
              </div>
              <div className="col-md-8">
                  {this.props.children}
              </div>
              <div className="col-md-1">
              </div>
       </div>
  }
})
