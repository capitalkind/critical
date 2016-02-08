var control = angular.module('appControllers', []);

control.controller('appController', ['$scope', '$http', '$cookies', 'usersApi', 'postsApi', function($scope, $http, $cookies, usersApi, postsApi){

  $scope.posts = [];

  $scope.comments = [];

  $scope.users = [];

  $scope.user = {
    username: null,
    password: null,
    token: null
  }
  $scope.mainComment = '';

  $scope.createUser = function(user){
    usersApi.createUser(user).then(function(response){
      $scope.logInUser(user.username, user.password);
    });
  }

  $scope.logInUser = function(username, password ){
    usersApi.authenticate(username, password).then(function(response){
      if(response.data.token){
        $scope.getCookie(response);
        $scope.getUser(response);
      } else {
        $scope.username = ''; $scope.password = '';
      }
    });
  }

  $scope.getCookie = function(response){
    $cookies.put('user', response.config.data.username);
    $cookies.put('token', response.data.token);
  }

  $scope.getUser = function(response){
    $scope.currentUser = response.config.data.username;
    $scope.loggedIn = true;
    $scope.username = '';
    $scope.password = '';
  }

  $scope.logOutUser = function(){
    $cookies.remove('token');
    $cookies.remove('user');
    $scope.currentUser = '';
    $scope.loggedIn = false;
  }

  $scope.createPost = function(post){
    post.username = $cookies.get('user');
    postsApi.createPost(post).then(function(response){
      $scope.posts.push(response.data)
      $scope.post = {};
    });
  }

  $scope.getAllPosts = function(){
    postsApi.getAllPosts().then(function(response){
      $scope.posts = response.data.posts;
    });
  }

  $scope.deletePost = function(id){
    postsApi.deletePost(id).then(function(response){
      $scope.getAllPosts();
    });
  }

  $scope.createComment = function(id, post){
    post.comment.username = $cookies.get('user');
    postsApi.createComment(id, comment).then(function(response){
      $scope.posts.comments.push(response.data)
      $scope.post = {};
    })
  }

  // $scope.createComment = function(id, commentBody){
  //   $http({
  //     url: '/api/posts/' + id + '/comments',
  //     method: 'post',
  //     data: {comments: commentBody},
  //     success: function(data){
  //       var comment = data.comments;
  //     }
  //   });
  // }

  $scope.isToken = function(){
    var token = $cookies.get('token');
    if(token){
      $scope.loggedIn = true;
      if($cookies.get('user')){
        $scope.currentUser = $cookies.get('user')
      }
    } else {
      $scope.loggedIn = false;
    }
  }

  // $scope.rightToken = function(username){
  //   var user = $cookies.get('user');
  //   var userToken = post.data.username;
  //   if(user === userToken){
  //     $scope.hasToken = true;
  //   } else {
  //     $scope.hasToken = false;
  //   }
  // }

  var readyToGo = function () {
   $scope.getAllPosts();
   $scope.isToken();
   // $scope.rightToken();
  };

  readyToGo();

}]);
