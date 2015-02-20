/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;

var Reflux = require('reflux');
var userStore = require('../stores/userStore');

var Header = React.createClass({

  mixins: [
    Reflux.listenTo(userStore, 'onLoggedIn')
  ],

  getInitialState: function() {
    return userStore.getUserData();
  },

  onLoggedIn: function(user) {
    var user = userStore.getUserData();

    this.setState({
      loggedIn: user.loggedIn
    });
  },

  render: function() {
    return (
      <header className="header top-bar" role="header">
        <ul className="title-area">
          <li className="name">
            <h1><Link to="index">{this.props.appName}</Link></h1>
          </li>
        </ul>
        <section className="top-bar-section">
          <ul className="right">
            {this.props.children}
          </ul>
        </section>
      </header>
    )
  }
});

module.exports.Header = Header;
