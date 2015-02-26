/** @jsx React.DOM */
var React = require('react/addons');
var Authentication = require('../../utils/Authentication');
var Link = require('react-router').Link;
var DashboardButtons = React.createClass({

  mixins: [Authentication],

  render: function() {

    return (
      <div className="row">
       	<Link to="/dashboard/pubnub" className="button info expand" id="callRandomUser">Call Random User</Link> 
	    	<Link to="/dashboard/channels" className="button info expand">Search Topics</Link>
      </div>
    );
  }
});

module.exports.DashboardButtons = DashboardButtons;