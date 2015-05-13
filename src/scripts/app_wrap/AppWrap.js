/** @jsx React.DOM */

'use strict'
var React = require('react');
var Router = require('react-router'); // or var Router = ReactRouter; in browsers
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

module.exports = React.createClass({
	getInitialState: function() {
		return {
			selectedTab : 1
		}
	}
	, changeTab: function(id) {
		this.setState({selectedTab: id});
	}
    , render: function(){
        return <div>
	        <div className="header">
	        	<img src="logo.jpg"/>
	        </div>
	        <div className="tab-wrapper">
                <Link className="btn" to="contact" >Contact</Link>
                <Link className="btn" to="proscons" >Pros and Cons</Link>
                <Link className="btn" to="pills" >Pills</Link>
                <Link className="btn" to="test" >Tests</Link>
                <div className="clear" />
	        </div>
	        <div className="container">
               <RouteHandler {...this.props} />
            </div>
        </div>
    }
})