/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');

var Button = require('../ui/button').Button;
var actions = require('../../actions/actions');

var loginStore = require('../../stores/loginStore');
var userStore = require('../../stores/userStore');

var Login = React.createClass({

  mixins: [
    Reflux.listenTo(userStore, "onLoggedIn"),
    Router.Navigation
  ],

  statics: {
    willTransitionTo: function(transition) {
      if (userStore.isLoggedIn()) {
        transition.redirect('dashboard');
      }
    }
  },

  getInitialState: function() {
    return {
      error: '',
      submitted: false
    };
  },

  onLoggedIn: function(isAuthenticated) {
    if (isAuthenticated) {
      this.transitionTo('dashboard');
    } else {      //update UI, username or password wrong
      this.setState({
        error: 'Incorrect username or password'
      });

      // this.transitionTo('profile');
    }
  },

  login: function(e) {
    e.preventDefault();
    actions.login({
      username: this.refs.username.getDOMNode().value.trim(),
      password: this.refs.password.getDOMNode().value.trim()
    });
  },

  render: function() {
    var error = this.state.error
      ? <div className="error login-error">{this.state.error}</div>
      : '';

    return (
      <div className="row">
        <div className="large-8 large-centered columns">
          <h2 className="lets-talk-about text-white text-center">Login</h2>
          {error}
          <form className="form" onSubmit={this.login} role="form" action="/api/auth/login" method="POST">
            <label htmlFor="username" className="text-white text-center">Username</label>
    	      <input type="text" name="username" className="round" ref="username" id="username" placeholder="username" />
            <label htmlFor="password" className="text-center text-white">Password</label>
    	      <input type="password" className="round" name="password" ref="password" id="password" />
    	      <button type="submit" className="button button-primary">
              Login
            </button>
          </form>
          { error }
        </div>
      </div>
    );
  }
});

module.exports.Login = Login;
