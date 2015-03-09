/** @jsx React.DOM */

var React = require('react');
var Link = require('react-router').Link;
var request = require('superagent');
var Promise = require('bluebird');
var Authentication = require('../../utils/Authentication');

var ChannelList = React.createClass({
  mixins: [Authentication],

  getChannels: function() {
    var self = this;
    request
      .get('/api/interest')
      .end(function(response){
        if (response.body.length) {
          console.log(response);
          self.setState({
            channels: response.body
          });
        }
      });
  },

  getInitialState: function() {
    this.getChannels();
    return {
      channels: []
    };
  },

  render: function() {
    var channelList = this.state.channels.length ? this.state.channels.sort().map(function(channel) {
      return <li><Link to="channelView" params={{ channelName: channel.name.split(' ').join('-') }} className="button small channels expand">{channel.name}</Link></li>
    }) : 'No channels available.';

    return (
      <div className="row">
        <div className="medium-12 columns fade-in">
          <div className="channel-header fade-one">Channel List</div>
          <div className="channel-list">
            <ul className="no-bullet css-columns">
              {channelList}
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports.ChannelList = ChannelList;
