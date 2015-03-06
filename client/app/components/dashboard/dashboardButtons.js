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
            <div id="dash-desc">
              Converse.ly brings people together from all over the world by connecting you with others who share the same interests. 
              Want to talk about chocolate? Maybe somebody from Switzerland has a great recommendation for you. 
              Big fan of soccer? Surely a football fan in Spain has something to say about that. 
              Just want somebody to talk to about anything? Call a random user and we&#39;ll hook you up with somebody right away!
            </div>
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