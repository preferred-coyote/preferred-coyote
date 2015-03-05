/** @jsx React.DOM */
var React = require('react');
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

var Info = require('./info').Info;
var Pass = require('./pass').Pass;
var Interests = require('./interests').Interests;
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


  render: function() {
    return (
      <div className="row">
        <div className="large-12 columns">
          <Info username={this.state.user.username} avatarimg={this.state.user.avatar} />
          <form>
            <input type="checkbox" name="searchable" id="checkbox1" value="searchable" defaultChecked>
              <label for="checkbox1">Allow Users to Find Me</label>
            </input>
          </form>

          <Interests interests={this.state.interests} />
          <form onSubmit={this.handleInterestSubmit}>
            <input onChange={this.onInputChange} value={this.state.text} />
          </form>

          <Pass />

        </div>
      </div>
    );
  }
});

module.exports.Profile = Profile;
