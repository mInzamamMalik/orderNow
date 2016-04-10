/**
 * Created by malikasinger on 19/08/2015.
 */
angular.module("starter")

  .controller('foodMenuController', function ($scope, $firebaseArray,notificationService,
                                           universalService, usersService, $stateParams,
                                           $rootScope, $ionicScrollDelegate, $ionicHistory) {


    $scope.restaurantUid = $stateParams.restaurantUid;
    $scope.myUid = usersService.myUid();
    $scope.restaurantRef = $rootScope.ref.child("restaurants").child($scope.restaurantUid);

    $scope.restaurantRef.update({this : "is the point"});


    $scope.restaurantRef.once("value",function(snap){
      $scope.restaurant = snap.val();
      console.log(snap.val());
      $scope.$apply();
    });



    ///////////////////////////////////////////////////////////////
    var myProfileRef = $rootScope.ref.child("userProfiles").child($scope.myUid);
    myProfileRef.once("value", function (snap) {
      $scope.myProfile = snap.val();
      //console.log($scope.myProfile);
      $scope.$apply();
    });
    ///////////////////////////////////////////////////////////////

    console.log("restaurantUid uid:",$scope.restaurantUid);
    console.log("my uid:", $scope.myUid);


  });

