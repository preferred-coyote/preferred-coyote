var React = require('react');

var Info = React.createClass({
  render: function() {
    return (
      <div>
        <div className="row">
          <div className="medium-6 columns">
            <img src={this.props.avatarimg} alt="PREFERRED COYOTE"/>
          </div>
        </div>
        <div className="row">
          <div className="medium-6 columns">
            <label for="avatar">Upload a new avatar</label>
            <input type="file" name="avatar" id="avatar" />
          </div>
        </div>
      </div>
    );
  }
});

module.exports.Info = Info;
