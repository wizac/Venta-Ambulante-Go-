// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
//aca agruegue la libreria leaflet
angular.module('starter', ['ionic','leaflet-directive'])

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
})

.controller("MarkerController", [ '$scope', function($scope) {
    angular.extend($scope, {

      //arreglo de json donde el mapa hace focus y center  aparece centrado ahi.
        osloCenter: {
            lat: 59.91,
            lng: 10.75,
            zoom: 12
        },
        markers: {
          //marcador que yo cree, aparece solo al iniciar la app tiene el focus en true
            osloMarker: {
                lat: 59.91,
                lng: 10.75,   
                message: "I want to travel here!",
                focus: true,
                draggable: true
            },
//marcador que yo cree, aparece solo al iniciar la app 
          anotherMarker: {
                lat: 56.91,
                lng: 11.75,   
                message: "I want to travel there!",
                focus: false,
                draggable: true
            },
            //defaul no tocar
        defaults: {
            scrollWheelZoom: false
        }
}

    });


 $scope.$on('leafletDirectiveMap.click', function(event)
 {
  //esto le dice que tipo de evento es junto al parametro en la funcion, si imprimis por console log sabe que es click y se activa bien.
        $scope.eventDetected = "Click";

//esto agrega marcadores no encuentro como carajo hacerlo dinamico, el event siempre me llega en null asdkasdkjlaslkjasdkjls
     $scope.markers.otro={
                lat: 59.91,
                lng: 11.75,   
                message: "I want to travel there!",
                focus: false,
                draggable: true
     };
//con esto creo un marcador al momento de hacer un click, habria que darle en lat y lng variables para que sea dinamico, y se agrega al markers del scope
// que tiene el arreglo de marcadores 

//el event se supone que tiene una funcion getLat , getLng y event.latlng que te tiene que traer un objeto latitud longitud
//en la documentacion dice que tiene tambien event.latlng.lat y event.latlng.lng para traer en string la lat y longitud 

      console.log($scope.eventDetected.lat);
    });



}]);

