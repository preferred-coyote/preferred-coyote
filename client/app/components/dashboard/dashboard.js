/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Authentication = require('../../utils/Authentication');
var Link = require('react-router').Link;


var data = {
  "id": 2,
  "username": "Ghost",
  "location": "San Francisco, CA",
  "gender": "Male",
  "bio": "Software Engineer at Hack Reactor",
  "password": "password",
  "createdAt": "2015-02-16T22:51:16.000Z",
  "updatedAt": "2015-02-16T22:51:16.000Z",
  "avatar": "https://33.media.tumblr.com/avatar_7c7464817624_128.png",
  "Interests": [
    {
      "id": 5,
      "name": "kink.com",
      "createdAt": "2015-02-16T22:51:16.000Z",
      "updatedAt": "2015-02-16T22:51:16.000Z",
      "InterestsUsers": {
        "createdAt": "2015-02-16T22:51:16.000Z",
        "updatedAt": "2015-02-16T22:51:16.000Z",
        "InterestId": 5,
        "UserId": 2
      }
    },
    {
      "id": 4,
      "name": "travel",
      "createdAt": "2015-02-16T22:51:16.000Z",
      "updatedAt": "2015-02-16T22:51:16.000Z",
      "InterestsUsers": {
        "createdAt": "2015-02-16T22:51:16.000Z",
        "updatedAt": "2015-02-16T22:51:16.000Z",
        "InterestId": 4,
        "UserId": 2
      }
    },
    {
      "id": 10,
      "name": "basketball",
      "createdAt": "2015-02-16T22:51:16.000Z",
      "updatedAt": "2015-02-16T22:51:16.000Z",
      "InterestsUsers": {
        "createdAt": "2015-02-16T22:51:16.000Z",
        "updatedAt": "2015-02-16T22:51:16.000Z",
        "InterestId": 6,
        "UserId": 2
      }
    },
    {
      "id": 11,
      "name": "javascript",
      "createdAt": "2015-02-16T22:51:16.000Z",
      "updatedAt": "2015-02-16T22:51:16.000Z",
      "InterestsUsers": {
        "createdAt": "2015-02-16T22:51:16.000Z",
        "updatedAt": "2015-02-16T22:51:16.000Z",
        "InterestId": 7,
        "UserId": 2
      }
    },
  ]
}

var Interests = require('../profile/interests').Interests;

var Dashboard = React.createClass({

  mixins: [Authentication],

  getInitialState: function() {
    return {
      user: data
    };
  },

  render: function() {
    return (
      <div>
        <div className="medium-3 columns" id="sidebar">
          <h3 className="username">@{this.state.user.username}</h3>
          <img src={this.state.user.avatar} className="round avatar " alt="PREFERRED COYOTE"/>
          <p>{this.state.user.bio}</p>
          <ul className="inline-list">
            <li>{this.state.user.location}</li>
            <li>{this.state.user.gender}</li>
          </ul>
          <Interests interests={this.state.user.Interests} />
          <Link to="/pubnub" className="button info expand">Call Random User</Link>
          <Link to="/dashboard/channels" className="button info expand">Search Topics</Link>
        </div>
        <div className="small-9 columns" id="primary">
          <RouteHandler />
        </div>
      </div>
    );
  }
});

module.exports.Dashboard = Dashboard;
