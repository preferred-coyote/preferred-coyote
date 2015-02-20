/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');
var pubnubStore = require('../../stores/pubnubStore');
var userStore = require('../../stores/userStore');


var PubNub = React.createClass({
	setInitialState: function() {
		return {
			available: false,
			availableUsers: pubnubStore.getUsersAvailable()
		}
	},

	nextUser: function() {

	},

	endCall: function() {

	},

  render: function() {
    return (
      <div>
      	<h1>Hello {this.state.username}</h1>
      	<h4>Available Users: {this.state.availableUsers}</h4>
      	
		    <video autoplay id='uservideo'></video>
		    <video autoplay id='peervideo'></video>
		    <button id="nextUser" onClick={this.nextUser}>Next!</button>
		    <button id="endCall" onClick={this.endCall}>Stop Call</button>
      </div>
    )
  }
});

module.exports.PubNub = PubNub;