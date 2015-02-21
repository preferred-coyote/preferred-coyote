/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');

var signupStore = require('../../stores/signupStore');
var userStore = require('../../stores/userStore');
var Actions = require('../../actions/actions');

var Signup = React.createClass({
  mixins: [
    Reflux.listenTo(userStore, "onLoggedIn"),
    Router.Navigation
  ],
  getInitialState: function(){
    return {
      signupMessage: ''
    }
  },

  onLoggedIn: function(isAuthenticated) {
    if (isAuthenticated) {
      this.transitionTo('profile');
    } else {
      this.setState({signupMessage: 'Username already taken'});
    }
  },

  signup: function(e) {
    e.preventDefault();
    Actions.signup({
      username: this.refs.username.getDOMNode().value.trim(),
      password: this.refs.password.getDOMNode().value.trim()
    });
  },

  render: function() {
    return (
      <div className="row">
        <div className="large-12 columns">
          <h1>Sign Up</h1>
          <div>
            {this.state.signupMessage}
          </div>
        	<form className="form" onSubmit={this.signup} role="form" action="/api/auth/signup" method="POST">
    	      <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" ref="username" placeholder="username"/>
            <label htmlFor="password">Password</label>
    	      <input id="password" type="password" ref="password" name="password" />
    	      <button type="submit" className="button">Signup</button>
          </form>
        </div>
      </div>
    );
  }
});

module.exports.Signup = Signup;
