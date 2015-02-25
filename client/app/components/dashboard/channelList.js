/** @jsx React.DOM */

var React = require('react/addons');


var ChannelList = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div clasName="large-12 columns">
          <h1>Channel List</h1>
        </div>
      </div>
    );
  }
});

module.exports.ChannelList = ChannelList;