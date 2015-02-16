/** @jsx React.DOM */

var React = require('react/addons');
var Home = React.createClass({
  render: function() {
    return (
      <article className="home">
        <h1>Home</h1>
      </article>
    )
  }
});

module.exports.Home = Home;
