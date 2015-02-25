/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

// var MiniProfile = require('./miniProfile').MiniProfile;
// var OnlineFriendsList = require('./onlineFriendsList').OnlineFriendsList;
// var CallArea = require('./callArea').CallArea;
// var ChatBar = require('./chatBar').ChatBar;

var Dashboard = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="small-4 columns">
          <h1>The User Profile</h1>
        </div>
        <div className="small-8 columns">
          <RouteHandler />
        </div>
      </div>
    )
  }
});

module.exports.Dashboard = Dashboard;