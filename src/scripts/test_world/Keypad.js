'use strict'
var React = require('react')

var Readout = React.createClass({
	render: function() {
		return <div className="readout">{this.props.data.join('')}</div>;
	}
});
   
var KeypadKey = React.createClass({
	handleClick: function(event, keyval) {
		this.props.handleClick(event, keyval);
	},
	render: function() {
		return <div className="key" onClick={this.handleClick.bind(this, this.props.keyval)}>{this.props.keyval}</div>;
	}
});

var Keypad = React.createClass({
	getInitialState: function() {
		return {data: []};
	},
	updateState: function(keyval) {
		var newData = this.state.data;
	
		if (keyval === 'DEL') { newData.pop(); }
		else if (keyval === 'CLEAR') { newData = []; }
		else if (newData.length < 10) { newData.push(keyval); }
	
		this.setState({data: newData});
		//console.log('update state with', keyval, this.state.data);
	},
	handleClick: function(keyval, event) {
		this.updateState(keyval);
	},
	render: function() {
		// TODO: yeah, there must be a better way to keep it DRY

		return (
			<div className="x-keypad">
				<Readout data={this.state.data} />
				<KeypadKey keyval={1} handleClick={this.handleClick} />
				<KeypadKey keyval={2} handleClick={this.handleClick} />
				<KeypadKey keyval={3} handleClick={this.handleClick} />
				<KeypadKey keyval={4} handleClick={this.handleClick} />
				<KeypadKey keyval={5} handleClick={this.handleClick} />
				<KeypadKey keyval={6} handleClick={this.handleClick} />
				<KeypadKey keyval={7} handleClick={this.handleClick} />
				<KeypadKey keyval={8} handleClick={this.handleClick} />
				<KeypadKey keyval={9} handleClick={this.handleClick} />
				<KeypadKey keyval={'CLEAR'} handleClick={this.handleClick} />
				<KeypadKey keyval={0} handleClick={this.handleClick} />
				<KeypadKey keyval={'DEL'} handleClick={this.handleClick} />
			</div> );
	}
});

module.exports = Keypad;