angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {})

.controller('PlaylistsCtrl', function($scope,$filter) {
	
  $scope.datapointsList = [
    { DPNAME: 'Samsung', id: 1 },
    { DPNAME: 'Android', id: 2 },
    { DPNAME: 'Apple', id: 3 },
    { DPNAME: 'Indigo', id: 4 },
    { DPNAME: 'Phonegap', id: 8 },
    { DPNAME: 'System', id: 9 },
    { DPNAME: 'India', id: 5 },
    { DPNAME: 'Ionic', id: 6 }
  ];
  $scope.names=$scope.datapointsList ;
   $scope.adn = {};
	 $scope.srchchange = function () {

        $scope.names = null;
        var filtervalue = [];
		var serachData=$scope.datapointsList;
		console.log(serachData);
        for (var i = 0; i <serachData.length; i++) {

            var fltvar = $filter('uppercase')($scope.adn.item);
            var jsval = $filter('uppercase')(serachData[i].DPNAME);

            if (jsval.indexOf(fltvar) >= 0) {
                filtervalue.push(serachData[i]);
            }
        }
       // console.log("last");
        console.log(filtervalue);
        $scope.names = filtervalue;

    };

    $scope.ressetserach = function () {

        $scope.adn.item = "";
        $scope.names =$scope.datapointsList;
    }
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
