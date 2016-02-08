var api = angular.module('postsApiFactory', []);

api.factory('postsApi', ['$http', function( $http ){

  var basePostsUrl = '/api/posts/'

  var postsInterface = {};

  postsInterface.getAllPosts = function(){
    return $http.get( basePostsUrl )
  }

  postsInterface.createPost = function( post ){
    var payload = { post: post }
    return $http.post( basePostsUrl, payload );
  }

  postsInterface.deletePost = function( id ){
    return $http.delete( basePostsUrl + id );
  }


  // postsInterface.createComment = function(id, comment){
  //   var payload = { comment: comment }
  //   console.log(payload);
  //   return $http.post( '/api/posts/' + id + '/comments/', payload );
  // }

  return postsInterface;

}]);
