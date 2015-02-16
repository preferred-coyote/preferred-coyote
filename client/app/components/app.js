/** @jsx React.DOM */
var React = require('react');

// Routing
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

// Components
var Header = require('./header').Header;
var User = require('./user').User;

var App = React.createClass({
  render: function() {
    return (
      <div className="wrapper">
        <Header appName="Converse.ly">
          <li className="divider"></li>
          <li><Link to="index">Home</Link></li>
          <li className="divider"></li>
          <li><Link to="signup">Sign up</Link></li>
          <li className="divider"></li>
          <li><Link to="login">Login</Link></li>
          <li className="divider"></li>
          <li><Link to="login">Logout</Link></li>
        </Header>
        <main id="main" role="main" className="main">
          <RouteHandler />
        </main>
      </div>
    )
  }
});

module.exports.App = App;
