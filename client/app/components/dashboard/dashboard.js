/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Authentication = require('../../utils/Authentication');


// var MiniProfile = require('./miniProfile').MiniProfile;
// var OnlineFriendsList = require('./onlineFriendsList').OnlineFriendsList;
// var CallArea = require('./callArea').CallArea;
// var ChatBar = require('./chatBar').ChatBar;

var Dashboard = React.createClass({
  mixins: [Authentication],

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