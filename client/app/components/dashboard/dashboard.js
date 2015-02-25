/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Authentication = require('../../utils/Authentication');

var Dashboard = React.createClass({
  mixins: [Authentication],

  render: function() {
    return (
      <div>
        <div className="small-3 columns" id="sidebar">
          <h3 className="username">@jacksonhoose</h3>

        </div>
        <div className="small-9 columns" id="primary">
          <RouteHandler />
        </div>
      </div>
    );
  }
});

module.exports.Dashboard = Dashboard;
