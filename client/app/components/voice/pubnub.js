/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');
var pubnubStore = require('../../stores/pubnubStore');
var userStore = require('../../stores/userStore');
var Reflux = require('reflux');

var pubnub;
var userlist = {};
var phone;

var session;
var connected = false;

var PubNub = React.createClass({

  mixins: [
    Reflux.listenTo(userStore, 'updateUser')
  ],

  updateUser: function() {
    return userStore.getUserData();
  },

  componentWillUnmount: function() {
    // phone.hangup();
  },

  render: function() {
    var peer = this.state.peer || '';
    var user = this.state.user || '';
    var userlist = this.state.userlist.length ? this.state.userlist.map(function(user) {
      return <li>{user}</li>;
    }) : 'There are no users available.';

    return (
      <div>
      	<h1>Hello @{this.state.user}</h1>
      	<div className="row">
          <div className="large-6 columns">
            <video width="250" autoPlay id='uservideo'></video>
            {user}
          </div>
          <div className="large-6 columns">
            <video width="250" autoPlay id='peervideo'></video>
            {peer}
          </div>
        </div>
        <ul>
          {userlist}
        </ul>
        <button id="startCall" onClick={this.startCall}>Call!</button>
        <button id="nextUser" onClick={this.nextUser}>Next!</button>
        <button id="endCall" onClick={this.endAll}>Stop Call</button>
      </div>
    );
  },

  //for "Call User" button, it hits getInitialSTate > render > ComponentDidMount
  //automatically
  //this allows us to get the user by going "this.state.user"
  getInitialState: function() {
    var user = JSON.parse(window.localStorage.getItem('user'));
    return {
      user: user.username,
      peer: null,
      userlist: []
    };
  },

  initializePhoneAndPubNub: function() {
    // Initializes both phone and pubnub
    pubnub = pubnubStore.pubnubInit();
    phone = pubnubStore.phoneInit();
    
  },

  startCall: function() {
    var self = this;
    var user = this.state.user;
    console.log('The current user is: ', user);

    if (pubnub === undefined && phone === undefined) {
      this.initializePhoneAndPubNub();
    }

    // declares channel and starting state for user
    pubnub.subscribe({
      //TODO: change channel name later to grab interest as name
      channel: 'preferred-coyote',
      message: function(message) {
        console.log(JSON.stringify(message));
      },
      state: {
        name: user,
        timestamp: new Date(),
        available: true
      },

      presence: function(info) {
      // detects users in channel and sets them in this.state
        pubnubStore.getUsersAvailable(user, pubnub)
          .then(function(list) {
            list = Object.keys(list);
            self.setState({
              userlist: list
            });
          })
          .catch(function(err) {
            console.log(err);
          });
      },

      // Heartbeat defines heartbeat frequency to monitor for subscriber timeouts.
      heartbeat: 10,

      connect: function(userlist) {

        //getUsersAvailable returns a list of users currently in channel who are available
        pubnubStore.getUsersAvailable(user, pubnub)
          .then(function(list){

          //findRandomUser selects one user randomly from userlist
            return pubnubStore.findRandomUser(list);
          })
          .then(function(rando){

            // start call with random user selected
            self.phoneUser(rando);
          });
      },

      callback: function(msg) {
        pubnubStore.getUsersAvailable(user, pubnub)
        .then(function(list) {
          list = Object.keys(list);
          console.log('list is', list);
          self.setState({
            userlist: list
          });
        })
        .catch(function(err) {
          console.log(err);
        });
      }
    });
  },

  nextUser: function() {
    this.endCall();
    var self = this;
    var user = this.state.user;
    pubnubStore.getUsersAvailable(user, pubnub)
      .then(function(userlist){
        return pubnubStore.findRandomUser(userlist);
      })
      .then(function(rando){
        console.log('random user is: ', rando);
        session = phone.dial(rando);
      });
  },

  endCall: function() {
    var self = this;
    var user = this.state.user;
    console.log('in endCall, user is', user);
    if (session) {
      console.log('in endCall, session exists');
      console.log('session is ', session);
      session.hangup();
    };
    console.log('in endcall after hangup, user is ', user);
    self.changePhoneState(user, false);
    this.setState({
      peer: null
    });
  },

  endAll: function() {
    session.hangup();
    phone.hangup();
    pubnub.unsubscribe({
      channel: 'preferred-coyote'
    })
  },

  changePhoneState: function(user, state) {
    // var pubnub = pubnubStore.pubnubInit();
    pubnub.state({
      channel: 'preferred-coyote',
      uuid: user,
      state: {available: state},
      callback: function() {
        pubnub.publish({
          channel: 'preferred-coyote',        
          message: 'Message posted'
        });
      }
    });
  },

  phoneUser: function(rando) {
    var self = this;
    var user = this.state.user;
    // phone = pubnubStore.phoneInit();
    phone.ready(function(){
      pubnub.publish({
        channel: 'preferred-coyote',        
        message: 'Message posted'
      });
      session = phone.dial(rando);
    });
    // When Call Comes In or is to be Connected
    phone.receive(function(session){
      //TODO: only receive session when user accepts
      //on click thingy
        //if so then run everything below:
      if (connected) return session.hangup();
      
      session = session;
      self.changePhoneState(user, false);
      var peervideo = document.getElementById('peervideo');
      var uservideo = document.getElementById('uservideo');
      pubnub.publish({
          channel: 'preferred-coyote',        
          message: 'Message posted'
        });
      // Display Your Friend's Live Video
      session.connected(function(session){
        // set the peer that you've connected to
        self.changePhoneState(user, false); 
        connected = true;
        self.setState({
          peer: session.number
        });
        console.log('I HAVE CONNECTED! SESSION: ', session);
        console.log('PHONE: ', phone);
        peervideo.src = session.video.src;
        peervideo.play();
        uservideo.src = phone.video.src;
        uservideo.play();
        pubnub.publish({
          channel: 'preferred-coyote',        
          message: 'Message posted'
        });
      });
      session.ended(function(session) {
        // phone.hangup();
        connected = false;
        self.changePhoneState(user, true);
        pubnub.publish({
          channel: 'preferred-coyote',        
          message: 'Message posted'
        });
      })
    });
  }
});

module.exports.PubNub = PubNub;