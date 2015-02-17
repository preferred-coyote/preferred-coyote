/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');

var OnlineFriendsList = React.createClass({
  render: function() {
    return (
      <div>
        <h2>Friends</h2>
        <!-- these should show when the user clicks them: use this.state to show/hide onClick -->
        <FriendsOnline /> //TODO: actually implement this
        <RecentChats /> //TODO: actually implement this
      </div>
    )
  }
});

module.exports.OnlineFriendsList = OnlineFriendsList;