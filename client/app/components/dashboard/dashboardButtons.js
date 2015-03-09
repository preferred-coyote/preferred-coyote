/** @jsx React.DOM */
var React = require('react/addons');
var Authentication = require('../../utils/Authentication');
var Link = require('react-router').Link;
var DashboardButtons = React.createClass({

  mixins: [Authentication],

  componentDidMount: function() {
  },

  render: function() {

    return (
      <div className="row fade-in">
        <div className="dashboardButtons">
          <div className="medium-12 columns">
            <div id="dash-intro">
              <div id="dash-headline" className="fade-one">Start chatting!</div>
            </div>
          </div>
          <div className="medium-6 columns">
            <Link to="/dashboard/channels" className="button expand" id="call-user-interest">
              Search for somebody by interest
            </Link>
          </div>
          <div className="medium-6 columns">
            <Link to="/dashboard/pubnub" className="button expand medium-6 columns">Call a random user</Link> 
          </div>
        </div>
      </div>
    );
  }
});

module.exports.DashboardButtons = DashboardButtons;