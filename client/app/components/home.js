/** @jsx React.DOM */

var React = require('react/addons');
var Link = require('react-router').Link;
var About = require('./about').About;


var Home = React.createClass({

  render: function() {
    return (
      <div>
        <div className="row">
          <div className="medium-12 columns">
            <h2 className="lets-talk-about text-white text-center">Lets talk about</h2>
            <h3 className="topic text-center text-white lets-talk-about">Golden State Warriors</h3>
          </div>
        </div>
        <div className="row">
          <div className="large-6 small-centered columns">
            <Link to="signup" className="button large shadow round expand">Signup</Link>
          </div>
        </div>
      </div>
    );
  }
});

module.exports.Home = Home;
