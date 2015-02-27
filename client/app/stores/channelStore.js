var Reflux = require('reflux');
var actions = require('../actions/actions');
var userStore = require('./userStore');

var channelStore = Reflux.createStore({
  listenables: actions,

//get list of users currently available to chat
  getUsersAvailable: function(user, pubnub, channel) {
    return new Promise(function(resolve, reject) {
      pubnub.here_now({
        channel: channel,
        state: true,
        callback: function(list) {
          //this returns all users in channel
          var tempList = {};
          list.uuids.filter(function(uuids) {
            // filter out ids that arent the current user
            if (uuids.uuid !== user)
              return true;
          }).map(function(uuidobj) {
            return uuidobj.uuid;
          }).forEach(function(uuid) {
            tempList[uuid] = 'here';
          });

          if (tempList) resolve(tempList);
          else reject(null);
        }
      });
    });
  },

  phoneInit: function(user) {
    var user = user || JSON.parse(localStorage.getItem('user')).username;
    console.log('user is: ', user);
    return PHONE({
      number        : user,
      publish_key   : 'pub-c-d0f394d5-41a9-47aa-ae8d-5629f6cb46c7',
      subscribe_key : 'sub-c-2bcfffc6-b3d1-11e4-9a8b-0619f8945a4f',
      media : { audio : true, video : true },
      ssl           : false
    });
  },

  pubnubInit: function(channel) {
    var user = JSON.parse(localStorage.getItem('user'));
    return PUBNUB.init({
      uuid          : user.username,
      publish_key   : 'pub-c-d0f394d5-41a9-47aa-ae8d-5629f6cb46c7',
      subscribe_key : 'sub-c-2bcfffc6-b3d1-11e4-9a8b-0619f8945a4f'
    });
  }

});

module.exports = channelStore;
