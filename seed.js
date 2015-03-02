var models = require('./server/models');
var User = models.User;
var Interest = models.Interest;
var Promise = require('bluebird');

Promise.join(User.create({
  username: 'Jackson',
  password: 'password'
}), User.create({
  username: 'Yan',
  password: 'password'
}), User.create({
  username: 'Ghost',
  password: 'password'
}), User.create({
  username: 'Travis',
  password: 'password'
}), function(jackson, yan, ghost, travis) {

  Promise.join(Interest.create({
    name: 'biking'
  }), Interest.create({
    name: 'hiking'
  }), Interest.create({
    name: 'skateboarding'
  }), Interest.create({
    name: 'travel'
  }), Interest.create({
    name: 'kink.com'
  }), function(biking, hiking, skateboarding, travel, kink) {
    return [
      jackson.setInterests([biking, hiking]),
      yan.setInterests([biking, travel, skateboarding]),
      ghost.setInterests([kink, travel]),
      travis.setInterests([kink, skateboarding, travel, hiking])
    ];
  }).spread(function(jackson, yan, ghost, travis) {
    console.log('success')
  });

});


/*

 */
Promise.join(Interest.findOne({
  where: {
    name: 'sports'
  }
}), Interest.findOne({
  where: {
    name: 'baseball'
  }
}), Interest.findOne({
  where: {
    name: 'skateboarding'
  }
}), Interest.findOne({
  where: {
    name: 'the internet'
  }
}), Interest.findOne({
  where: {
    name: 'travel'
  }
}), function(sports, baseball, skateboarding, internet, travel) {
  User.find({
    where: {
      id: 2
    }
  }).then(function(user) {
    user.setInterests([travel]).then(function(){
      console.log('INTERESTS SET');
    });
    // user.setInterests([sports, baseball, skateboarding]);
  });

  // User.create({
  //   username: 'Jackson'
  // }).then(function(user) {
  //   user.setInterests([sports, baseball, skateboarding, internet, travel]);
  // });
});

// var baseball = ;

// var assplay = Interest.create({
//   name: 'ass play'
// });

// var tacos = Interest.create({
//   name: 'tacos'
// });

// var travel = Interest.create({
//   name: 'travel'
// });

// var hamburgers = Interest.create({
//   name: 'hamburgers'
// });

// var outerspace = Interest.create({
//   name: 'outerspace'
// });

// var butts = Interest.create({
//   name: 'butts'
// });

// var rollercoasters = Interest.create({
//   name: 'rollercoasters'
// });

// var hank = User.create({
//   username: 'Hank'
// });

// var yan = User.create({
//   username: 'Yan'
// }).then(function(user) {
//   user.setInterests([travel, butts, rollercoasters, outerspace, hamburgers]).then(function() {});
// });

// var jackson = User.create({
//   username: 'Jackson'
// }).then(function(user) {
//   user.setInterests([travel, tacos, butts, assplay]).then(function() {});
// });

// var ghost = User.create({
//   username: 'Ghost'
// }).then(function(user) {
//   user.setInterests([outerspace, butts, rollercoasters, travel]).then(function() {});
// });

// var travis = User.create({
//   username: 'Travis'
// }).then(function(user) {
//   user.setInterests([baseball, butts, sports, tacos, travel]).then(function() {});
// });

// newUser.save().then(function(user) {
//   console.log('USER::::::::::::::::::', user);
//   Interest.findOrCreate({
//     where: {
//       name: 'sports'
//     },
//     defaults: {
//       name: 'sports'
//     }
//   }).then(function(sports) {
//     Interest.findOrCreate({
//       where: {
//         name: 'baseball'
//       },
//       defaults: {
//         name: 'baseball'
//       }
//     }).then(function(baseball) {
//       user.setInterests([baseball]).then(function(saved) {
//         console.log(saved);
//       });
//     });
//   });
// });
// // .then(function(user) {

// });


// var baseball = Interest.findOrCreate({
//   where: {
//     name: 'baseball'
//   },
//   defaults: {
//     name: 'baseball'
//   }
// });



// user.setInterests(sports).then(function(interests) {
//   console.log(interests);
// });

// .then(function(user) {
//   var user = user[0].dataValues;

// });
