/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var Link = require('react-router').Link;

var Authentication = require('../../utils/Authentication');
var channelStore = require('../../stores/channelStore');

var pubnub;
var userlist = {};

var ChannelView = React.createClass({

  mixins: [Router.State, Authentication],

  getInitialState: function() {
    var user = JSON.parse(window.localStorage.getItem('user')).username;
    return {
      channel: this.getParams().channelName,
      user: user,
      userlist: [],
      calls: []
    };
  },

  componentDidMount: function() {
    var user = this.state.user;
    var channel = this.state.channel;
    pubnub = channelStore.pubnubInit(channel);
    this.getUsers(user, pubnub, channel);
    this.subscribeToChannel(user, pubnub, channel);
  },

  getUsers: function(user, pubnub, channel) {
    var self = this;
    channelStore.getUsersAvailable(user, pubnub, channel).then(function(templist) {
      templist = Object.keys(templist);
      self.setState({
        userlist: templist
      });
    });
  },

  checkChannel: function(message) {
    var self = this;
    var user = this.state.user;
    var channelInfo = message.split(' ');
    var messagePeer = channelInfo[0];
    var messageUser = channelInfo[1];
    var messageChannel = channelInfo[2];
    if (user === messageUser) {
      self.setState({
        calls: self.state.calls.concat(messagePeer)
      });
    }
  },

  subscribeToChannel: function(user, pubnub, channel) {
    var self = this;
    var user = user || this.state.user;
    pubnub.subscribe({
      channel: [channel, user],
      connect: function() {
        pubnub.publish({
          channel: self.state.channel,        
          message: 'Message posted'
        });
      },
      state: {
        name: user,
        timestamp: new Date()
      },
      presence: function(info) {
        // detects users in channel and sets them in this.state
        self.getUsers(user, pubnub, channel);
      },
      // Heartbeat defines heartbeat frequency to monitor for subscriber timeouts.
      heartbeat: 10,
      callback: function(message, env, channel) {
        self.getUsers(user, pubnub, channel);
        self.checkChannel(message);
      }
    });
  },

  render: function() {
    var self = this;
    var userList = this.state.userlist.length ? this.state.userlist.map(function(peer) {
      var privateChannel = self.state.user + peer;
      return <li><Link to="call" query={{ peer: peer, channel: privateChannel }} className="button small" key={peer.id}>{peer}</Link></li>
    }) : 'No users available.';

    var callsList = this.state.calls.length ? this.state.calls.map(function(peer) {
      var privateChannel = peer + self.state.user;
      return <li><Link to="call" query={{ peer: peer, channel: privateChannel }} className="button small" key={peer.id}>{peer} is Calling!</Link></li>
    }) : null;

    return (
      <div className="row fade-in">
        <div className="large-12 columns">
          <div className="channel-name fade-one">Channel {this.state.channel}</div>
          <ul className="no-bullet">
            {userList}
          </ul>
        </div>
        <div className="large-12 columns">
          <ul className="no-bullet">
            {callsList}
          </ul>
        </div>
      </div>
    );
  }
});

module.exports.ChannelView = ChannelView;
