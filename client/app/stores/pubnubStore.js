var Reflux = require('reflux');
var actions = require('../actions/actions');
// var pubnub = require('pubnub')({
//   publish_key   : 'pub-c-d0f394d5-41a9-47aa-ae8d-5629f6cb46c7',
//   subscribe_key : 'sub-c-2bcfffc6-b3d1-11e4-9a8b-0619f8945a4f'
// });

var pubnub = PUBNUB.init({                                  
  publish_key   : 'pub-c-d0f394d5-41a9-47aa-ae8d-5629f6cb46c7',
  subscribe_key : 'sub-c-2bcfffc6-b3d1-11e4-9a8b-0619f8945a4f'
});

var phone = PHONE({
  number        : username,
  publish_key   : 'pub-c-d0f394d5-41a9-47aa-ae8d-5629f6cb46c7',
  subscribe_key : 'sub-c-2bcfffc6-b3d1-11e4-9a8b-0619f8945a4f',
  media : { audio : true, video : true },
  ssl           : false
})

// channel variable needed so that channels can be decided
// by interest

// var video = document.querySelector('#uservideo');
// var peervideo = document.querySelector('#peervideo');
// var session;

var pubnubStore = Reflux.createStore({
  listenables: actions,

  init: function() {
  },

  subscribe: function(user) {
    return new Promsie(function(resolve, reject) {
      pubnub.subscribe({
        channel: 'preferred-coyote',
        message: function(message) {
          console.log(JSON.stringify(message));
        },
        state: {
          name: username,
          timestamp: new Date(),
          available: true
        },

        heartbeat: 30,
        connect: function(username) {
          phoneUser(randomholder);
        }
      });
    });
  },

  setUser: function(user) {
    console.log("hello set user!");
  },

  getUsersAvailable: function(user) {

  },

  joinChannel: function(user) {

  },

  phoneUser: function(user) {

  }

  phoneInitial: function() {

    // As soon as the phone is ready we can make calls
    phone.ready(function(){
      var total = Object.keys(userlist).length;
      var randomnum = Math.floor(Math.random()*total);
      var randomUser = Object.keys(userlist)[randomnum];
      if (userlist[randomUser]) {
        console.log('should dial', randomUser);
        session = phone.dial(randomUser);
        inChat(username);
      } else {
        console.log('no other users in channel');
      }
        // document.getElementById('callbutton').disabled = false;
    });

    // When Call Comes In or is to be Connected
    phone.receive(function(session){
      console.log('received');
      console.log('username in receive:', username);
      // Display Your Friend's Live Video
      session.connected(function(session){
        console.log(session);
        peervideo.src = session.video.src;
        peervideo.play();
        video.src = phone.video.src;
        video.play();
        inChat(username);
      });
      session.ended(function(session) {
        console.log('Session ended. Goodbye!');
        avail(username);
      })
    });
  }



  presence: function(m) {
    pubnub.here_now({
      channel: 'preferred-coyote',
      state: true,
      callback: function(list) {
        resolve(list);
      }
    });
  },


  // showHeres: function(userObj, user) {
  //   showUsersHere(userobj, username);
  //   showUsersAvailable(userobj, username);
  // },

  // showUsersHeres: function(userObj, user) {
  //   console.log('username in userobj is: ', username);
  //   var myNode = document.getElementById('herenow');
  //   while (myNode.firstChild) {
  //       myNode.removeChild(myNode.firstChild);
  //   }
  //   var usershere = userobj.uuids.map(function(uuidobj){
  //     return uuidobj.uuid;
  //   }).filter(function(user) {
  //     return user !== username; 
  //   }).forEach(function(element){
  //     var newcontent = document.createElement('div');
  //     newcontent.innerHTML = element;
  //     newcontent.className = 'onlineuser';
  //     document.getElementById('herenow').appendChild(newcontent);
  //   });
  // },

  // herenow: function(userObj, user) {
  //   var myNode = document.getElementById('hereandavailable');
  //   while (myNode.firstChild) {
  //       myNode.removeChild(myNode.firstChild);
  //   }
  //   var templist = {};
  //   var usershere = userobj.uuids.filter(function(uuidobj){
  //     return uuidobj.state.available;
  //     // if (uuidobj.state.available === true) return uuidobj.uuid;
  //   }).map(function(uuidobj){
  //     return uuidobj.uuid;
  //   }).filter(function(user) {
  //     return user !== username; 
  //   }).forEach(function(element){
  //     templist[element] = 'here';
  //     var newcontent = document.createElement('div');
  //     newcontent.innerHTML = element;
  //     newcontent.className = 'onlineavailuser';
  //     document.getElementById('hereandavailable').appendChild(newcontent);
  //   });
  //   userlist = templist;
  // },








  //   var self = this;
  //   user.then(function(user) {
  //     self.user = user;
  //     self.user.loggedIn = true;
  //     self.trigger(self.loggedIn);
  //   }).catch(function(err) {
  //     console.log('error authenticating');
  //   })
  // },

  // here_now: function() {
  //   this.user = {
  //     loggedIn: false
  //   };
  //   this.trigger(this.user);
  // };


  // updateUser: function(user) {
  //   this.user = user;
  //   this.trigger(this.user);
  // },



  // getUserData: function() {
  //   return this.user;
  // }
});

module.exports = pubnubStore;
