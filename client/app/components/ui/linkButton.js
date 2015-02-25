var React = require('react');
var Link = require('react-router').Link;

var LinkButton = React.createClass({
  render: function() {
    return (
      <li className="divider"></li>
      <li><Link to={this.props.to}>{this.props.text}</Link></li>
    );
  }
});

module.exports.LinkButton = LinkButton;
