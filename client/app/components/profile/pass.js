var React = require('react');
var Actions = require('../../actions/actions');

var Pass = React.createClass({

  updatePassword: function(e){
    e.preventDefault();
    Actions.updatePassword({
      oldPassword: this.refs.oldPassword.getDOMNode().value.trim(),
      newPassword: this.refs.newPassword.getDOMNode().value.trim(),
      newPasswordConfirmation: this.refs.newPasswordConfirmation.getDOMNode().value.trim()
    });

  },

  render: function() {
    return (
      <div>
        <h2>Change Password</h2>
        <form onSubmit={this.updatePassword} className="form" role="form" action="/api/user/profile/password" enctype="multipart/form-data" method="PUT">
          <fieldset>
              <input type="password" name="oldpassword" placeholder="Confirm old password" ref="oldPassword"/>
              <input type="password" name="newpassword" placeholder="New password" ref="newPassword"/>
              <input type="password" name="newpassword" placeholder="New password" ref="newPasswordConfirmation"/>
          </fieldset>
          <button type="submit" className="button small">Update</button>
        </form>
      </div>
    );
  }
});

module.exports.Pass = Pass;
