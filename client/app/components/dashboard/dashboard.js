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
      avatar: 'https://igcdn-photos-e-a.akamaihd.net/hphotos-ak-xfa1/t51.2885-15/11005049_1565239487047612_521686647_n.jpg',
      interests: [],
      text: ''
    };
  },

  componentDidMount: function() {
    Actions.getInterests();

  },


  onInterestsUpdated: function(newInterests) {
    console.log("The new interests here", newInterests);
    this.setState({interests: newInterests.interests.map(function(interest){return interest.name})});
  },

  handleInterestSubmit: function(e) {
    e.preventDefault();
    var interest = this.refs.interest.getDOMNode().value.trim();
    var interestArray = [interest];
    var updatedInterests = this.state.interests.concat([interest]);
    console.log("Handling update interests submit", updatedInterests);
    // Actions.updateInterests(updatedInterests);
    Actions.updateInterests(interestArray);
    console.log(interestArray);
    this.setState({interests: updatedInterests});
    this.refs.interest.getDOMNode().value = '';
  },

  render: function() {
    return (
      <div>
        <div className="medium-2 columns" id="sidebar">
          <h3 className="username">@{this.state.user.username}</h3>
          <div id="sidebar-avatar-div" className="cf">
            <img src={this.state.avatar} alt="PREFERRED COYOTE" className="round" id="sidebar-avatar" />
          </div>
          <div className="sidebar-summary">
            <div className="sidebar-summary-title">Summary</div>
            <div className="sidebar-summary-text">{this.state.user.summary}</div>
          </div>
          <div className="sidebar-summary">
            <div className="sidebar-summary-title">Gender</div>
            <div className="sidebar-summary-text">{this.state.user.gender}</div>
          </div>
          <div className="sidebar-summary">
            <div className="sidebar-summary-title">Location</div>
            <div className="sidebar-summary-text">{this.state.user.location}</div>
          </div>
          <Interests interests={this.state.interests} />
          <form onSubmit={this.handleInterestSubmit}>
            <input type="text" ref="interest"  />
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
