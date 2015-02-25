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
var Login = require('./components/auth/login').Login;
var Signup = require('./components/auth/signup').Signup;
var Profile = require('./components/profile/profile').Profile;
var PubNub = require('./components/voice/pubnub').PubNub;
// var pubnub = require('./stores/pubnubStore');

var Dashboard = require('./components/dashboard/dashboard').Dashboard;
var ChannelList = require('./components/dashboard/channelList').ChannelList;
var ChannelView = require('./components/dashboard/channelView').ChannelView;
var CallView = require('./components/dashboard/callView').CallView;

var routes = (
  <Route name="conversely" path="/" handler={App}>
    <Route name="signup" path="signup" handler={Signup} />
    <Route name="profile" path="profile" handler={Profile} />
    <Route name="login" path="login" handler={Login} />
    <Route name="logout" path="logout" handler={Login} />
    <Route name="pubnub" path="pubnub" handler={PubNub} />

    <Route name="dashboard" path="dashboard" handler={Dashboard}>
      <Route name="channelList" path="channels" handler={ChannelList} />
      <Route name="channelView" path="channel/:channelName" handler={ChannelView} />
      <Route name="call" path="call" handler={CallView} />
    </Route>

    <NotFoundRoute name="notfound" handler={NotFound} />
    <DefaultRoute name="index" handler={Home} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, function(Handler, state) {
  var params = state.params;
  React.render(<Handler params={params} />, document.getElementById('react-mount'));
});

module.exports = routes;
