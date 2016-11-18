// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
 angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives','app.services','leaflet-directive'])

.config(function($ionicConfigProvider){

})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})


.controller("MarkerController", [ '$scope', function($scope) {
    angular.extend($scope, {
        osloCenter: {
            lat: 59.91,
            lng: 10.75,
            zoom: 12
        },
        markers: {
            osloMarker: {
                lat: 59.91,
                lng: 10.75,   
                message: "I want to travel here!",
                focus: true,
                draggable: true
            },

          anotherMarker: {
                lat: 56.91,
                lng: 11.75,   
                message: "I want to travel there!",
                focus: false,
                draggable: true
            },
        defaults: {
            scrollWheelZoom: false
        }
}

    });


 $scope.$on('leafletDirectiveMap.click', function(event,dat)
 {
        $scope.eventDetected = "Click";
//esto agrega marcadores no encuentro como carajo hacerlo dinamico, el event siempre me llega en null asdkasdkjlaslkjasdkjls
     $scope.markers.otro={
                lat: 59.91,
                lng: 11.75,   
                message: "I want to travel there!",
                focus: false,
                draggable: true

     };
      console.log($scope.eventDetected.lat);
    });

}]);
