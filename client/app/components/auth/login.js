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
        transition.redirect('profile');
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
      this.transitionTo('profile');
    } else {
      //update UI, username or password wrong
      this.setState({
        error: 'Incorrect username or password'
      });
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
        <div className="large-12 columns">
          <h2>Login</h2>
          {error}
          <form className="form" onSubmit={this.login} role="form" action="/api/auth/login" method="POST">
            <label htmlFor="username">Username</label>
    	      <input type="text" name="username" ref="username" id="username" placeholder="username" />
            <label htmlFor="password">Password</label>
    	      <input type="password" name="password" ref="password" id="password" />
    	      <button type="submit" className="button button-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
});

module.exports.Login = Login;
