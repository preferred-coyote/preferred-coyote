/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');
var pubnubStore = require('../../stores/pubnubStore');
var userStore = require('../../stores/userStore');


var pubnub = PUBNUB.init({
  channel       : 'preferred-coyote',
  uuid          : userStore.getUserData().username,
  publish_key   : 'pub-c-d0f394d5-41a9-47aa-ae8d-5629f6cb46c7',
  subscribe_key : 'sub-c-2bcfffc6-b3d1-11e4-9a8b-0619f8945a4f'
});

var phone = PHONE({
  number        : 'alex',
  publish_key   : 'pub-c-d0f394d5-41a9-47aa-ae8d-5629f6cb46c7',
  subscribe_key : 'sub-c-2bcfffc6-b3d1-11e4-9a8b-0619f8945a4f',
  media : { audio : true, video : true },
  ssl           : false
});

var PubNub = React.createClass({

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
  },

	getInitialState: function() {
		return {
			user: userStore.getUserData().username,
			users: userStore.getUserData()
		}
	},

	componentDidMount: function(user) {
		var self = this;
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
				pubnubStore.getUsersAvailable(self.state.user);
				var rando = pubnubStore.findRandomUser();
				self.phoneUser(rando);
      }
    });

	},

	setInitialState: function() {
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
			console.log(userlist);
		})
		var user = pubnubStore.findRandomUser();
		console.log('IN NEXT USER, OUR USER IS: ', user);

		self.phoneUser(user);
	},

	endCall: function() {
		phone.hangup();
	},

	changePhoneState: function(user, state) {
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
    phone.ready(function(){
      session = phone.dial(user);
      self.changePhoneState(user, false);
    });
    // When Call Comes In or is to be Connected
    phone.receive(function(session){
      var peervideo = document.getElementById('peervideo');
      var uservideo = document.getElementById('uservideo');

      console.log('username in receive:', username);
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