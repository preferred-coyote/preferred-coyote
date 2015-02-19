/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');

var CallArea = React.createClass({
  render: function() {
    return (
      <div>
        <button className="feeling-lucky-button">Random Chat</button>
      </div>
    )
  }
});

module.exports.CallArea = CallArea;