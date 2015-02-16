/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;

var Header = React.createClass({
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
