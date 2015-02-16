var React = require('react');

var Info = React.createClass({
  render: function() {
    return (
      <div>
        <h2>{this.props.username}</h2>
        <h2>{this.props.realname}</h2>
        <img src={this.props.avatarimg} alt=""/>
      </div>
    );
  }
});

module.exports.Info = Info;