// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','firebase'])

  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state("home", {
        url: "/home",
        templateUrl: "views/home/home.html",
        controller: "homeController"
      })
      .state("dashboard", {
        url: "/dashboard",
        templateUrl: "views/dashboard/dashboard.html",
        controller: "dashboardController"
      })
      .state("foodMenu", {
        url: "/foodMenu:restaurantUid",
        templateUrl: "views/foodMenu/foodMenu.html",
        controller: "foodMenuController"
      })
      .state("inbox", {
        url: "/inbox:recipientUid",
        templateUrl: "views/inbox/inbox.html",
        controller: "inboxController"
      })
      .state("chatDetail", {
        url: "/chatDetail",
        templateUrl: "views/chatDetail/chatDetail.html",
        controller: "chatDetailController"
      });

    $urlRouterProvider.otherwise("/home");

  })





  .controller("appController", function ($rootScope,$ionicScrollDelegate) {



    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

      if(toState.name == "dashboard"){

        console.log("scroll to top");
        setTimeout(function () {
          $ionicScrollDelegate.scrollTop();
        }, 100)

      }else if(toState.name == "inbox"){
        console.log("scroll to bottom");
        setTimeout(function () {
          $ionicScrollDelegate.scrollBottom();
        }, 100)
      }

    });
  })




.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
