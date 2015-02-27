/** @jsx React.DOM */

var React = require('react/addons');
var Link = require('react-router').Link;

var About = require('./about').About;


var Home = React.createClass({

  componentDidMount: function() {
    $(document).foundation();
  },

  render: function() {
    return (
      <div className="row">
        <div className="medium-4 columns">
          <h1>Conversely</h1>
          <h2>Lets talk about</h2>
        </div>
        <ul data-orbit data-options="-webkit-transition: all 2s ease-in-out;-moz-transition: all 2s ease-in-out;-ms-transition: all 2s ease-in-out;-o-transition: all 2s ease-in-out;transition: all 2s ease-in-out;easing:linear;animation:slide;pause_on_hover:false;animation_speed:1000;slide_number:false;navigation_arrows:false;bullets:false;timer_speed: 1000;">
          <li data-orbit-slide="headline-1">
            <div>
              <span className="orbitText">BASKETBALL</span>
            </div>
          </li>
          <li data-orbit-slide="headline-2">
            <div>
              <span className="orbitText">LITERATURE</span>
            </div>
          </li>
          <li data-orbit-slide="headline-3">
            <div>
              <span className="orbitText">KINK.COM</span>
            </div>
          </li>
          <li data-orbit-slide="headline-2">
            <div>
              <span className="orbitText">STRING THEORY</span>
            </div>
          </li>
          <li data-orbit-slide="headline-2">
            <div>
              <span className="orbitText">PALEO DIETS</span>
            </div>
          </li>
        </ul>
        <Link to="/about" className="button info expand" >About</Link>
        <Link to="/contact" className="button info expand">Contact</Link>
      </div>
    );
  }
});

module.exports.Home = Home;
