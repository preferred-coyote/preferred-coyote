/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Authentication = require('../../utils/Authentication');
var Link = require('react-router').Link;
var userStore = require('../../stores/userStore');
var Interests = require('../profile/interests').Interests;

var Dashboard = React.createClass({

  mixins: [Authentication],

  getInitialState: function() {
    return {
      user: JSON.parse(window.localStorage.user),
      // user: userStore.getUserData(),
      avatar: 'https://33.media.tumblr.com/avatar_7c7464817624_128.png'
    };
  },

  render: function() {

    return (
      <div>
        <div className="medium-3 columns" id="sidebar">
          <h3 className="username">@{this.state.user.username}</h3>
          <img src={this.state.avatar} className="round avatar " alt="PREFERRED COYOTE"/>
          <p>{this.state.user.summary}</p>
          <ul className="inline-list">
            <li>{this.state.user.location}</li>
            <li>{this.state.user.gender}</li>
          </ul>
        </div>
        <div className="small-9 columns" id="primary">
          <RouteHandler />
        </div>
      </div>
    );
  }
});

module.exports.Dashboard = Dashboard;
