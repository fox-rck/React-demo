/** @jsx React.DOM */

'use strict'
var React = require('react')
var ContactForm = require('../contact_form/ContactForm')
var SimplePillInput = require('../pill_typeahead/SimplePillInput');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			selectedTab:1
		}
	}
	, changeTab: function(id) {
		this.setState({selectedTab: id});
	}
    , render: function(){
    	var tab = this.state.selectedTab;
        var cont = "";
    	var t1Class = ""
    	, t2Class = ""
    	, t3Class = ""
    	, t4Class = "";
    	switch (tab) {
    		case 1:
    			t1Class = "selected"
                cont = <ContactForm />;
    		break;
    		case 2:
    			t2Class = "selected"
			    cont = <SimplePillInput />;
    		break;
    		case 3:
    			t3Class = "selected"
    		break;
    		case 4:
    			t4Class = "selected"
    		break;
    	}
        return <div>
	        <div className="header">
	        	<img src="logo.jpg"/>
	        </div>
	        <div className="tab-wrapper">
	        	<button className={t1Class} onClick={this.changeTab.bind(this,1)}>Tab 1</button>
	        	<button className={t2Class} onClick={this.changeTab.bind(this,2)}>Tab 2</button>
	        	<button className={t3Class} onClick={this.changeTab.bind(this,3)}>Tab 3</button>
	        	<button className={t4Class} onClick={this.changeTab.bind(this,4)}>Tab 4</button>
	        </div>
	        <div className="container">
            {cont}
            </div>
        </div>
    }
})