var Reflux = require('reflux');
var actions = require('../actions/actions');
var userStore = require('./userStore');

var channelStore = Reflux.createStore({
  listenables: actions,

  init: function() {
  },

//get list of users currently available to chat
  getUsersAvailable: function(user, pubnub, channel) {
    console.log('channel is: ', channel);
    return new Promise(function(resolve, reject) {
      pubnub.here_now({
        //TODO: Change channel grab interest as name
        channel: channel,
        state: true,
        callback: function(list) {
          //this returns all users in channel
          console.log('list is:', list);
          var tempList = {};
          list.uuids
          // .filter(function(uuids) {
          //   if (uuids.state.available && uuids.uuid !== user)
          //     return true;
          // })
          .map(function(uuidobj) {
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

//only returns name of user
  findRandomUser: function(userlist){
    var total = Object.keys(userlist).length;
    var randomNum = Math.floor(Math.random());
    var randomUser = Object.keys(userlist)[randomNum];
    return randomUser;
  },

  phoneInit: function() {
    var user = JSON.parse(localStorage.getItem('user'));

    return PHONE({
      number        : user.username,
      publish_key   : 'pub-c-d0f394d5-41a9-47aa-ae8d-5629f6cb46c7',
      subscribe_key : 'sub-c-2bcfffc6-b3d1-11e4-9a8b-0619f8945a4f',
      media : { audio : true, video : true },
      ssl           : false
    });
  },

  pubnubInit: function(channel) {
    var user = JSON.parse(localStorage.getItem('user'));
    console.log('in pubnubinit useris', user);
    console.log('in pubnubinit channelis', channel);
    return PUBNUB.init({
      // channel       : channel,
      uuid          : user.username,
      publish_key   : 'pub-c-d0f394d5-41a9-47aa-ae8d-5629f6cb46c7',
      subscribe_key : 'sub-c-2bcfffc6-b3d1-11e4-9a8b-0619f8945a4f'
    });
  }

});

module.exports = channelStore;
