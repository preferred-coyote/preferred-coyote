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
          <video width="250" autoPlay id='uservideo'></video>
          <video width="250" autoPlay id='peervideo'></video>
        </div>
        <div className="row">
          <ul className="button-group round">
            <li><a href="#" onClick={this.startCall} className="button">Call!</a></li>
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
        console.log('before handshake');
        self.handshake();
        console.log('after handshake');
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
          // console.log('before set state');
          self.setState({
            messages: self.state.messages.concat(message)
          });
          // console.log('after set state');
        }
      }
    });
  },

  startCall: function() {
    var self = this;
    var user = self.state.user;
    var peer = self.state.peer;
    var phone = phone;
    self.initializePhone(user);
    self.phoneUser(user, peer, phone);
  },

  initializePhone: function(user) {
    var user = user || this.state.user;
    var self = this;
    phone = channelStore.phoneInit(user);
  },

  phoneUser: function(user, peer) {
    var self = this;
    var userid = user || this.state.user;
    var peerid = peer || this.state.peer;
    var channel = this.state.channel;

    phone.ready(function() {
      console.log(self.state.peer);
      session = phone.dial(self.state.peer);
      pubnub.publish({
        channel: self.state.channel,        
        message: self.state.user + ' is trying to dial.'
      });
    });

    phone.receive(function(session) {
      session = session ? session : null;
      console.log(session);
      var peervideo = document.getElementById('peervideo');
      var uservideo = document.getElementById('uservideo');
      pubnub.publish({
          channel: self.state.channel,        
          message: self.state.user + ' is receiving a call.'
        });

      session.connected(function(session) {
        // set the peer that you've connected to
        pubnub.publish({
          channel: self.state.channel,        
          message: self.state.user + ' is now connected.'
        });
        peervideo.src = session.video.src;
        peervideo.play();
        uservideo.src = phone.video.src;
        uservideo.play();
      });
      
      session.ended(function(session) {
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