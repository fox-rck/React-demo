/** @jsx React.DOM */
'use strict'

var React = require('react')
var App = require('./app_wrap/AppWrap');
var Router = require('react-router'); // or var Router = ReactRouter; in browsers

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;

var routes = (
  <Route name="app" path="/" handler={App}>
  	<Route name="contact" path="/contact" handler={require('./contact_form/ContactForm')}/>
  	<Route name="proscons" path="/pros-cons" handler={require('./test_world/TestWorld')}/>
  	<Route name="pills" path="/pills" handler={require('./test_world/TestWorld')}/>
  	<Route name="test" path="/test" handler={require('./test_world/TestWorld')}/>

    <DefaultRoute handler={require('./contact_form/ContactForm')} />
  </Route>
);

Router.run(routes, function (Handler, state) {
	var params = state.params;
	React.render(<Handler params={params} />, document.getElementById('app'));
});
