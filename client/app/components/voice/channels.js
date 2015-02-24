var React = require('react');
var channels = ['Jackson Hoose', '60 Rausch', 'Golden State Warriors', 'Korean BBQ', 'Fremont, CA', 'Kink.com', 'Godzilla']

var Channels = React.createClass({

  getInitialState: function() {
    var userlist = this.state.userlist.length ? this.state.userlist.map(function(user) {
      return <li>{user}</li>;
    }) : 'There are no users available.';
  },

  render: function() {
    return (
      <div>
        <form className="form" role="form" action="/api/user/profile" enctype="multipart/form-data" method="PUT">
          <label for="avatar">Upload a new avatar</label>
          <input type="file" name="avatar" id="avatar" />
          <label for="profile">Update profile</label>
          <textarea name="profile" id="profile"></textarea>
          <fieldset>
              <legend>Change Password</legend>
              <input type="password" name="oldpassword" placeholder="Confirm old password" />
              <input type="password" name="newpassword" placeholder="New password" />
          </fieldset>
          <button type="submit" className="button small">Update</button>
        </form>
      </div>
    );
  }
});

module.exports.Pass = Pass;
