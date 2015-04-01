'use strict'
var React = require('react')
module.exports = React.createClass({
  getInitialState: function() {
        return {
            value: ""
            , errorMsg: ""
            , addyVal: ""

        };
    },
    handleChange: function(event) {
        var nameVal = event.target.value;
        var addressVal = event.target.value;
        nameVal = this.refs.inputboxName.getDOMNode().value;
        addressVal = this.refs.inputboxAddress.getDOMNode().value;
        if (nameVal != "" && nameVal.length < 3 || addressVal != "" && addressVal.length < 3) {
            this.setState({errorMsg: "The entry must be atleast 3 chars. long"});
        } else {
            this.setState({errorMsg: ""});
        }
        this.setState({value: nameVal, addyVal: addressVal});
    },
    render: function() {
        var inputClasses = "form-control";
        var btnClasses ="btn";
        var value = this.state.value;
        var addyVal = this.state.addyVal;
        var validationError = this.state.errorMsg != ""?
            <div>
    {this.state.errorMsg}
            </div>
            : "";
        return <div>
            <form>
                <label>Name:</label>
                <input className={inputClasses} ref="inputboxName" value={value} onChange={this.handleChange} />
                <label>Address:</label>
                <input className={inputClasses} ref="inputboxAddress" value={addyVal} onChange={this.handleChange} />
                {validationError}
                <button className={btnClasses} type="submit">Submit</button>
            </form>
        </div>
    }
});
