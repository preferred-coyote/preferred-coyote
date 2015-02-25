/** @jsx React.DOM */
var React = require('react/addons');
var Authentication = require('../../utils/Authentication');

var CallView = React.createClass({

	mixins: [Authentication],
	
  render: function() {
    return (
      <div className="row">
        <div clasName="large-12 columns">
          <h1>You are in a call</h1>
        </div>
      </div>
    );
  }
});

module.exports.CallView = CallView;