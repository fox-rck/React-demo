'use strict'
var React = require('react');

module.exports =

    React.createClass({

    getInitialState: function() {
        return {
            value: ""
            , errorMsg: ""
            , addyVal: ""
            , emailVal: ""
            , commentVal: ""
            , zipcodeVal: ""
        };
    },
    handleChange: function(event) {
        var zipCheck = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
        // Should input fail added class
        // Empty errorMsg array
        var errorMsg = [];
        var nameVal = this.refs.inputboxName.getDOMNode().value;
        var addressVal = this.refs.inputboxAddress.getDOMNode().value;
        var emailsVal = this.refs.inputboxEmail.getDOMNode().value;
        var commentsVal = this.refs.textareaComment.getDOMNode().value;
        var zipsVal = this.refs.inputZip.getDOMNode().value;

        if (nameVal !== "" && nameVal.length < 3 || addressVal !== "" && addressVal.length < 3 || commentsVal !== "" && commentsVal.length < 3 || emailsVal !== "" && emailsVal.length < 3) {
            errorMsg.push({errorMsg: "The entry must be at least 3 chars long."});
        }
        if (zipsVal !== "" && zipsVal.length < 5) {
            errorMsg.push({errorMsg: "Zip Code must be 5 numbers long."});
        }
        if (!zipCheck.test(zipsVal)) {
            errorMsg.push({ errorMsg: "Please enter a valid Zip Code."});
        }

        this.setState({value: nameVal, addyVal: addressVal, emailVal: emailsVal, commentVal: commentsVal, zipcodeVal: zipsVal, errorMsg: errorMsg });

    },
    stateOptions : [
        { value: '', label: 'Select State' }
        , { value: 'AL', label: 'AL' }
        , { value: 'AK', label: 'AK' }
        , { value: 'AS', label: 'AS' }
        , { value: 'AZ', label: 'AZ' }
        , { value: 'AR', label: 'AR' }
        , { value: 'CA', label: 'CA' }
        , { value: 'CO', label: 'CO' }
        , { value: 'CT', label: 'CT' }
        , { value: 'DE', label: 'DE' }
        , { value: 'DC', label: 'DC' }
        , { value: 'FL', label: 'FL' }
        , { value: 'GA', label: 'GA' }
        , { value: 'HI', label: 'HI' }
        , { value: 'ID', label: 'ID' }
        , { value: 'IL', label: 'IL' }
        , { value: 'IA', label: 'IA' }
        , { value: 'KS', label: 'KS' }
        , { value: 'KY', label: 'KY' }
        , { value: 'LA', label: 'LA' }
        , { value: 'ME', label: 'ME' }
        , { value: 'MD', label: 'MD' }
        , { value: 'MA', label: 'MA' }
        , { value: 'MI', label: 'MI' }
        , { value: 'MN', label: 'MN' }
        , { value: 'MS', label: 'MS' }
        , { value: 'MO', label: 'MO' }
        , { value: 'MT', label: 'MT' }
        , { value: 'NE', label: 'NE' }
        , { value: 'NV', label: 'NV' }
        , { value: 'NH', label: 'NH' }
        , { value: 'NJ', label: 'NJ' }
        , { value: 'NM', label: 'NM' }
        , { value: 'NY', label: 'NY' }
        , { value: 'NC', label: 'NC' }
        , { value: 'ND', label: 'ND' }
        , { value: 'OH', label: 'OH' }
        , { value: 'OK', label: 'OK' }
        , { value: 'OR', label: 'OR' }
        , { value: 'PA', label: 'PA' }
        , { value: 'RI', label: 'RI' }
        , { value: 'SC', label: 'SC' }
        , { value: 'SD', label: 'SD' }
        , { value: 'TN', label: 'TN' }
        , { value: 'TX', label: 'TX' }
        , { value: 'UT', label: 'UT' }
        , { value: 'VT', label: 'VT' }
        , { value: 'VA', label: 'VA' }
        , { value: 'WA', label: 'WA' }
        , { value: 'WI', label: 'WI' }
        , { value: 'WV', label: 'WV' }
        , { value: 'WY', label: 'WY' }
    ],
    onSubmit: function(e) {
        e.preventDefault();
        var emailVal = this.state.emailVal;
        var emailRegex = /.+\@.+\..+/;
        // Unsure if I should regex the email address for the input. Validation should work on the input field.
        if (emailRegex.test(emailVal)) {
            console.log('Good email');
        } else {
            console.log('Bad email');

        }
    },
    render: function() {
        var contactFormContainer = "contact-form-container";
        var contactForm = "contact-form";
        var inputClasses = "form-control";
        var selectClasses = "select-box";
        var zipcodeClasses = "zip-code pull-left";
        var inputValidation = " validate-fail";
        var btnClasses ="btn submit";
        var btnDisabledClasses = "hidden";
        var value = this.state.value;
        var addyVal = this.state.addyVal;
        var emailVal = this.state.emailVal;
        var commentVal = this.state.commentVal;
        var zipcodeVal = this.state.zipcodeVal;
        var emailRegex = /.+\@.+\..+/;
        var validationError = this.state.errorMsg.length ?
            <div>
            {this.state.errorMsg.map((err) =>
                <div>{err.errorMsg}</div>
            )}
            </div>
            : "";
        return <div className={contactFormContainer}>
                <h2>React Contact Form</h2>
                <p>This is an example of a React contact form.</p>
                <div className={contactForm}>
                    <form ref="form" onSubmit={this.onSubmit}>
                        <label>Name:</label>
                        <input className={inputClasses} ref="inputboxName" placeholder="Enter your name" value={value} onChange={this.handleChange} />
                        <label>Email:</label>
                        <input className={ emailRegex.test(emailVal) ? inputClasses : inputValidation } ref="inputboxEmail" placeholder="Enter your email" value={emailVal} onChange={this.handleChange} validation={this.props.validation} />
                        <label>Address:</label>
                        <input className={inputClasses} ref="inputboxAddress" placeholder="Enter your address" value={addyVal} onChange={this.handleChange} />
                        <label>State</label>
                        <select className={selectClasses} ref='states' value={this.state.selected} onChange={this.handleChange}>
                            {this.stateOptions.map((opt) =>
                                <option value={opt.value}>{opt.label}</option>
                            )}
                        </select>
                        <label>Zip Code</label>
                        <input className={zipcodeClasses} ref="inputZip" placeholder="Zip Code" value={zipcodeVal} onChange={this.handleChange}/>
                        <textarea rows="5" cols="30" className={inputClasses} ref="textareaComment" placeholder="What do you want to say" value={commentVal} onChange={this.handleChange}></textarea>
                        {validationError}
                        <br/>
                        <br/>
                        <button className={ emailRegex.test(emailVal) && emailVal !== "" && value !== "" && addyVal !== "" && commentVal !== "" && zipcodeVal !== "" ? btnClasses  : btnDisabledClasses} ref="submitBtn" type="submit">Submit</button>
                    </form>
                </div>
        </div>
    }
});
