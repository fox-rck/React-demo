'use strict'
var React = require('react')
var TestWorld = React.createClass({
    awesomeFn: function(arg1) {
        return "123";
    },
    render: function() {
        return (<div>TEST WORLD</div>);
    }
});
module.exports = TestWorld;