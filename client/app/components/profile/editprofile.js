/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');

var Actions = require('../../actions/actions');
var userStore = require('../../stores/userStore');
// var profileStore = require('../../stores/profileStore');
var Pass = require('./pass').Pass;
var Info = require('./info').Info;
var Authentication = require('../../utils/Authentication');

var EditProfile = React.createClass({

  mixins: [
    Authentication,
    Reflux.listenTo(userStore, 'onCreate'),
    Router.Navigation
  ],

  getInitialState: function() {
    return {
      createProfileMessage: '',
      user: JSON.parse(window.localStorage.user),
      avatar: 'https://igcdn-photos-e-a.akamaihd.net/hphotos-ak-xfa1/t51.2885-15/11005049_1565239487047612_521686647_n.jpg'
    }
  },

  componentDidMount: function() {
    var data = userStore.getUserData();
    var element = document.getElementsByName('gender');
    console.log('element: ', element);

    for (var i = 0; i < element.length; i++) {
      if (element[i].value === data.user.gender) {
        element[i].checked = true;
      }
    }

  },

  onCreate: function(isCreated) {
    if(isCreated) {
      this.transitionTo('dashboard');
    } else {
      this.setState({ createProfileMessage: 'SOMETHING WENT WRONG IN CREATE PROFILE' });
    }
  },

  whatGender: function() {
    var element = document.getElementsByName('gender');
    for (var i = 0; i < element.length; i++) {
      if (element[i].checked) {
        return element[i].value;
      }
    }
  },

  editProfile: function(e) {
    var gender = this.whatGender();
    e.preventDefault();
    Actions.editProfile({
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
        <div className="medium-12 columns fade-in">
        <div className="fade-one" id="edit-profile-header">Edit Profile</div>
          <div className="medium-6 columns">
            <form className="form" onSubmit={this.editProfile} role="form" action="/api/user/editprofile" encType="multipart/form-data" method="POST">
              <fieldset>
                <legend id="legend">Basic Information</legend>
                <Info avatarimg={this.state.avatar} />
                <label htmlFOR="location">Location</label>
                  <input type="text" id="location" name="location" ref="location" defaultValue={this.state.user.location}/>
                <label htmlFOR="gender">Gender</label>
                  <input type="radio" ref='gender' name="gender" value="Male" id="gender" /><label htmlFor="gender">Male</label>
                  <input type="radio" ref='gender' name="gender" value="Female" id="gender"/><label htmlFor="gender">Female</label>
                  <input type="radio" ref='gender' name="gender" value="Other" id="gender"/><label htmlFor="gender">Other</label>
                <label htmlFor="EditProfile">Summary</label>
                  <textarea name="summary" ref='summary' id="summary" defaultValue= {this.state.user.summary}></textarea>
                <input type="checkbox" name="searchable" ref='searchable' id="searchable" defaultChecked>
                  <label htmlFor="checkbox1">Allow Users to Find Me</label>
                </input>
                <button type="submit" className="button expand profile-submit">Save Profile</button>
              </fieldset>
            </form>
          </div>
          <div className="medium-6 columns">
            <Pass />
          </div>
        </div>
      </div>
    );
  }
});

module.exports.EditProfile = EditProfile;
