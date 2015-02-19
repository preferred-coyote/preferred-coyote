'use strict';

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var RouteHandler = Router.RouteHandler;

/* Components */
var App = require('./components/app').App;
var NotFound = require('./components/notFound').NotFound;
var Home = require('./components/home').Home;
var Login = require('./components/auth/login').Login;
var Signup = require('./components/auth/signup').Signup;
var Profile = require('./components/profile/profile').Profile;

var routes = (
  <Route name="conversely" path="/" handler={App}>
    <DefaultRoute name="index" handler={Home} />
    <Route name="signup" path="signup" handler={Signup} />
    <Route name="profile" path="profile" handler={Profile} />
    <Route name="login" path="login" handler={Login} />
    <Route name="logout" path="logout" handler={Login} />
    <NotFoundRoute name="notfound" handler={NotFound} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, function(Handler, state) {
  var params = state.params;
  React.render(<Handler params={params} />, document.getElementById('react-mount'));
});

module.exports = routes;
