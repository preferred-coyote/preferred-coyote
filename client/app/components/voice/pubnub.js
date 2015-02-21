/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');
var pubnubStore = require('../../stores/pubnubStore');
var userStore = require('../../stores/userStore');
var Reflux = require('reflux');


var pubnub;
var userlist = {};
var phone;

var PubNub = React.createClass({

  mixins: [
    Reflux.listenTo(userStore, 'updateUser')
  ],

  updateUser: function() {
    return userStore.getUserData();
  },

  render: function() {
    return (
      <div>
      	<h1>Hello {this.state.username}</h1>
      	<h4>Available Users: {this.state.availableUsers}</h4>
      	
		    <video autoPlay id='uservideo'></video>
		    <video autoPlay id='peervideo'></video>
		    <button id="nextUser" onClick={this.nextUser}>Next!</button>
		    <button id="endCall" onClick={this.endCall}>Stop Call</button>
      </div>
    )
  },

	getInitialState: function() {
    console.log('in getInitialState, username: ', this.updateUser());
		return {
			// user: userStore.getUserData().username,
      user: this.updateUser()
			// users: userStore.getUserData()
		}
	},

	componentDidMount: function() {
		var self = this;
    var user = this.state.user;
    console.log('user is: ', user);
    pubnub = pubnubStore.pubnubInit();
    console.log('pubnub should have initialized ', pubnub);
    phone = pubnubStore.phoneInit();
    console.log('phone should have initialized ', phone);
    pubnub.subscribe({
      channel: 'preferred-coyote',
      message: function(message) {
        console.log(JSON.stringify(message));
      },
      state: {
        name: user,
        timestamp: new Date(),
        available: true
      },

      heartbeat: 300,
      connect: function() {
				pubnubStore.getUsersAvailable(self.state.user, pubnub, userlist)
        .then(function(){
				  return pubnubStore.findRandomUser(userlist);
        })
        .then(function(rando){
          console.log('random user is: ', rando);
				  self.phoneUser(rando);
        })
      }
    });

	},

	setInitialState: function() {
    console.log('in setInitialState');
		var self = this;
		return {
			available: false,
			availableUsers: pubnubStore.getUsersAvailable(self.state.user)
		}
	},

	nextUser: function() {
		console.log('users', this.state.users);
		console.log('IN NEXT USER');
		var self = this;
		self.endCall();
		pubnubStore.getUsersAvailable().then(function(userlist) {
			console.log('userlist in nextUser: ', userlist);
		})
		var rando = pubnubStore.findRandomUser();
		console.log('IN NEXT USER, OUR USER IS: ', pubnubStore);

		self.phoneUser(rando);
	},

	endCall: function() {
		phone.hangup();
	},

	changePhoneState: function(user, state) {
    // var pubnub = pubnubStore.pubnubInit();
   	pubnub.state({
    	channel: 'preferred-coyote',
    	uuid: user,
    	state: {available: state},
    	callback: function(user) {
    		console.log(JSON.stringify(user));
    	}
  	});
	},

	phoneUser: function(user) {
		var self = this;
    var user = this.state.user;
    // phone = pubnubStore.phoneInit();
    phone.ready(function(){
      var rando = pubnubStore.findRandomUser();
      console.log('phone dialing: ', rando);
      session = phone.dial(rando);
      self.changePhoneState(user, false);
    });
    // When Call Comes In or is to be Connected
    phone.receive(function(session){
      var peervideo = document.getElementById('peervideo');
      var uservideo = document.getElementById('uservideo');

      // Display Your Friend's Live Video
      session.connected(function(session){
        console.log(session);
        peervideo.src = session.video.src;
        peervideo.play();
        uservideo.src = phone.video.src;
        uservideo.play();
        self.changePhoneState(user, false);
      });
      session.ended(function(session) {
        console.log('Session ended. Goodbye!');
        self.changePhoneState(user, true);
      })
    });
	}
});

module.exports.PubNub = PubNub;