/** @jsx React.DOM */

var React = require('react/addons');

var Header = React.createClass({
  render: function() {
    return (
      <header className="header" role="header">
        <h1>{this.props.appName}</h1>
        {this.props.children}
      </header>
    )
  }
});

module.exports.Header = Header;
