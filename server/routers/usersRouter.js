// ~~~~~~~~~~MODULES~~~~~~~~~~~~~ //
var express = require('express');
var usersRouter = express.Router();
var User = require('../models/user');

//~~~~~

usersRouter.get('/', function(req, res){
  User.find({}, function(err, databaseUser){
    res.json({users: databaseUser});
  });
});

usersRouter.get('/authenticate', function(req, res){
  User.find({}, function(err, databaseUser){
    res.json({users: databaseUser});
  });
});


usersRouter.post('/', function(req, res){
  var userData = req.body.user;
  var user = new User(userData);
  user.save(function(err, databaseUser){
    res.json({user: databaseUser});
  });
});

usersRouter.post('/authenticate', function(req, res){
  var usernameAttempt = req.body.username;
  var passwordAttempt = req.body.password;
  User.findOne({username: usernameAttempt}, function(err, databaseUser){
    if(databaseUser){
      databaseUser.authenticate(passwordAttempt, function(err, isMatch){
        if(isMatch){
          databaseUser.setToken(err, function(){
            res.json({username: databaseUser.username, token: databaseUser.token});
          });
        }
      });
    } else {
      res.json({description: 'password is incorrect', status: 302});
    }
  });
});

module.exports = usersRouter;

//   // usersRouter.post('/authenticate', function(req, res){
//   //   var usernameAttempt = req.body.username;
//   //   var passwordAttempt = req.body.password;

//   //   User.findOne({ username: usernameAttempt}, function(err, databaseUser){
//   //     databaseUsers.authenticate(passwordAttempt, function(err, databaseUser){
//   //       if(databaseUser){
//   //         databaseUser.createToken(function(){
//   //           res.json({ token: databaseUsers.token });
//   //         });
//   //       } else {
//   //         res.json({ description: no token });
//   //       }
//   //     });
//   //   });
//   // });


// var express     = require('express'),
//     User        = require('../models/user'),
//     usersRouter = express.Router();


  // usersRouter.get('/', function(req, res){
  //   User.find({}, function(err, databaseUser){
  //     res.json({users: databaseUser});
  //   });
  // });

  // usersRouter.get('/authenticate', function(req, res){
  //   User.find({}, function(err, databaseUser){
  //     res.json({users: databaseUser});
  //   });
  // });

//   usersRouter.post('/', function(req, res){
//     var userData = req.body.user;
//     var newuser = new User(userData);
//     newuser.save(function(err, databaseUser){
//       res.json({user: databaseUser});
//     });
//   });

//   // usersRouter.post('/authenticate', function(req, res){
//   //   var usernameAttempt = req.body.username;
//   //   var passwordAttempt = req.body.password;

//   //   User.findOne({ username: usernameAttempt}, function(err, databaseUser){
//   //     databaseUsers.authenticate(passwordAttempt, function(err, databaseUser){
//   //       if(databaseUser){
//   //         databaseUser.createToken(function(){
//   //           res.json({ token: databaseUsers.token });
//   //         });
//   //       } else {
//   //         res.json({ description: no token });
//   //       }
//   //     });
//   //   });
//   // });

//   usersRouter.post('/authenticate', function(req, res){
//     var usernameAttempt = req.body.username;
//     var passwordAttempt = req.body.password;
//     User.findOne({username: usernameAttempt}, function(err, databaseUser){
//       if(databaseUser){
//         databaseUser.authenticate(passwordAttempt, function(err, isMatch){
//           if(isMatch){
//             databaseUser.setToken(err, function(){
//               res.json({username: databaseUser.username, location: databaseUser.location, token: databaseUser.token});
//             });
//           }
//         });
//       } else {
//         res.json({description: 'password is incorrect', status: 302});
//       }
//     });
//   });


// // usersRouter.get('/', function(req, res){
// //   User.find({}, function(err, results){
// //     res.json(results);
// //   });
// // });

// // usersRouter.get('/authenticate', function(req, res){
// //   var username = req.body.username;
// //   var password = req.body.password;
// //   User.findOne({ username: username}, function(err, user){
// //     user.authenticate(password, function(isMatch){
// //       if(isMatch){
// //         user.createToken();
// //         user.save(function(){
// //           res.json({ token: user.token });
// //         });
// //       } else {
// //         res.json({ status: 401 })
// //       }
// //     });
// //   });
// // });

// // usersRouter.post('/', function(req, res){
// //   var user = new User(req.body);
// //   user.save(function(){
// //     res.json(users);
// //   });
// // });

// module.exports = usersRouter;
