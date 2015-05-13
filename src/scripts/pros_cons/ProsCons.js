'use strict'
var React = require('react')
module.exports = React.createClass({
  // Initialize state
  // Object of pros and cons
  getInitialState: function() {
      return { 
            data: {
                pros: [
                      {title: "Components", description: "React is a library for building composable user interfaces. This means that we can build reusable components that would allow us to share code.", is_opened: false}
                  ,   {title: "Virtual DOM", description: "This is probably why most developers are so attracted to React. React manages its own DOM in memory. The most expensive operation most web apps suffer is mutating the DOM. React's approach is to maintain a virtual representation of the DOM which allows it to calculate differences in the DOM so that it only mutates the part of the DOM that actually needs to be updated. This is a huge benefit!", is_opened: false}
                  ,   {title: "Ease of debugging", description: "There's a reactJS chrome extension that allows you to inspect the DOM to figure out which component is rendering a particular piece of UI.", is_opened: false}
                ]
                , cons: [
                      {title: "The learning curve can be steep", description: "React will slow you down tremendously at the start. Understanding how props, state, and component communication works is not straightforward, and the docs are a maze of information.", is_opened: false}
                  ,   {title: "It's not a full framework", description: "There's no router nor model management libraries built into reactJS -- unlike angular.", is_opened: false}
                ]
            }
        };
    },

    // See more content function
    seeMore: function(set, idx) {
        // Assign pros and cons data to data var
        var data = this.state.data;
        var type = set === 0 ? "pros" : "cons";
        // Check if is_opend is true if not then make it true
        data[type][idx].is_opened = !data[type][idx].is_opened;
        // Set the data state back to update data
        this.setState({ data: data });
    },
    getSection: function(setIdx) {
      var key = Object.keys(this.state.data)[setIdx];
      var set = this.state.data[key];
      return <div>
                <h3>{key}</h3>
                  <ul>
                      {set.map((item ,idx)=>
                        <li>
                          <h4>
                            {item.title}
                            <a onClick={this.seeMore.bind(this, setIdx, idx)}>{ !item.is_opened ? ' see more' : ' see less' }</a>
                          </h4>
                          <span>{item.is_opened ? item.description : ""}</span>
                        </li>
                      )}
                  </ul>
              </div>
    }
    // Render html
    // Loop through data object
    ,render: function() {
      return (
        <div className="pros-cons-wrapper">
          <h2>ReactJS Pros/Cons</h2>
          {[0,1].map((x)=>
            <span>{this.getSection(x)}</span>
          )}
        </div>
      );
    }
});
