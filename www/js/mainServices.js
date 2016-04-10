/**
 * Created by 205 on 3/10/2016.
 */


angular.module('starter')

  .service("universalService", function ($rootScope, $state, notificationService, locationService,$ionicHistory ) {
    var vm = this;


    $rootScope.ref = new Firebase("https://ordernow.firebaseio.com/");

    vm.authData = $rootScope.ref.getAuth();
    authDataCallback(vm.authData);


    vm.authWithFacebook = function () {
      $rootScope.ref.authWithOAuthPopup("facebook", function (error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          vm.authData = authData;

          console.log("Authenticated successfully with payload:", authData);

          vm.currentRef = $rootScope.ref.child("userProfiles").child(authData.uid);

          vm.currentRef.update({
            name: authData.facebook.displayName,
            gender: authData.facebook.cachedUserProfile.gender,
            profileImageURL: authData.facebook.profileImageURL,
            expires: authData.expires,
            uid: authData.uid
          });

          vm.currentRef.on("value", function (snap) {
            data = snap.val();

            if (!data.joined) {
              vm.currentRef.update({
                joined: Firebase.ServerValue.TIMESTAMP
              });
            }
          });


          $state.go("dashboard");
          $rootScope.ref.onAuth(authDataCallback);
        }
      })
    };


    vm.authWithTwitter = function () {
      $rootScope.ref.authWithOAuthPopup("twitter", function (error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          vm.authData = authData;

          console.log("Authenticated successfully with payload:", authData);

          vm.currentRef = $rootScope.ref.child("userProfiles").child(authData.uid);

          vm.currentRef.update({
            name: authData.twitter.displayName,
            //gender: authData.facebook.cachedUserProfile.gender,
            profileImageURL: authData.twitter.profileImageURL,
            expires: authData.expires,
            uid: authData.uid
          });

          vm.currentRef.on("value", function (snap) {
            data = snap.val();

            if (!data.joined) {
              vm.currentRef.update({
                joined: Firebase.ServerValue.TIMESTAMP
              });
            }
          });


          $state.go("dashboard");
          $rootScope.ref.onAuth(authDataCallback);
        }
      })
    };


    vm.authWithGoogle = function () {
      $rootScope.ref.authWithOAuthPopup("google", function (error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          vm.authData = authData;

          console.log("Authenticated successfully with payload:", authData);

          vm.currentRef = $rootScope.ref.child("userProfiles").child(authData.uid);

          vm.currentRef.update({
            name: authData.google.displayName,
            // gender: authData.google.cachedUserProfile.gender,
            profileImageURL: authData.google.profileImageURL,
            expires: authData.expires,
            uid: authData.uid
          });

          vm.currentRef.on("value", function (snap) {
            data = snap.val();

            if (!data.joined) {
              vm.currentRef.update({
                joined: Firebase.ServerValue.TIMESTAMP
              });
            }
          });


          $state.go("dashboard");
          $rootScope.ref.onAuth(authDataCallback);
        }
      })
    };


    function authDataCallback(authData) {
      if (authData) {
        console.log("authChanged: User " + authData.uid + " is logged in with " + authData.provider);

        //make user online

        $rootScope.ref.child("userProfiles").child(authData.uid).child("loggedIn").onDisconnect().update({
          status : null,
          lastActive : Firebase.ServerValue.TIMESTAMP
        });
        $rootScope.ref.child("userProfiles").child(authData.uid).child("loggedIn").update({
          status : true
        });

        //start watching his location
        locationService.startWatchingMyGeoPosition();

        //console.log("current view is:",$ionicHistory.currentView());
        if($ionicHistory.currentView().stateName == "home"){

          $state.go("dashboard");

        }

      } else {
        console.log("User is logged out");
        $state.go("home");
        //notificationService.showAlert("please login again", "its look like your session is expired")
        if($ionicHistory.currentView().stateName != "home"){

          notificationService.showAlert("please login again", "its look like you are not logged in or your session is expired");
          $state.go("home");

        }

      }
    }

    vm.logout = function () {
      $rootScope.ref.offAuth(authDataCallback);
      $rootScope.ref.child("userProfiles").child(vm.authData.uid).child("loggedIn").update({status: null});
      $rootScope.ref.unauth();
      $state.go("home");
      notificationService.showAlert("Thankyou for using :-)", "hope you experienced well");
    }
  });







  //////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////
