/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');

var Actions = require('../../actions/actions');
var userStore = require('../../stores/userStore');
// var profileStore = require('../../stores/profileStore');

var Info = require('./info').Info;
var Authentication = require('../../utils/Authentication');

var CreateProfile = React.createClass({

  mixins: [
    Authentication,
    Reflux.listenTo(userStore, "onCreate"),
    Router.Navigation
    ],

  // statics: {
  //   willTransitionTo: function(transition) {
  //     if(userStore.isCreated()) {
  //       transition.redirect('dashboard');
  //     }
  //   }
  // },

  getInitialState: function() {
    return {
      createProfileMessage: '',
      user: JSON.parse(window.localStorage.user),
      avatar: 'https://33.media.tumblr.com/avatar_7c7464817624_128.png'
    }
  },

  onCreate: function(isCreated) {
    if(isCreated) {
      this.transitionTo('dashboard');
    } else {
        this.setState({createProfileMessage: 'SOMETHING WENT WRONG IN CREATE PROFILE'});
    }
  },

  whatGender: function() {
    var element = document.getElementsByName('gender');
    for (var i = 0; i<element.length; i++) {
      if (element[i].checked) {
        return element[i].value;
      }
    }
  },

  createProfile: function(e) {
    var gender = this.whatGender();
    e.preventDefault();
    Actions.createProfile({
      username: this.state.username,
      location: this.refs.location.getDOMNode().value.trim(),
      gender: gender,
      summary: this.refs.summary.getDOMNode().value.trim(),
      searchable: document.getElementById('searchable').checked,
      profileCreated: true
    });
  },

  render: function() {
    return (
      <div className="row">
        <h1>@{this.state.user.username}: Create Profile</h1>
        <div className="medium-6 columns">
        <h2>Basic Info</h2>
          <form className="form" onSubmit={this.createProfile} role="form" action="/api/user/editprofile" enctype="multipart/form-data" method="POST">
            <fieldset>
              <Info avatarimg={this.state.avatar} />
              <label htmlFOR="location">Location</label>
                <input type="text" id="location" name="location" ref="location" placeholder={this.state.user.location}/>
              <label htmlFOR="gender">Gender</label>
                <input type="radio" ref='gender' name="gender" value="Male" id="gender"/><label for="gender">Male</label>
                <input type="radio" ref='gender' name="gender" value="Female" id="gender"/><label for="gender">Female</label>
                <input type="radio" ref='gender' name="gender" value="Other" id="gender"/><label for="gender">Other</label>
              <label for="CreateProfile">Summary</label>
                <textarea name="summary" ref='summary' id="summary" placeholder= {this.state.user.summary}></textarea>
              <input type="checkbox" name="searchable" ref='searchable' id="searchable" defaultChecked>
                <label for="checkbox1">Allow Users to Find Me</label>
              </input>
            </fieldset>
            <button type="submit" className="button small">Create Profile</button>
          </form>
        </div>
      </div>
    );
  }
});

module.exports.CreateProfile = CreateProfile;
