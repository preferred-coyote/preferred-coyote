var React = require('react');

var Pass = React.createClass({
  render: function() {
    return (
      <div>
        <form onSubmit={this.updatePassword} className="form" role="form" action="/api/user/profile/password" enctype="multipart/form-data" method="PUT">
          <fieldset className="forms">
            <legend>Change Password</legend>
            <input type="password" name="oldpassword" placeholder="Confirm old password" ref="oldPassword"/>
            <input type="password" name="newpassword" placeholder="New password" ref="newPassword"/>
            <input type="password" name="newpassword" placeholder="New password" ref="newPasswordConfirmation"/>
          </fieldset>
          <button type="submit" className="button small expand">Update</button>
        </form>
      </div>
    );
  }
});

module.exports.Pass = Pass;
