/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');

var ChatBar = React.createClass({
  render: function() {
    return (
      <div>
        <ul>
          <!--TODO: list current chats from this.state -->
          <li>Chat with Bob</li>
        </ul>
      </div>
    )
  }
});

module.exports.ChatBar = ChatBar;