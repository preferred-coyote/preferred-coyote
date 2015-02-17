/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');

var MiniProfile = require('./miniProfile').MiniProfile;
var OnlineFriendsList = require('./onlineFriendsList').OnlineFriendsList;
var CallArea = require('./callArea').CallArea;
var ChatBar = require('./chatBar').ChatBar;

var Dashboard = React.createClass({
  render: function() {
    return (
      <div>
        <div className="leftbar">
          <MiniProfile /> //TODO: finish mini profile interest posting
          <OnlineFriendsList /> //TODO: finish online friends list functionality
        </div>
        <div className="rightbar">
          <CallArea /> //TODO: finish call area functionality
          <ChatBar /> //TODO: finish chat bar functionality and implement chat boxes
        </div>
      </div>
    )
  }
});

module.exports.Dashboard = Dashboard;