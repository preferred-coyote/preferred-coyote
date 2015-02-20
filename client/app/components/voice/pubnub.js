/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');

var PubNub = React.createClass({
  render: function() {
    return (
      <div>
        <div id='usersubscribe' style='margin:10px'>
		      <input type="text" name="username" placeholder="Username" id="username">
		      <input type="button" value="Subscribe" onclick="sub(document.getElementById('username').value)" id="subscribe">
		    </div>
		    <div id='buttons' style='margin:10px'>  
		      <input type="button" value="Here Now" onclick="herenow()">
		    </div>
		    <div class="row">
		      <div id='herenow' class="large-6 columns"></div>
		      <div id='hereandavailable' class="large-6 columns"></div>
		    </div>
		    <video autoplay id='uservideo'></video>
		    <video autoplay id='peervideo'></video>
      </div>
    )
  }
});

module.exports.PubNub = PubNub;