/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');

var ChannelView = React.createClass({

  mixins: [Router.State],

  getInitialState: function(){
    console.log(this.getParams());
    return {};
  },

  render: function() {
    return (
      <div className="row">
        <div clasName="large-12 columns">
          <h1>Channel View {this.getParams().channelName}</h1>
        </div>
      </div>
    );
  }
});

module.exports.ChannelView = ChannelView;