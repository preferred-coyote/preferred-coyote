/** @jsx React.DOM */
var React = require('react');
<<<<<<< HEAD
var Actions = require('../../actions/actions');
=======
var Reflux = require('reflux');

var data = {
"id": 2,
"username": "Ghost",
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
  }
]
};
>>>>>>> Users can now add interests

var Info = require('./info').Info;
var Pass = require('./pass').Pass;

var Authentication = require('../../utils/Authentication');
var Actions = require('../../actions/actions');
var userStore = require('../../stores/userStore');
var Profile = React.createClass({

  mixins: [
    Authentication,
    Reflux.listenTo(userStore, "onInterestsUpdated")
  ],

  getInitialState: function() {
    return {
<<<<<<< HEAD
      user: JSON.parse(window.localStorage.user),
      avatar: 'https://33.media.tumblr.com/avatar_7c7464817624_128.png'
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

=======
      user: data,
      interests: [],
      text: '',
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


>>>>>>> Users can now add interests
  render: function() {
    return (
      <div className="row">
        <div className="medium-4 columns">
        <h1>{this.state.user.username}</h1>
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
<<<<<<< HEAD
=======

          <Interests interests={this.state.interests} />
          <form onSubmit={this.handleInterestSubmit}>
            <input onChange={this.onInputChange} value={this.state.text} />
          </form>

>>>>>>> Users can now add interests
          <Pass />

        </div>
      </div>
    );
  }
});

module.exports.Profile = Profile;
