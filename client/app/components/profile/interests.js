var React = require('react');

var Interests = React.createClass({

  render: function() {
    return (
      <div id="interests-section">
        <h3 id="interests-title">Interests</h3>
        <ul className="inline-list">
          {this.props.interests.map(function(interest) {
            return <li>{interest}</li>;
          })}
        </ul>
      </div>
    );
  }
});

module.exports.Interests = Interests;
