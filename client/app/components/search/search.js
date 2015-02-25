var React = require('react');
var Reflux = require('reflux');
var userStore = require('../../stores/userStore');
var Navigation = require('react-router').Navigation;

var Channel = React.createClass({

  mixins: [
    Navigation
  ],

  userClick: function(e) {
    console.log("line 13", e);
  },

  render: function() {
    var channelUsers = ["joe", "tim", "andy"].map(function(user){
      return <li><a onClick={this.userClick}>{user}</a></li>;
    }.bind(this));

    return (
      <div className="row">
        <div className="large-12 columns">
          <h1>{this.props.channelName}</h1>
          <ul className="small-block-grid-2 medium-block-grid-3 large-block-grid-4">
            {channelUsers}
          </ul>
        </div>
      </div>
    )
  }
})