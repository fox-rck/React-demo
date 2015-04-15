'use strict'
var React = require('react');

console.warn = function() {};

var PillInput = React.createClass({
		getInitialState: function() {
			return {
				caretPosition: 0,
				lastCaretPosition: 0,
				textContent: ''
			};
		},
		handleClick: function(e) {
			e.stopPropagation();
			e.preventDefault();
			e.bubbles = false;
			e.nativeEvent.cancelBubble = true;
			this.props.controller.resetCaretPosition(this);
		},
		handleKeys: function(e) {
			var self = this.getDOMNode(),
				textContent = self.textContent;

			this.setState({
				textContent: self.textContent,
				caretPosition: this.props.controller.getPillInputCaretPosition(this)
			});

			switch (e.key) {
				case 'ArrowLeft':
//					console.log('left');
					if (this.state.lastCaretPosition === 0 && this.state.caretPosition === 0) {
//						console.log('good left', this.state);
						this.props.controller.focusPillInputBefore(this);
					}
					break;
				case 'ArrowRight':
//					console.log('right');
					if (this.state.lastCaretPosition === textContent.length && this.state.caretPosition === textContent.length) {
//						console.log('good right', this.state);
						this.props.controller.focusPillInputAfter(this);
					}
					break;
				case 'Enter':
					e.stopPropagation();
					e.preventDefault();
					e.bubbles = false;
					e.nativeEvent.cancelBubble = true;
					if (textContent.length > 0) {
						this.props.controller.addPillBefore(this, this.makeCallback(this));
					}
					break;
				case 'Backspace':
					if (this.state.lastCaretPosition === 0 && this.state.caretPosition === 0) {
						this.props.controller.removePillBefore(this);
						e.stopPropagation();
						e.preventDefault();
						e.bubbles = false;
						e.nativeEvent.cancelBubble = true;
					}
					break;
				case 'Delete':
					if (this.state.lastCaretPosition === textContent.length && this.state.caretPosition === textContent.length) {
						this.props.controller.removePillAfter(this);
					}
					break;
				default:
					// Do nothing (for now)
					break;
			}

			this.setState({
				textContent: self.textContent,
				lastCaretPosition: this.props.controller.getPillInputCaretPosition(this)
			});
		},
		makeCallback: function(that) {
			return function() {
				that.setState({
					textContent: that.getDOMNode().textContent,
					lastCaretPosition: that.props.controller.getPillInputCaretPosition(that)
				});
			}
		},
		render: function() {
			return <div onKeyUp={this.handleKeys} onClick={this.handleClick} contentEditable>
				{this.state.textContent}
			</div>;
		}
	}),
	PillItem = React.createClass({
		getInitialState: function() {
			return {
				selected: false
			};
		},
		handleClick: function(e) {
			var a = {};
			e.stopPropagation();
			e.preventDefault();
			e.bubbles = false;
			e.nativeEvent.cancelBubble = true;
			Object.keys(e).forEach(function(key) {
				a[key] = e[key];
			});
//			console.log('pill click', a);

			this.getDOMNode().focus();

			if (!e.shiftKey) {
				var that = this;
				this.props.controller.clearPillSelection(function() {
					that.props.controller.selectPills(that);
				});
			} else {
				this.props.controller.selectPills(this);
			}
		},
		handleKeys: function(e) {
			var a = {};
			e.stopPropagation();
			e.preventDefault();
			e.bubbles = false;
			e.nativeEvent.cancelBubble = true;
			Object.keys(e).forEach(function(key) {
				a[key] = e[key];
			});
//			console.log('pill key', a);

			if (e.key === 'Backspace' || e.key === 'Delete') {
				this.props.controller.deleteSelectedPills();
				e.stopPropagation();
				e.preventDefault();
				e.bubbles = false;
				e.nativeEvent.cancelBubble = true;
			}
		},
		render: function() {
			var classNameString = '';
			if (this.state.selected) {
				classNameString = 'pill selected';
			} else {
				classNameString = 'pill';
			}

			if (!!this.props.data) {
				return <button onKeyDown={this.handleKeys} onClick={this.handleClick} className={classNameString}>
					{this.props.data.label}
				</button>;
			} else {
				return null;
			}
		}
	}),
	PillWrapper = React.createClass({
		render: function() {
			return <span className='pill-wrapper'>
				{this.props.children}
			</span>;
		}
	}),
	OutlookInput = React.createClass({
		componentDidMount: function() {
			var that = this;
			document.addEventListener('click', function(e) {
				if (!/^pill/i.test(e.target.className)) {
					that.clearPillSelection();
				}
			});
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
		selectPills: function(reactPillElement, callback) {
			if (!reactPillElement.state.selected) {
				var updatedSelection = this.state.selection.sort(function(a, b) {
						return a - b;
					}),
					newIndex = reactPillElement.props.index,
					lowestIndex = updatedSelection.length > 0 ? Math.min(updatedSelection[0], newIndex) : newIndex,
					highestIndex = updatedSelection.length > 0 ? Math.max(updatedSelection[updatedSelection.length - 1], newIndex) : newIndex;
					updatedSelection = [];

				for (var i = lowestIndex; i <= highestIndex; ++ i) {
					var currentPill = this.getPillItemAt(i);
					updatedSelection.push(i);
					currentPill.setState({selected: true});
				}

				this.setState({
					selection: updatedSelection.sort(function(a, b) {
						return a - b;
					})
				}, function() {
					if (typeof(callback) === 'function') {
						callback();
					}
				});
			}
		},
		clearPillSelection: function(callback) {
			var updatedSelection = this.state.selection;
			updatedSelection.forEach(function(index) {
				this.getPillItemAt(index).setState({selected: false});
			}, this);
			updatedSelection = [];
			this.setState({selection: updatedSelection}, function() {
				if (typeof(callback) === 'function') {
					callback();
				}
			});
		},
		deleteSelectedPills: function(callback) {
			var updatedSelection = this.state.selection,
				totalToDelete = updatedSelection.length,
				minIndex = updatedSelection.length,
				that = this;

			minIndex = updatedSelection[0];

//			this.focusPillInputBefore(this.getPillInputAt(minIndex));

			this.removePillsAt(minIndex, totalToDelete, function() {
				updatedSelection = [];

				that.setState({
					selection: updatedSelection
				}, function() {
					if (typeof(callback) === 'function') {
						var pillInputToFocus = that.getPillInputAt(minIndex);
						that.setPillInputCaretPosition(pillInputToFocus, pillInputToFocus.state.textContent.length);
						callback();
					}
				});

				that.state.pills.forEach(function(pill, index) {
					var reactPillItem = that.getPillItemAt(index);
					console.log(reactPillItem.state);
				}, that);

			});

//			updatedSelection.forEach(function(indexToDelete) {
//				minIndex = Math.min(minIndex, indexToDelete);
//				this.removePillsAt(indexToDelete, function() {
//					var indexToFocus = Math.max(0, minIndex - 1),
//						pillInputToFocus = that.getPillInputAt(indexToFocus);
//					that.setPillInputCaretPosition(pillInputToFocus, pillInputToFocus.state.textContent.length);
//				});
//			}, this);


		},
		getPillItemAt: function(targetIndex) {
			return this.refs['pillItem_' + targetIndex];
		},
		addPill: function() {
			// For use with typeahead selection or drag/drop
			console.log('addPill');
		},
		addPillBefore: function(sourceReactPillInput, callback) {
//			console.log('addPillBefore', sourceReactPillInput);
			var textContent = sourceReactPillInput.state.textContent,
				index = sourceReactPillInput.props.index;

			var that = this;
			this.addPillAt(index, {
				label: textContent
			}, function() {
				that.focusPillInputAfter(sourceReactPillInput);
//				that.setPillInputCaretPosition(sourceReactPillInput, 0);
				sourceReactPillInput.setState({textContent: ''}, function() {
					if (typeof(callback) === 'function') {
						callback();
					}
				});
			});
//			console.log(this.getPillInputAt(index));
		},
		addPillAt: function(targetIndex, value, callback) {
			var updatedPills = this.state.pills,
				updatedInputs = this.state.inputs;
			updatedPills.splice(targetIndex, 0, value);
			updatedInputs.splice(targetIndex, 0, {
				caretPosition: 0,
				lastCaretPosition: 0,
				textContent: ''
			});
			this.setState({
				pills: updatedPills,
				inputs: updatedInputs
			}, function() {
				if (typeof(callback) === 'function') {
					callback();
				}
			});
		},
		removePillBefore: function(reactSourceElement, callback) {
			var currentIndex = reactSourceElement.props.index,
				reactPreviousSibling = this.getPillInputAt(currentIndex - 1),
				mergedTextContent = reactPreviousSibling.state.textContent + reactSourceElement.state.textContent,
				that = this;
			this.removePillsAt(currentIndex - 1, 1, function() {
				that.focusPillInputBefore(reactSourceElement);
				that.getPillInputAt(currentIndex - 1).setState({textContent: mergedTextContent});
				that.getPillInputAt(currentIndex).setState({textContent: ''});
				if (typeof(callback) === 'function') {
					callback();
				}
			});
		},
		removePillAfter: function(reactSourceElement, callback) {
			var currentIndex = reactSourceElement.props.index,
				reactNextSibling = this.getPillInputAt(currentIndex + 1),
				mergedTextContent = reactSourceElement.state.textContent + reactNextSibling.state.textContent,
				that = this;
			this.removePillsAt(reactSourceElement.props.index, 1, function() {
				that.setPillInputCaretPosition(that.getPillInputAt(currentIndex), 0);
				that.getPillInputAt(currentIndex).setState({textContent: mergedTextContent});
				if (typeof(callback) === 'function') {
					callback();
				}
			});
		},
		removePillsAt: function(targetIndex, total, callback) {
			if (targetIndex >= 0 && targetIndex <= this.state.pills.length && targetIndex + total - 1 <= this.state.pills.length) {
				var updatedPills = this.state.pills;
				updatedPills.splice(targetIndex, total);
				this.setState({pills: updatedPills}, function() {
//					console.log('removePillsAt callback');
					if (typeof(callback) === 'function') {
						callback();
					}
				});
			}
		},
		getPillInputAt: function(targetIndex) {
			return this.refs['pillInput_' + targetIndex];
		},
		focusPillInputBefore: function(reactSourceElement) {
			if (reactSourceElement.props.index > 0) {
				var reactPreviousSibling = this.getPillInputAt(reactSourceElement.props.index - 1);
//				console.log(reactPreviousSibling.state);
				this.setPillInputCaretPosition(reactPreviousSibling, reactPreviousSibling.state.textContent.length);
			}
		},
		focusPillInputAfter: function(reactSourceElement) {
			if (reactSourceElement.props.index < this.state.pills.length) {
				var reactNextSibling = this.getPillInputAt(reactSourceElement.props.index + 1);
				this.setPillInputCaretPosition(reactNextSibling, 0);
			}
		},
		getPillInputCaretPosition: function(reactTargetElement) {
			var pillInputDomNode = reactTargetElement.getDOMNode(),
				caretPos = 0,
				sel, range;
			if (window.getSelection) {
				sel = window.getSelection();
				if (sel.rangeCount) {
					range = sel.getRangeAt(0);
					if (range.commonAncestorContainer.parentNode == pillInputDomNode) {
						caretPos = range.endOffset;
					}
				}
			} else if (document.selection && document.selection.createRange) {
				range = document.selection.createRange();
				if (range.parentElement() == pillInputDomNode) {
					var tempEl = document.createElement("span");
					pillInputDomNode.insertBefore(tempEl, pillInputDomNode.firstChild);
					var tempRange = range.duplicate();
					tempRange.moveToElementText(tempEl);
					tempRange.setEndPoint("EndToEnd", range);
					caretPos = tempRange.text.length;
				}
			}
			return caretPos;
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
		putCaretAtEnd: function() {
//			console.log('putCaretAtEnd');
			var reactLastPillInput = this.getPillInputAt(this.state.pills.length);
			this.setPillInputCaretPosition(reactLastPillInput, reactLastPillInput.state.textContent.length);
		},
		resetCaretPosition: function(reactTargetPillInput) {
			reactTargetPillInput.setState({
				caretPosition: this.getPillInputCaretPosition(reactTargetPillInput),
				lastCaretPosition: this.getPillInputCaretPosition(reactTargetPillInput)
			});
		},
		render: function() {
			return <div onClick={this.putCaretAtEnd} className='outlook-input'>
				{this.state.pills.map(function(pillData, index) {
					return <PillWrapper ref={'pillWrapper_' + index} key={'pillWrapper_' + index}>
						<PillInput controller={this}
							ref={'pillInput_' + index}
							key={'pillInput_' + index}
							index={index}
						/>
						<PillItem controller={this}
							data={pillData}
							ref={'pillItem_' + index}
							key={'pillItem_' + index}
							index={index}
						/>
					</PillWrapper>;
				}, this)}
				<PillWrapper ref={'pillWrapper' + this.state.pills.length} key={'pillWrapper' + this.state.pills.length}>
					<PillInput controller={this}
						ref={'pillInput_' + this.state.pills.length}
						key={'pillInput_' + this.state.pills.length}
						index={this.state.pills.length}
					/>
				</PillWrapper>

			</div>;
		}
	});

module.exports = OutlookInput;