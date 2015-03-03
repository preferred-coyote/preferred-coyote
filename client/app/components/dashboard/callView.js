/** @jsx React.DOM */
var React = require('react/addons');
var Authentication = require('../../utils/Authentication');

var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var Link = require('react-router').Link;

var channelStore = require('../../stores/channelStore');

var pubnub;
var phone;
var session;

var CallView = React.createClass({

  mixins: [Authentication, Router.State],

  getInitialState: function() {
    var user = JSON.parse(window.localStorage.getItem('user')).username;
    var peer = this.getQuery().peer;
    var channel = this.getQuery().channel || user + this.getQuery().peer;
    return {
      callUser: 'call' + user,
      callPeer: 'call' + peer,
      user: user,
      peer: peer,
      channel: channel,
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
          <video width="250" autoPlay id='uservideostream' ref='uservideostream'></video>
          <video width="250" autoPlay id='peervideostream' ref='peervideostream'></video>
          <div id='testvideo'></div>
        </div>
        <div className="row">
          <ul className="button-group round">
            <li><a href="#" onClick={this.makeCall} className="button">Call!</a></li>
            <li><a href="#" onClick={this.endCall} className="button">Stop Call</a></li>
          </ul>
        </div>
        <div className="large-10  columns">
          <h3>Messages</h3>
          <ul className="no-bullet">
            {messageList}
          </ul>
          <div className="row">
            <div className="medium-10 columns">
              <label>Message
                <textarea placeholder="Message" ref="message"></textarea>
              </label>
            </div>
            <div className="medium-2 columns">
              <button className="button" onClick={this.sendMessage}>Send Message</button>
            </div>
          </div>
        </div>
      </div>
    );
  },

////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// PUBNUB CHANNEL ///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

  handshake: function(user, peer, channel) {
    var peer = peer || this.state.peer;
    var channel = channel || this.state.channel;
    var user = user || this.state.user;
    pubnub.publish({
      channel: peer,        
      message: user + ' ' + peer + ' ' + channel
    });
  },

  sendMessage: function() {
    var message = this.refs.message.getDOMNode().value.trim();
    var channel = this.state.channel;
    var user = this.state.user;
    
    pubnub.publish({
      channel: channel,        
      message: user + ': ' + message
    });

    this.refs.message.getDOMNode().value = '';
  },

  subscribeToPrivate: function(user, pubnub, channel) {
    var self = this;
    var user = user || this.state.user;

    pubnub.subscribe({
      channel: channel,
      
      connect: function() {
        pubnub.publish({
          channel: channel,        
          message: user + ' has joined the channel.'
        });

        self.handshake();
      },
      
      state: {
        name: user,
        timestamp: new Date()
      },
      
      presence: function(info) {
        // detects users in channel and sets them in this.state
      },
      
      // Heartbeat defines heartbeat frequency to monitor for subscriber timeouts.
      heartbeat: 10,
      callback: function(message, env, channel) {
        if (self.isMounted()) {
          self.setState({
            messages: self.state.messages.concat(message)
          });
        }
      }
    });
  },

////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// PUBNUB PHONE /////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

  startCall: function() {
    var self = this;
    var user = self.state.user;
    var peer = self.state.peer;
    var callUser = self.state.callUser;
    var callPeer = self.state.callPeer;
    // phone = phone;
    self.initializePhone().then(function(phone) {
      // self.phoneUser(user, peer, callUser, callPeer);
      console.log('initialized!');
      self.pickUp();
      // document.getElementById('callbutton').className.replace(/\bdisabled\b/,'');
    })
  },

  initializePhone: function() {
    var user = this.state.user;
    var callUser = this.state.callUser;
    var self = this;
    console.log('in initializePhone, user is: ', user);
    console.log('in initializePhone, callUser is: ', callUser);
    console.log('in initializePhone, phone is: ', phone);
    return new Promise(function(resolve, reject) {
      channelStore.phoneInit(callUser).then(function(newPhone) {
        phone = newPhone;
        console.log('in initializePhone promise, phone is:', phone );
      });
      resolve(phone);
    });
  },

  makeCall: function(user, peer, callUser, callPeer) {
    var self = this;
    var user = user || this.state.user;
    var peer = peer || this.state.peer;
    var callUser = callUser || this.state.callUser;
    var callPeer = callPeer || this.state.callPeer;
    var channel = this.state.channel;

    session = phone.dial(callPeer);
      pubnub.publish({
        channel: self.state.channel,        
        message: self.state.user + ' is trying to dial.'
      });

  },

  pickUp: function(user, peer, callUser, callPeer) {
    var self = this;
    var user = user || this.state.user;
    var peer = peer || this.state.peer;
    var callUser = callUser || this.state.callUser;
    var callPeer = callPeer || this.state.callPeer;
    var channel = this.state.channel;

    phone.receive(function(newSession) {
      console.log('in phone.receive, newSession is: ', newSession);

      session = newSession;

      var peervideo = self.refs.peervideostream.getDOMNode();
      var uservideo = self.refs.uservideostream.getDOMNode();

      console.log('in phone receive, channel is: ', channel);
      console.log('in phone receive, user is: ', user);
      console.log('in phone receive, callUser is: ', callUser);

      pubnub.publish({
        channel: self.state.channel,        
        message: self.state.user + ' is receiving a call.'
      });

      console.log('in phone receive, should have published message');

      newSession.connected(function(newSession) {
        // set the peer that you've connected to
        console.log('in phone connected, channel is: ', channel);
        console.log('in phone connected, user is: ', user);
        console.log('in phone connected, callUser is: ', callUser);

        pubnub.publish({
          channel: self.state.channel,        
          message: self.state.user + ' is now connected.'
        });

        console.log('connection status in connected: ', newSession);
        console.log('uservideo: ', uservideo);

        console.log('status is: ', newSession.status);
        console.log('peervideo: ', peervideo);
        console.log('session.video: ', newSession.video);
        
        uservideo.src = phone.video.src;
        peervideo.src = '';
        peervideo.src = newSession.video.src;

      });
      
      newSession.ended(function(newSession) {
        pubnub.publish({
          channel: self.state.channel,        
          message: self.state.user + ' has disconnected.'
        });
      });

    });
  },

  phoneUser: function(user, peer, callUser, callPeer) {
    var self = this;
    var user = user || this.state.user;
    var peer = peer || this.state.peer;
    var callUser = callUser || this.state.callUser;
    var callPeer = callPeer || this.state.callPeer;
    var channel = this.state.channel;
    console.log('in phoneUser');

    phone.ready(function() {
      console.log('in phone ready, peer is: ', peer);
      console.log('in phone ready, callPeer is: ', callPeer);
      console.log('in phone ready, channel is: ', channel);
      console.log('in phone ready, user is: ', user);
      console.log('in phone ready, callUser is: ', callUser);

      var session = phone.dial(callPeer);
      pubnub.publish({
        channel: self.state.channel,        
        message: self.state.user + ' is trying to dial.'
      });
      console.log('in phone ready, should have published message');
    });

    phone.receive(function(newSession) {
      console.log('in phone.receive, newSession is: ', newSession);

      session = newSession;

      var peervideo = self.refs.peervideostream.getDOMNode();
      var uservideo = self.refs.uservideostream.getDOMNode();

      console.log('in phone receive, channel is: ', channel);
      console.log('in phone receive, user is: ', user);
      console.log('in phone receive, callUser is: ', callUser);

      pubnub.publish({
        channel: self.state.channel,        
        message: self.state.user + ' is receiving a call.'
      });

      console.log('in phone receive, should have published message');

      newSession.connected(function(newSession) {
        // set the peer that you've connected to
        console.log('in phone connected, channel is: ', channel);
        console.log('in phone connected, user is: ', user);
        console.log('in phone connected, callUser is: ', callUser);

        pubnub.publish({
          channel: self.state.channel,        
          message: self.state.user + ' is now connected.'
        });

        console.log('connection status in connected: ', newSession);
        console.log('uservideo: ', uservideo);

        console.log('status is: ', newSession.status);
        console.log('peervideo: ', peervideo);
        console.log('session.video: ', newSession.video);
        
        uservideo.src = phone.video.src;
        peervideo.src = '';
        peervideo.src = newSession.video.src;

      });
      
      newSession.ended(function(newSession) {
        pubnub.publish({
          channel: self.state.channel,        
          message: self.state.user + ' has disconnected.'
        });
      });

    });

  },

  endCall: function() {
    session.hangup();
    phone.hangup();
  }

});

module.exports.CallView = CallView;