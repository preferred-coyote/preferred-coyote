/** @jsx React.DOM */

var React = require('react/addons');
var Home = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="large-12 columns">
          <article className="home">
            <h1>Home</h1>
          </article>
        </div>
      </div>
    );
  }
});

module.exports.Home = Home;
