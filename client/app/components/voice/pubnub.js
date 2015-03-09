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

  getInitialState: function() {
    var user = JSON.parse(window.localStorage.getItem('user'));
    return {
      user: user.username,
      peer: null,
      userlist: [],
      messages: []
    };
  },

  componentDidMount: function() {
    var user = this.state.user;
    var channel = this.state.channel;
    var peer = this.state.peer;
    var self = this;
    if (self.isMounted()) {
      pubnub = channelStore.pubnubInit(channel);
      self.subscribeToPrivate(user, pubnub, channel);
    }
    // self.handshake(user, peer, channel);
    // self.initializePhone(user);
    self.startCall();
  },

  render: function() {
    var peer = this.state.peer || '';
    var user = this.state.user || '';
    var userlist = this.state.userlist.length ? this.state.userlist.map(function(user) {
      return <li>{user}</li>;
    }) : 'There are no users available.';

    var messageList = this.state.messages.length ? this.state.messages.map(function(message) {
      return <li>{message}</li>
    }) : 'No messages.';

    return (
      <div className="row">
        <div className="row">
          <div className="large-12 columns">
            <h1>You are chatting with {this.state.peer}</h1>
          </div>
        </div>
        <div className="row">
          <div className="large-10 columns">
            <video width="250" autoPlay id='uservideostream' ref='uservideostream' poster="https://igcdn-photos-e-a.akamaihd.net/hphotos-ak-xfa1/t51.2885-15/11005049_1565239487047612_521686647_n.jpg" className="medium-4 columns"></video>
            <div className="medium-4 columns">
              <span className="icon-volume-mute medium-1 columns" id="lefticon"></span>
              <span className="icon-volume-mute2 medium-1 columns" id="righticon"></span>
              <ul className="button-group stack" id="callbuttons">
                <li><a href="#" onClick={this.makeCall} className="button"><span className="icon-phone"></span>Call!</a></li>
                <li><a href="#" onClick={this.endCall} className="button"><span className="icon-phone-hang-up"></span>Stop Call</a></li>
              </ul>
            </div>
            <video width="250" autoPlay id='peervideostream' ref='peervideostream' poster="https://igcdn-photos-b-a.akamaihd.net/hphotos-ak-xpf1/t51.2885-15/10326583_452330148250353_1893737027_n.jpg" className="medium-4 columns"></video>
          </div>
        </div>
        <div className="row">
          <div className="large-10 columns">
            <h3>Messages</h3>
            <div id="messagearea">
              <ul className="no-bullet">
                {messageList}
              </ul>
            </div>
            <div className="row">
              <div className="large-10 columns">
                <input type="text" placeholder="Message" ref="message" onKeyPress={this.sendMessage} id="inputmessage"></input>
              </div>
              <div className="large-2 columns">
                <button className="button small expand" onClick={this.sendMessage} id="sendbutton">Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  //for "Call User" button, it hits getInitialSTate > render > ComponentDidMount
  //automatically
  //this allows us to get the user by going "this.state.user"


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
    var user = this.state.user;

    if (session) {
      session.hangup();
    }

    this.changePhoneState(user, false);

    this.setState({
      peer: null
    });
  },

  endAll: function() {
    session.hangup();
    phone.hangup();
    pubnub.unsubscribe({
      channel: 'preferred-coyote'
    });
  },

  changePhoneState: function(user, state) {
    pubnub.state({
      channel: 'preferred-coyote',
      uuid: user,
      state: { available: state },
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
