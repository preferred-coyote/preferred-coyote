var React = require('react');

var Interests = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.interests.map(function(element) {
        return <li>{element.name}</li>;
      })
    };
  },

  render: function() {
    return (
      <div>
        <h3>Interests</h3>
        <ul className="inline-list">
          {this.state.data}
        </ul>
      </div>
    );
  }
});

module.exports.Interests = Interests;
