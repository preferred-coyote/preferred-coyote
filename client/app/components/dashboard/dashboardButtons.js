/** @jsx React.DOM */
var React = require('react/addons');
var Authentication = require('../../utils/Authentication');
var Link = require('react-router').Link;
var DashboardButtons = React.createClass({

  mixins: [Authentication],

  render: function() {

    return (
      <div className="row">
        <div className="medium-12 columns">
          <div id="dash-intro">
            <div id="dash-headline">Start chatting!</div>
          </div>
          <br />
        </div>
        <Link to="/dashboard/channels" className="button expand" id="call-user-interest">
          Search for somebody by interest
        </Link>
        <Link to="/dashboard/pubnub" className="button expand">Call a random user</Link> 
      </div>
    );
  }
});

module.exports.DashboardButtons = DashboardButtons;