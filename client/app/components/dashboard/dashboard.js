/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Authentication = require('../../utils/Authentication');


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
var Authentication = require('../../utils/Authentication');

var Dashboard = React.createClass({

  mixins: [Authentication],

  getInitialState: function() {
    return {
      user: data
    };
  },

  render: function() {
    return (
      <div className="row">
        <div className="small-4 columns">
          <h2>{this.state.user.username} Profile</h2>
          <img src={this.state.user.avatar} alt="PREFERRED COYOTE"/>
          <h4>{this.state.user.location}</h4>
          <h4>{this.state.user.gender}</h4>
          <p>{this.state.user.bio}</p>
          <p><Interests interests={this.state.user.Interests} /></p>
        </div>
        <div className="small-4 columns">
          <button type="submit" className="button small">Call Random User</button>
        </div>
        <div className="small-8 columns">
          <RouteHandler />
        </div>
      </div>
    )
  }
});

module.exports.Dashboard = Dashboard;