var express     = require('express'),
    Post        = require('../models/post');
    postsRouter = express.Router();

postsRouter.post('/', function (req, res) {
  var postData = req.body.post;
  var newPost = new Post(postData)
  newPost.save(function (err, databasePosts) {
    res.json( databasePosts );
  })
})

postsRouter.get('/', function (req, res) {
  databasePosts = Post.all;
  Post.find({}, function(err, databasePosts){
      res.json( {posts: databasePosts} );
    });
})

postsRouter.delete('/:id', function(req, res) {
  Post.findByIdAndRemove(req.params.id, function(err){
    if (err) {res.status(500).end(); }
    res.status(204).end();
  });
});

postsRouter.get('/:id/comments', function(req, res, next){
  Post.findById(req.params.id, function(err, databasePosts){
    if(err) {};
    res.json(databasePosts);
  });
});



postsRouter.post('/:id/comments', function(req, res){
  var commentData = req.body.comment;
  var newComment = new Post(commentData)
  newComment.save(function(err, databasePosts){
    res.json( databasePosts );
  });
});


// postsRouter.post('/:id/comments', function(req, res){
//   var commentBody = req.body.comment;
//   commentBody.username = req.user.username;
//   var id = req.params.id;
//   Post.findById(id, function(err, databasePosts){
//     var commentNumber = databasePosts.comments.push(commentBody);
//     databasePosts.save(function(err){
//       res.json({comment: databasePosts.comments[commentNumber-1]});
//     });
//   });
// });

module.exports = postsRouter;

