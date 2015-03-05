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
          <div className="large-10 columns">
            <video width="250" autoPlay id='uservideostream' ref='uservideostream' poster="https://33.media.tumblr.com/avatar_7c7464817624_128.png" className="medium-4 columns"></video>
            <div className="medium-4 columns">
              <span className="icon-volume-mute medium-1 columns" id="lefticon"></span>
              <span className="icon-volume-mute2 medium-1 columns" id="righticon"></span>
              <ul className="button-group stack" id="callbuttons">
                <li><a href="#" onClick={this.makeCall} className="button"><span className="icon-phone"></span>Call!</a></li>
                <li><a href="#" onClick={this.endCall} className="button"><span className="icon-phone-hang-up"></span>Stop Call</a></li>
              </ul>
            </div>
            <video width="250" autoPlay id='peervideostream' ref='peervideostream' poster="https://avatars3.githubusercontent.com/u/2119948?v=3&s=400" className="medium-4 columns"></video>
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

  sendMessage: function(e) {
    var message = this.refs.message.getDOMNode().value.trim();
    var channel = this.state.channel;
    var user = this.state.user;
    if (e.type === 'keypress' && e.which !== 13) {
      return;
    }
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
          var messageList = document.getElementById('messagearea');
          messageList.scrollTop = messageList.scrollHeight;
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
    self.initializePhone().then(function(phone) {
      // self.phoneUser(user, peer, callUser, callPeer);
      self.pickUp();
      // document.getElementById('callbutton').className.replace(/\bdisabled\b/,'');
    })
  },

  initializePhone: function() {
    var user = this.state.user;
    var callUser = this.state.callUser;
    var self = this;
    return new Promise(function(resolve, reject) {
      channelStore.phoneInit(callUser).then(function(newPhone) {
        phone = newPhone;
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

      session = newSession;

      var peervideo = self.refs.peervideostream.getDOMNode();
      var uservideo = self.refs.uservideostream.getDOMNode();

      pubnub.publish({
        channel: self.state.channel,        
        message: self.state.user + ' is receiving a call.'
      });

      newSession.connected(function(newSession) {
        // set the peer that you've connected to

        pubnub.publish({
          channel: self.state.channel,        
          message: self.state.user + ' is now connected.'
        });
        
        //uservideo.src = phone.video.src;
        peervideo.src = newSession.video.src;

        self.showConnect();

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

    phone.ready(function() {

      var session = phone.dial(callPeer);
      pubnub.publish({
        channel: self.state.channel,        
        message: self.state.user + ' is trying to dial.'
      });
    });

    phone.receive(function(newSession) {

      session = newSession;

      var peervideo = self.refs.peervideostream.getDOMNode();
      var uservideo = self.refs.uservideostream.getDOMNode();

      pubnub.publish({
        channel: self.state.channel,        
        message: self.state.user + ' is receiving a call.'
      });

      newSession.connected(function(newSession) {
        // set the peer that you've connected to

        pubnub.publish({
          channel: self.state.channel,        
          message: self.state.user + ' is now connected.'
        });
        
        // uservideo.src = phone.video.src;
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
  },

  showConnect: function() {
    var lefticon = document.getElementById('lefticon');
    lefticon.className = 'icon-volume-high2 medium-1 columns';
    var righticon = document.getElementById('righticon');
    righticon.className = 'icon-volume-high medium-1 columns';
  }

});

module.exports.CallView = CallView;