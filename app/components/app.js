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
        <Header appName={this.props.appName}>
          <li><Link to="index">Home</Link></li>
          <li><Link to="page1">Page 2</Link></li>
          <li><Link to="login">Login</Link></li>
        </Header>
        <main>
          <RouteHandler />
        </main>
      </div>
    )
  }
});

module.exports.App = App;
