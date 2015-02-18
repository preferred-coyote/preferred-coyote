var React = require('react');

var Pass = React.createClass({
  render: function() {
    return (
      <div>
        <form className = "form" role = "form" action="/api/user/profile" method="POST">
          <fieldset>
            <legend>Change Password</legend>
              <input type="text" name="oldpassword" placeholder="Confirm old password"></input>
              <input type="text" name="newpassword" placeholder="New password"></input>
              <input type="submit" value="Update Password" className="button small"></input>
          </fieldset>

        </form>
      </div>
    );
  }
});

module.exports.Pass = Pass;