var React = require('react/addons');
var User = React.createClass({
  render: function() {
    return (
      <article className="user">
        <h1>{this.props.username}</h1>
        {this.props.children}
      </article>
    )
  }
});

module.exports.User = User;
