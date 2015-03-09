var React = require('react');

var Interests = React.createClass({

  render: function() {
    return (
      <div id="interests-section">

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
