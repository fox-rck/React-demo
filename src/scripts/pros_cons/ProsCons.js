'use strict'
var React = require('react')
module.exports = React.createClass({
  // Initialize state
  // Object of pros and cons
  getInitialState: function() {
      return { 
            data: {
                pros: [
                      {title: "React isn't an MVC framework", description: "React is a library for building composable user interfaces. It encourages the creation of reusable UI components which present data that changes over time.", is_opened: false}
                  ,   {title: "React doesn't use templates", description: "React approaches building user interfaces differently by breaking them into components.", is_opened: false}
                  ,   {title: "Reactive updates are dead simple", description: "When your component is first initialized, the render method is called, generating a lightweight representation of your view.", is_opened: false}
                  ,   {title: "High performance rendering", description: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', is_opened: false}
                  ,   {title: "High performance rendering", description: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', is_opened: false}
                ]
                , cons: [
                      {title: "The learning curve can be steep", description: "React will slow you down tremendously at the start. Understanding how props, state, and component communication works is not straightforward, and the docs are a maze of information.", is_opened: false}
                  ,   {title: "Browser Support", description: "React does not support any browser below IE8, and never will", is_opened: false}
                  ,   {title: "ABC ISSUES", description: 'Some issues', is_opened: false}
                  ,   {title: "ABC ISSUES", description: 'Some issues', is_opened: false}
                  ,   {title: "ABC ISSUES", description: 'Some issues', is_opened: false}
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

    // Render html
    // Loop through data object
    render: function() {
      return (
        <div class="pros-cons-wrapper">
          <h3>Pros</h3>
          <ul>
              {this.state.data.pros.map((item ,idx)=>
                <li>
                  <h3>
                    {item.title}
                    <a onClick={this.seeMore.bind(this, 0, idx)}>{ !item.is_opened ? ' see more' : ' see less' }</a>
                  </h3>
                  <span>{item.is_opened ? item.description : ""}</span>
                </li>
              )}
          </ul>
          <hr/>
          <h3>Cons</h3>
          <ul>
              {this.state.data.cons.map((item ,idx)=>
                <li>
                  <h3>
                    {item.title}
                    <a onClick={this.seeMore.bind(this, 1, idx)}>{ !item.is_opened ? ' see more' : ' see less' }</a>
                  </h3>
                  <span>{item.is_opened ? item.description : ""}</span>
                </li>
              )}
          </ul>
        </div>
      );
    }
});
