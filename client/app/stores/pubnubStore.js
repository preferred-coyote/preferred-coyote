var Reflux = require('reflux');
var actions = require('../actions/actions');
var userStore = require('./userStore');
// var pubnub = require('pubnub')({
//   publish_key   : 'pub-c-d0f394d5-41a9-47aa-ae8d-5629f6cb46c7',
//   subscribe_key : 'sub-c-2bcfffc6-b3d1-11e4-9a8b-0619f8945a4f'
// });

// var pubnub = PUBNUB.init({
//   channel       : 'preferred-coyote',
//   uuid          : userStore.getUserData().username,
//   publish_key   : 'pub-c-d0f394d5-41a9-47aa-ae8d-5629f6cb46c7',
//   subscribe_key : 'sub-c-2bcfffc6-b3d1-11e4-9a8b-0619f8945a4f'
// });

var randomize = function() {
  var arr = ['a', 'b', 'c', 'd', 'e', 'f'];
  var randomnum = Math.floor(Math.random() * arr.length);
  return arr[randomnum]
}

var random = randomize();

var pubnubStore = Reflux.createStore({
  listenables: actions,

  init: function() {
  },

//get list of users currently available to chat
  getUsersAvailable: function(user, pubnub, userlist) {
    //TODO
    //var username = 
    return new Promise(function(resolve, reject) {
      pubnub.here_now({
        channel: 'preferred-coyote',
        state: true,
        callback: function(list) {
          //this returns all users in channel
          var tempList = {};

          list.uuids.filter(function(uuids) {
            if (uuids.state.available && uuids.uuid !== user)
              return true;
          }).map(function(uuidobj) {
            return uuidobj.uuid;
          }).forEach(function(uuid) {
            tempList[uuid] = 'here';
          });

          userlist = tempList;
          console.log(userlist);
          if (userlist) resolve(userlist);
        }
      });
    });
    
  },

//only returns name of user
  findRandomUser: function(userlist){
    console.log("IN RANDOM USER");
    var total = Object.keys(userlist).length;
    var randomNum = Math.floor(Math.random()*total);
    var randomUser = Object.keys(userlist)[randomNum];
    console.log('USER LIST', userlist);
    return randomUser;
  },

  phoneInit: function() {
    return PHONE({
      number        : userStore.getUserData(),
      publish_key   : 'pub-c-d0f394d5-41a9-47aa-ae8d-5629f6cb46c7',
      subscribe_key : 'sub-c-2bcfffc6-b3d1-11e4-9a8b-0619f8945a4f',
      media : { audio : true, video : true },
      ssl           : false
    });
  },

  pubnubInit: function() {
    console.log("in pubnubinit of pubnubStore");
    return PUBNUB.init({
      channel       : 'preferred-coyote',
      uuid          : userStore.getUserData(),
      publish_key   : 'pub-c-d0f394d5-41a9-47aa-ae8d-5629f6cb46c7',
      subscribe_key : 'sub-c-2bcfffc6-b3d1-11e4-9a8b-0619f8945a4f'
    });
  }

});

module.exports = pubnubStore;