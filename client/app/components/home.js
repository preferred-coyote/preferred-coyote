/** @jsx React.DOM */

var React = require('react/addons');
var Link = require('react-router').Link;

var About = require('./about').About;


var Home = React.createClass({
  render: function() {
    return (
      <div className="row">
          <h1>Conversely</h1>
          <Link to="/about" className="button info expand" id="homePageButton">About</Link>
          <Link to="/contact" className="button info expand">Contact</Link>
      </div>
    );
  }
});

module.exports.Home = Home;
