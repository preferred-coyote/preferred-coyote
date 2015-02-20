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
});

var userlist = {};

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

        heartbeat: 300,
        connect: function(username) {
          phoneUser(randomholder);
        }
      });
    });
  },

  setUser: function(user) {
    console.log("hello set user!");
  },

//get list of users currently available to chat
  getUsersAvailable: function() {
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
            if (uuids.state.available && uuids.uuid !== username)
              return true;
          }).map(function(uuidobj) {
            return uuidobj.uuid;
          }).forEach(function(uuid) {
            tempList[uuid] = 'here';
          });

          console.log(tempList);
        }
      });
    });
    
  },

//only returns name of user
  findRandomUser: function(){
    var total = Object.keys(userlist).length;
    var randomNum = Math.floor(Math.random()*total);
    var randomUser = Object.keys(userlist)[randomNum];
    return randomUser;
  },

//set state only AFTER dialing user on phone (to not available)
//equivalent to inChat() in pubnub repo
  setState: function(available, user) {
    pubnub.state({
     channel: "preferred-coyote",
     uuid: user,
     state: {available : available},
     callback: function(m){console.log(JSON.stringify(m))}
    });
    console.log('in chat');
  },

  // for 'I'm feeling lucky' button--start call to rando
  phoneUser: function() {

    // As soon as the phone is ready we can make calls
    phone.ready(function(){
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
        func
        console.log('Session ended. Goodbye!');
        avail(username);
      })
    });
  }


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
  //   var self = this;
  //   user.then(function(user) {
  //     self.user = user;
  //     self.user.loggedIn = true;
  //     self.trigger(self.loggedIn);
  //   }).catch(function(err) {
  //     console.log('error authenticating');
  //   })
  // },

  // updateUser: function(user) {
  //   this.user = user;
  //   this.trigger(this.user);
  // }
});

module.exports = pubnubStore;
