/** @jsx React.DOM */
var React = require('react');
var data = {"user": {"username": "user1", "realname": "John Doe", "avatarimg": "http://icons.iconarchive.com/icons/sykonist/looney-tunes/256/Wile-E-Coyote-icon.png"}};
var Info = require('./info').Info;


var Profile = React.createClass({
  getInitialState: function() {
    return {
      user: data.user
    }
  },

  render: function() {
    return (
      <div>
      <h1>Profile</h1>
      <Info username={this.state.user.username} realname={this.state.user.realname} avatarimg = {this.state.user.avatarimg} ></Info>
      <form className = "profileForm" role = "form" action="/api/user/profile" method="POST">
        <input type="text" name="oldpassword" placeholder="Confirm old password"></input>
        <input type="text" name="newpassword" placeholder="New password"></input>
        <input type="checkbox" name="searchable" value="searchable" defaultChecked>Allow users to find me</input>
        <button type="submit">Update Profile</button>
      </form>
      </div>
    );
  }
});

module.exports.Profile = Profile;
