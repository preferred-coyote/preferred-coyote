'use strict';

var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var RouteHandler = Router.RouteHandler;

/* Components */
var App = require('./components/app').App;
var NotFound = require('./components/notFound').NotFound;
var Home = require('./components/home').Home;
var Contact = require('./components/contact').Contact;
var Login = require('./components/auth/login').Login;
var Signup = require('./components/auth/signup').Signup;
var PubNub = require('./components/voice/pubnub').PubNub;
var EditProfile = require('./components/profile/editprofile').EditProfile;
// var pubnub = require('./stores/pubnubStore');

var Dashboard = require('./components/dashboard/dashboard').Dashboard;
var ChannelList = require('./components/dashboard/channelList').ChannelList;
var ChannelView = require('./components/dashboard/channelView').ChannelView;
var CallView = require('./components/dashboard/callView').CallView;
var DashboardButtons = require('./components/dashboard/dashboardButtons').DashboardButtons

var routes = (
  <Route name="conversely" path="/" handler={App}>
    <DefaultRoute name="index" handler={Home} />
    <Route name="contact" path="contact" handler={Contact} />
    <Route name="signup" path="signup" handler={Signup} />
    <Route name="login" path="login" handler={Login} />
    <Route name="logout" path="logout" handler={Login} />
    <Route name="editprofile" path="editprofile" handler={EditProfile} />

    <Route name="dashboard" path="dashboard" handler={Dashboard}>
      <DefaultRoute name="dashboardButtons" handler={DashboardButtons} />
      <Route name="pubnub" path="pubnub" handler={PubNub} />
      <Route name="channelList" path="channels" handler={ChannelList} />
      <Route name="channelView" path="channel/:channelName" handler={ChannelView} />
      <Route name="call" path="call" handler={CallView} />
    </Route>

    <NotFoundRoute name="notfound" handler={NotFound} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, function(Handler, state) {
  var params = state.params;
  React.render(<Handler params={params} />, document.getElementById('react-mount'));
});

module.exports = routes;
