/** @jsx React.DOM */
var React = require('react');
var Actions = require('../../actions/actions');

var Info = require('./info').Info;
var Pass = require('./pass').Pass;
var Interests = require('./interests').Interests;

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

var Profile = React.createClass({

  mixins: [Authentication],

  getInitialState: function() {
    return {
      username: JSON.parse(window.localStorage.getItem('user')).username,
      avatar: 'https://33.media.tumblr.com/avatar_7c7464817624_128.png',
      user: data
    };
  },

  whatGender: function() {
    var element = document.getElementsByName('gender');
    for (var i = 0; i<element.length; i++) {
      if (element[i].checked) {
        return element[i].value;
      }
    }
  },

  editProfile: function(e) {
    var gender = this.whatGender();
    e.preventDefault();
    Actions.editProfile({
      username: this.state.username,
      location: this.refs.location.getDOMNode().value.trim(),
      gender: gender,
      summary: this.refs.summary.getDOMNode().value.trim(),
      searchable: document.getElementById('searchable').checked
    });
  },

  render: function() {
    return (
      <div className="row">
        <div className="medium-4 columns">
        <h1>@{this.state.username}</h1>
        <h2>Basic Info</h2>
          <form className="form" onSubmit={this.editProfile} role="form" action="/api/user/editprofile" enctype="multipart/form-data" method="POST">
            <fieldset>
              <Info avatarimg={this.state.avatar} />
              <label htmlFOR="location">Location</label>
                <input type="text" id="location" name="location" ref="location" placeholder="location"/>
              <label htmlFOR="gender">Gender</label>
                <input type="radio" ref='gender' name="gender" value="Male" id="gender"/><label for="gender">Male</label>
                <input type="radio" ref='gender' name="gender" value="Female" id="gender"/><label for="gender">Female</label>
                <input type="radio" ref='gender' name="gender" value="Other" id="gender"/><label for="gender">Other</label>
              <label for="profile">Summary</label>
                <textarea name="summary" ref='summary' id="summary" placeholder="I like Neil Degrasse Tyson and hockey."></textarea>
              <input type="checkbox" name="searchable" ref='searchable' id="searchable" defaultChecked>
                <label for="checkbox1">Allow Users to Find Me</label>
              </input>
            </fieldset>
            <button type="submit" className="button small">Edit Profile</button>
          </form>
          <Interests interests={this.state.user.Interests} />
          <Pass />
        </div>
      </div>
    );
  }
});

module.exports.Profile = Profile;
