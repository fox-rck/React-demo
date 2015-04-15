'use strict';

var React = require('react'),
	InputField = React.createClass({
		handleKeys: function(e) {
			var domNode = this.getDOMNode();

			if (e.key === 'Enter') {
				e.stopPropagation();
				e.preventDefault();
				e.bubbles = false;
				e.nativeEvent.cancelBubble = true;

				if (domNode.value.length > 0) {
					this.props.controller.addPillWithValue({
						label: domNode.value
					}, function() {
						domNode.value = '';
					});
				}
			}
		},
		render: function() {
			return <input type="text" onKeyUp={this.handleKeys} />;
		}
	}),
	PillItem = React.createClass({
		handleClick: function(e) {
			e.stopPropagation();
			e.preventDefault();
			e.bubbles = false;
			e.nativeEvent.cancelBubble = true;

			this.props.controller.removePillAtIndex(this.props.index);
		},
		render: function() {
			if (!!this.props.data) {
				return <div className="pill">
					<span className="label">{this.props.data.label}</span><a onClick={this.handleClick} href="#" tabIndex="-1"><i>&times;</i></a>
				</div>;
			} else {
				return null;
			}
		}
	}),
	PillInput = React.createClass({
		componentDidMount: function() {
//			var that = this;
//			document.addEventListener('click', function(e) {
//				if (!/^pill/i.test(e.target.className)) {
//
//				}
//			});
		},
		getInitialState: function() {
			return {
				pills: [],
				inputs: [],
				selection: []
			};
				// TODO: add tracking of PillInput textContent to master list to prevent weird persistence issues when reindexing
				// when a PillItem is deleted, its partner PillInput's textContent should be merged with its next sibling
				// TODO: when selecting multiple PillItems, every intervening PillInput should also be selected
//					{
//						label: 'Ross, Jason'
//					},
//					{
//						label: 'Medina, Jose A'
//					},
//					{
//						label: 'Statovci, Diedon (Contractor)'
//					},
//					{
//						label: 'Ross, Jason'
//					},
//					{
//						label: 'Medina, Jose A'
//					},
//					{
//						label: 'Statovci, Diedon (Contractor)'
//					},
//					{
//						label: 'Ross, Jason'
//					},
//					{
//						label: 'Medina, Jose A'
//					},
//					{
//						label: 'Statovci, Diedon (Contractor)'
//					},
//					{
//						label: 'Ross, Jason'
//					},
//					{
//						label: 'Medina, Jose A'
//					},
//					{
//						label: 'Statovci, Diedon (Contractor)'
//					}
//				],
//				selection: []
//			};
		},
		componentDidUpdate: function(oldProps, oldState) {
			console.log(this.state);
//			console.log('updated props: ', oldProps, this.props);
//			console.log('updated state: ', oldState, this.state);
//			console.log(oldState.selection, this.state.selection);
		},
		addPillWithValue: function(value, callback) {
			var updatedPills = this.state.pills;
			updatedPills.push(value);
			this.setState({
				pills: updatedPills
			}, function() {
				if (typeof(callback) === 'function') {
					callback();
				}
			});
		},
		removePillAtIndex: function(targetIndex, callback) {
			if (targetIndex >= 0 && targetIndex <= this.state.pills.length) {
				var updatedPills = this.state.pills;
				updatedPills.splice(targetIndex, 1);
				this.setState({
					pills: updatedPills
				}, function() {
					if (typeof(callback) === 'function') {
						callback();
					}
				});
			}
		},
		setPillInputCaretPosition: function(reactTargetElement, index) {
			var pillInputDomNode = reactTargetElement.getDOMNode();
			if (!pillInputDomNode.childNodes || pillInputDomNode.childNodes.length === 0) {
				pillInputDomNode.focus()
			} else {
				var range = document.createRange(),
					sel = window.getSelection();
				range.setStart(pillInputDomNode.childNodes[0], index);
				range.collapse(true);
				sel.removeAllRanges();
				sel.addRange(range);
				pillInputDomNode.focus();
			}
			this.resetCaretPosition(reactTargetElement);
		},
		focusInput: function() {
			this.refs['input'].getDOMNode().focus();
		},
		resetCaretPosition: function(reactTargetPillInput) {
			reactTargetPillInput.setState({
				caretPosition: this.getPillInputCaretPosition(reactTargetPillInput),
				lastCaretPosition: this.getPillInputCaretPosition(reactTargetPillInput)
			});
		},
		render: function() {
			return <div onClick={this.focusInput} className='pill-input'>
				{this.state.pills.map(function(pillData, index) {
					return <PillItem controller={this}
						data={pillData}
						ref={'pillItem_' + index}
						key={'pillItem_' + index}
						index={index}
					/>;
				}, this)}
				<InputField controller={this} ref="input"/>
			</div>;
		}
	});

module.exports = PillInput;