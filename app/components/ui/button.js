/** @jsx React.DOM */

var React = require('react');

var Button = React.createClass({
  render: function() {
    return (
      <a href={this.props.href || '#'} title={this.props.title || ''} className="btn">
        {this.props.children}
      </a>
    );
  }
});

module.exports.Button = Button;
