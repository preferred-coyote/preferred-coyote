/** @jsx React.DOM */
var React = require('react');
var Reflux = require('reflux');

// Routing
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var LinkButton = require('./ui/linkButton').LinkButton;

var actions = require('../actions/actions');
var userStore = require('../stores/userStore');

// Components
var Header = require('./header').Header;
var User = require('./user').User;


var App = React.createClass({

  mixins: [
    Reflux.listenTo(userStore, 'setLoggedIn')
  ],

  getInitialState: function() {
    return {
      loggedIn: false
    };
  },

  logout: function() {
    actions.logout();
  },

  setLoggedIn: function() {
    var user = userStore.getUserData();
    console.log('set state')
    this.setState({
      loggedIn: user && user.loggedIn // set bool as to whether use is logged in
    });
  },

  getNav: function() {
    if (this.state.loggedIn) {
      return [
        { to: 'profile', text: 'Profile' }
      ];
    } else {
      return [
        { to: 'login', text: 'Login' },
        { to: 'signup', text: 'Signup' }
      ];
    }
  },

  render: function() {
    var buttons = this.getNav().map(function(link) {
      if (typeof link === 'object') {
        return <LinkButton to={link.to} text={link.text} />
      } else {
        return link;
      }
    });

    return (
      <div className="wrapper">
        <Header appName="Converse.ly">
          <li className="divider"></li>
          <li><Link to="index">Home</Link></li>
          <li><a href="#" onClick={this.logout}>Logout</a></li>
          {buttons}
        </Header>
        <main id="main" role="main" className="main">
          <RouteHandler />
        </main>
      </div>
    )
  }
});

module.exports.App = App;
