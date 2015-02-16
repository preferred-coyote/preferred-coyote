/** @jsx React.DOM */
var React = require('react');

var Button = require('../ui/button').Button;

var Login = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="large-12 columns">
          <h2>Login</h2>
          <form className="form" role="form" action="/api/auth/login" method="POST">
            <label for="username">Username</label>
    	      <input type="text" name="username" id="username" placeholder="username" />
            <label for="password">Password</label>
    	      <input type="password" name="password" id="password" />
    	      <button type="submit" className="button">Login</button>
          </form>
        </div>
      </div>
    );
  }
});

module.exports.Login = Login;
