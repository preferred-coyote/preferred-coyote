var React = require('react');

var Pass = React.createClass({
  render: function() {
    return (
      <div>
        <h2>Change Password</h2>
        <form onSubmit={this.updatePassword} className="form" role="form" action="/api/user/profile/password" enctype="multipart/form-data" method="PUT">
          <fieldset className="forms">
            <input type="password" name="oldpassword" placeholder="Confirm old password" ref="oldPassword"/>
            <input type="password" name="newpassword" placeholder="New password" ref="newPassword"/>
            <input type="password" name="newpassword" placeholder="New password" ref="newPasswordConfirmation"/>
          </fieldset>
          <button type="submit" className="button small shadow round expand">Update</button>
        </form>
      </div>
    );
  }
});

module.exports.Pass = Pass;
