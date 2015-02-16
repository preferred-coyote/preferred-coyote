/** @jsx React.DOM */
var React = require('react');

var Signup = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="large-12 columns">
          <h1>Sign Up</h1>
        	<form className="form" role="form" action="/api/auth/login" method="POST">
    	      <label for="username">Username</label>
            <input type="text" id="username" name="username" placeholder="username"/>
            <label for="password">Password</label>
    	      <input id="password" type="password" name="password" />
    	      <button type="submit" className="button">Login</button>
          </form>
        </div>
      </div>
    );
  }
});

module.exports.Signup = Signup;
