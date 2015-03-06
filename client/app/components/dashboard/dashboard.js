/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = require('react-router').Link;

var userStore = require('../../stores/userStore');
var Reflux = require('reflux');
var Actions = require('../../actions/actions');
var userStore = require('../../stores/userStore');
var Authentication = require('../../utils/Authentication');

var Interests = require('../profile/interests').Interests;

var Dashboard = React.createClass({

  mixins: [
    Authentication,
    Reflux.listenTo(userStore, "onInterestsUpdated")
  ],

  getInitialState: function() {
    return {
      user: JSON.parse(window.localStorage.user),
      // user: userStore.getUserData(),
      avatar: 'https://33.media.tumblr.com/avatar_7c7464817624_128.png',
      interests: [],
      text: ''
    };
  },

  componentDidMount: function() {
    Actions.getInterests();

  },


  onInterestsUpdated: function(newInterests) {
    console.log("The new interests here", newInterests);
    this.setState({interests: newInterests.map(function(interest){return interest.name})});
  },

  onInputChange: function(e) {
    this.setState({text: e.target.value});
    console.log('input change');
  },

  handleInterestSubmit: function(e) {
    e.preventDefault();
    var updatedInterests = this.state.interests.concat([this.state.text]);
    console.log("Handling update interests submit", updatedInterests);
    Actions.updateInterests(updatedInterests);
    this.setState({interests: updatedInterests});
  },



  render: function() {

    return (
      <div>
        <div className="medium-2 columns" id="sidebar">
          <h3 className="username">@{this.state.user.username}</h3>
          <img src={this.state.avatar} alt="PREFERRED COYOTE" id="sidebar-avatar" />
          <p>{this.state.user.summary}</p>
          <ul className="inline-list">
            <li>{this.state.user.location}</li>
            <li>{this.state.user.gender}</li>
          </ul>

          <Interests interests={this.state.interests} />
          <form onSubmit={this.handleInterestSubmit}>
            <input onChange={this.onInputChange} value={this.state.text} />
          </form>

        </div>
        <div className="medium-10 columns" id="primary">
          <RouteHandler />
        </div>
      </div>
    );
  }
});

module.exports.Dashboard = Dashboard;
