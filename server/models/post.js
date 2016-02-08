var mongoose = require('mongoose');

// var CommentSchema = mongoose.Schema({
//   bodyText: { type: String },
//   username: { type: String }
// }, {timestamps:true});


var PostSchema = mongoose.Schema({
  username: { type: String, required: true },
  title: { type: String },
  bodyText: { type: String },
  url: { type: String, required: true}
  // comments: [CommentSchema]
}, { timestamps:true });


module.exports = mongoose.model('Post', PostSchema);
