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
    <Route name="proscons" path="/pro-cons" handler={require('./pros_cons/ProsCons')} />
    // <Route name="pills" path="/pills" handler={require('./contact_form/ContactForm')} />
    // <Route name="test" path="/test" handler={require('./pros_cons/ProsCons')} />

    <DefaultRoute handler={require('./contact_form/ContactForm')} />
  </Route>
);

Router.run(routes, function (Handler, state) {
	var params = state.params;
	React.render(<Handler params={params} />, document.getElementById('app'));
});
