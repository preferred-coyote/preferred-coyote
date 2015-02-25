/** @jsx React.DOM */

var React = require('react');
var Link = require('react-router').Link;

var channels = ['Jackson-Hoose', '60-Rausch', 'Golden-State-Warriors', 'Korean-BBQ', 'Fremont', 'Kink.com', 'Godzilla'];

var ChannelList = React.createClass({

  getInitialState: function() {
    // console.log('channels: ', channels);
    return {
      channels: channels
    }
  },

  render: function() {
    var channelList = this.state.channels.length ? this.state.channels.map(function(channel) {
      // return <div><button className="button small">{channel}</button></div>;
      return <li><Link to="channelView" params={{ channelName: channel }} className="button small">{channel}</Link></li>
    }) : 'No channels available.';
    return (
      <div className="row">
        <div className="large-12 columns">
          <h1>Channel List</h1>
            <ul className="no-bullet">
              {channelList}
            </ul>
        </div>
      </div>
    );
  }
});

module.exports.ChannelList = ChannelList;