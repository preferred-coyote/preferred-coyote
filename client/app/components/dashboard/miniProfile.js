/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');

var MiniProfile = React.createClass({
  render: function() {
    return (
      <div>
        <img src={this.props.avatarUrl} alt="profile pic"/>

        <form action="/addinterests" method="POST">
          <input type="text" placeholder="Type interests here" />
        </form>

        <ul className="interests-list">
          <!-- TODO: use .map from this.state.interests to list <li> items -->
          <li>Cool interest1</li>
          <li>Cool interest2</li>
        </ul>
      </div>
    )
  }
});

module.exports.MiniProfile = MiniProfile;