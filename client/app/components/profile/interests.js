var React = require('react');

var Interests = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.interests.map(function(element) {
        return (<div>{element.name}</div>);
      })
    };
  },

  render: function() {
    return (
      <div>
        <h3>Interests</h3>
        {this.state.data}
      </div>
    );
  }
});

module.exports.Interests = Interests;