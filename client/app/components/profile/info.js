var React = require('react');

var Info = React.createClass({
  render: function() {
    return (
      <div>
        <div className="row">
          <img src={this.props.avatarimg} alt="PREFERRED COYOTE"/>
        </div>
        <div className="row">
          <label for="avatar">Upload a new avatar</label>
          <input type="file" name="avatar" id="avatar" />
        </div>
      </div>
    );
  }
});

module.exports.Info = Info;
