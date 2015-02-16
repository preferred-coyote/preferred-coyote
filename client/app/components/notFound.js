var React = require('react');

var NotFound = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="large-12 columns">
          <h1 className="text-center">Sorry, not found</h1>
        </div>
      </div>
    );
  }
});

module.exports.NotFound = NotFound;
