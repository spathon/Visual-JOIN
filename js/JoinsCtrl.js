var joinApp = angular.module('joinApp', ['ngSanitize']);



function JoinsCtrl($scope) {


  $scope.users = [
    { id: 1, name: 'Patrik' },
    { id: 2, name: 'Albert' },
    { id: 3, name: 'Maria' },
    { id: 4, name: 'Darwin' },
    { id: 5, name: 'Elizabeth' }
  ];

  $scope.likes = [
    { user_id: 3, name: 'Stars' },
    { user_id: 1, name: 'Climbing' },
    { user_id: 1, name: 'Code' },
    { user_id: 6, name: 'Rugby' },
    { user_id: 4, name: 'Apples' }
  ];

  $scope.sql = {
    inner: "SELECT users.name AS name, likes.name AS 'like' FROM users JOIN likes ON users.id = likes.user_id;",
    left: "SELECT users.name AS name, likes.name AS 'like' FROM users LEFT JOIN likes ON users.id = likes.user_id;",
    right: "SELECT users.name AS name, likes.name AS 'like' FROM users RIGHT JOIN likes ON users.id = likes.user_id;",
    outer:
      "SELECT users.name AS 'name', likes.name AS 'like' FROM users LEFT OUTER JOIN likes ON users.id = likes.user_id"+
      "<br>UNION"+
      "<br>SELECT users.name AS 'name', likes.name AS 'like' FROM users RIGHT OUTER JOIN likes ON users.id = likes.user_id"
  }

  $scope.joins = [];
  $scope.user_ids = [];
  $scope.current_join = 'inner';
  $scope.type = false;

  $scope.isNotSelected = function(id){
    if($scope.user_ids.indexOf(id) === -1){
      return 'is-not-selected';
    }
  }

  $scope.currentJoinClass = function(join){
    if($scope.current_join == join){
      return 'current-join';
    }
  }


  $scope.selectJoin = function(join){
    $scope.current_join = join;
    $scope[join +'Join']();
  };

  $scope.removeItem = function(type, index){
    $scope[type].splice(index, 1);
    $scope.selectJoin($scope.current_join);
  };

  $scope.addItem = function(){

    // add the item to the array
    var newItem = { name: $scope.addName };
    newItem[($scope.type == 'users') ? 'id' : 'user_id'] = $scope.addId;
    $scope[$scope.type].push( newItem );

    // Clear the data
    $scope.addName = '';
    $scope.addId = '';

    // recreate the join table
    $scope.selectJoin($scope.current_join);

    // Close the modal
    $scope.moduleType = false;
  };


  // SELECT users.name AS name, likes.name AS 'like' FROM users JOIN likes ON users.id = likes.user_id;
  $scope.innerJoin = function(){

    var result = [];
    $scope.user_ids = [];

    // Loop through all likes and users to find matches
    angular.forEach($scope.likes, function(like){ // value, key
      angular.forEach($scope.users, function(user){
        if(user.id == like.user_id){
          result.push({ name: user.name, like: like.name });
          $scope.user_ids.push(user.id);
        }
      });
    });
    $scope.joins = result;
  };

  // Default
  $scope.innerJoin();


  // SELECT users.name AS name, likes.name AS 'like' FROM users LEFT JOIN likes ON users.id = likes.user_id;
  $scope.leftJoin = function(){

    var result = [];
    $scope.user_ids = [];

    // Loop through all likes and users to find matches
    angular.forEach($scope.users, function(user){ // value, key
      var hasLike = false;
      $scope.user_ids.push(user.id);
      angular.forEach($scope.likes, function(like){
        if(user.id == like.user_id){
          result.push({ name: user.name, like: like.name });
          hasLike = true;
        }
      });
      if(!hasLike){
        result.push({ name: user.name, like: 'NULL' });
      }
    });
    $scope.joins = result;
  };


  // SELECT users.name AS name, likes.name AS 'like' FROM users RIGHT JOIN likes ON users.id = likes.user_id;
  $scope.rightJoin = function(){

    var result = [];
    $scope.user_ids = [];

    // Loop through all likes and users to find matches
    angular.forEach($scope.likes, function(like){ // value, key
      var hasLike = false;
      $scope.user_ids.push(like.user_id);
      angular.forEach($scope.users, function(user){
        if(user.id == like.user_id){
          result.push({ name: user.name, like: like.name });
          hasLike = true;
        }
      });
      if(!hasLike){
        result.push({ name: 'NULL', like: like.name });
      }
    });
    $scope.joins = result;
  };


  // SELECT users.name AS 'name', likes.name AS 'like' FROM users LEFT OUTER JOIN likes ON users.id = likes.user_id
  // UNION
  // SELECT users.name AS 'name', likes.name AS 'like' FROM users RIGHT OUTER JOIN likes ON users.id = likes.user_id
  $scope.outerJoin = function(){

    var result = [];
    $scope.user_ids = [];

    // Loop through all likes and users to find matches
    angular.forEach($scope.users, function(user){ // value, key
      var hasLike = false;
      $scope.user_ids.push(user.id);
      angular.forEach($scope.likes, function(like){
        if(user.id == like.user_id){
          result.push({ name: user.name, like: like.name });
          hasLike = true;
        }
      });
      if(!hasLike){
        result.push({ name: user.name, like: 'NULL' });
      }
    });

    // Loop through all likes and users to find matches
    angular.forEach($scope.likes, function(like){ // value, key
      if($scope.user_ids.indexOf(like.user_id) === -1){
        result.push({ name: 'NULL', like: like.name });
        $scope.user_ids.push(like.user_id);
      }
    });

    $scope.joins = result;
  };

}
