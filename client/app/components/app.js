/** @jsx React.DOM */
var React = require('react');
var Reflux = require('reflux');

// Routing
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
// var LinkButton = require('./ui/linkButton').LinkButton;

var actions = require('../actions/actions');
var userStore = require('../stores/userStore');

// Components
var Header = require('./header').Header;
var User = require('./user').User;

var App = React.createClass({

  mixins: [
    Reflux.listenTo(userStore, 'setLoggedIn'),
    Router.Navigation,
    Router.State
  ],

  getInitialState: function() {
    return {
      loggedIn: userStore.isLoggedIn()
    };
  },

  componentDidMount: function() {
    var path = this.getPathname();
    if (this.state.loggedIn && ['/', '/login', '/signup'].indexOf(path) !== -1) {
      this.transitionTo('dashboard');
    }
  },

  logout: function(e) {
    e.preventDefault();
    actions.logout();
    this.transitionTo('index');
  },

  setLoggedIn: function() {
    // user store has changed, get the user data
    var user = userStore.getUserData();
    // set the state to loggedIn if the user is present and logged in
    this.setState({
      loggedIn: user && user.loggedIn // set bool as to whether use is logged in
    });
  },

  getNav: function() {
    if (this.state.loggedIn) {
      return [
        { to: 'dashboard', text: 'Dashboard'},
        { to: 'profile', text: 'Edit Profile' },
      ];
    } else {
      return [
        { to: 'about', text: 'About'},
        { to: 'login', text: 'Login' },
        { to: 'signup', text: 'Signup' },
        { to: 'contact', text: 'Contact'}
      ];
    }
  },

  render: function() {
    var buttons = this.getNav().map(function(link) {
      if (typeof link === 'object') {
        return <li><Link to={link.to}>{link.text}</Link></li>
      } else {
        return link;
      }
    });

    return (
      <div className="wrapper">
        <Header appName="Converse.ly">
          <li className="divider"></li>
          <li><Link to="index">Home</Link></li>
          {buttons}
          {this.state.loggedIn ? <li><a href="#" onClick={this.logout}>Logout</a></li> : ''}
        </Header>
        <main id="main" role="main" className="main">
          <RouteHandler />
        </main>
      </div>
    )
  }
});

module.exports.App = App;
