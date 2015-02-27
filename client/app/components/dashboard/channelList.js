/** @jsx React.DOM */

var React = require('react');
var Link = require('react-router').Link;

var channels = ['Jackson-Hoose', '60-Rausch', 'Golden-State-Warriors', 'Korean-BBQ', 'Fremont', 'Kink.com', 'Godzilla'];
var Authentication = require('../../utils/Authentication');

var ChannelList = React.createClass({
  mixins: [Authentication],

  getInitialState: function() {
    return {
      channels: channels
    };
  },

  render: function() {
    var channelList = this.state.channels.length ? this.state.channels.sort().map(function(channel) {
      // return <div><button className="button small">{channel}</button></div>;
      return <li><Link to="channelView" params={{ channelName: channel }} className="button small">{channel.split('-').join(' ')}</Link></li>
    }) : 'No channels available.';
    return (
      <div className="row">
        <div className="large-12 columns">
          <h2 className="channel-header">Channel List</h2>
            <ul className="no-bullet">
              {channelList}
            </ul>
        </div>
      </div>
    );
  }
});

module.exports.ChannelList = ChannelList;
