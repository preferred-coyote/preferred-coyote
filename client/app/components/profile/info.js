var React = require('react');

var Info = React.createClass({
  render: function() {
    return (
      <div>
        <h2>{this.props.username}</h2>
        <h2>{this.props.realname}</h2>
        <img src={this.props.avatarimg} alt="PREFERRED COYOTE"/>
        <div style={{margin: '3px 0px 0px 0px'}}>
          <a href="#" className="button tiny">Change Avatar</a>
        </div>
      </div>
    );
  }
});

module.exports.Info = Info;