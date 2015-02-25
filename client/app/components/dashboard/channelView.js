/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');

var Authentication = require('../../utils/Authentication');
var channelStore = require('../../stores/channelStore');

var pubnub;
var userlist = {};

var ChannelView = React.createClass({

  mixins: [Router.State, Authentication],

  getInitialState: function() {
    var user = JSON.parse(window.localStorage.getItem('user'));
    return {
      channel: this.getParams().channelName,
      user: user,
      userlist: []
    };
  },

  componentDidMount: function() {
    var user = this.state.user;
    var channel = this.state.channel;
    pubnub = channelStore.pubnubInit(channel);
    this.getUsers(user, pubnub, channel);
    this.subscribeToChannel(user, pubnub, channel)
  },

  getUsers: function(user, pubnub, channel) {
    var self = this;
    channelStore.getUsersAvailable(user, pubnub, channel).then(function(templist){
      templist = Object.keys(templist);
      console.log('getUsers templist is: ', templist);
      self.setState({
        userlist: templist
      })
    });
  },

  subscribeToChannel: function(user, pubnub, channel) {
    var self = this;
    var user = this.state.user;

    pubnub.subscribe({
      channel: channel,
      message: function(message) {
        console.log(JSON.stringify(message));
      },

      connect: function() {
        pubnub.publish({
          channel: 'preferred-coyote',
          message: 'Message posted'
        });
      },

      state: {
        name: user,
        timestamp: new Date(),
        available: true
      },

      presence: function(info) {
        // detects users in channel and sets them in this.state
        self.getUsers(user, pubnub, channel);
      },

      // Heartbeat defines heartbeat frequency to monitor for subscriber timeouts.
      heartbeat: 10,

      callback: function(msg) {
        self.getUsers(user, pubnub, channel);
      }
    });
  },

  render: function() {
    var userList = this.state.userlist.length ? this.state.userlist.map(function(user) {
      // return <div><button className="button small">{channel}</button></div>;
      return <li><button className="button small">{user}</button></li>
    }) : 'No users available.';
    return (
      <div className="row">
        <div className="large-12 columns">
          <h1>Channel {this.getParams().channelName}</h1>
          <ul className="no-bullet">
            {userList}
          </ul>
        </div>
      </div>
    );
  }
});

module.exports.ChannelView = ChannelView;
