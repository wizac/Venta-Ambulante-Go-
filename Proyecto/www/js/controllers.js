var productos = [];
angular.module('app.controllers', [])
  
.controller('misDatosCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('registrarseCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('elijaLosProductosCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('informacionDeProductosCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('elijaClienteCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('elijaPuntoDeVentaCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('perfilCtrl',
function (API, $scope, $stateParams) {
	
		var cantidadVisibles = 0;
		var cantidadVerMas = 3;
		$scope.ultimasVentas = [];
		
		API.getProductos(function(p){
			productos = p;
			console.log(productos);
		}, function(error) {
			$scope.errormessage = error;
			console.log("error al recuperar productos: "+ error);
		});
		
		if(cantidadVisibles + 1 <= productos.length){
			console.log("si entra");
			$scope.ultimasVentas.push(productos[productos.length - 1]);
			cantidadVisibles = cantidadVisibles + 1;
		}
		else
		{
			console.log("no entra en el if " + (cantidadVisibles + 1) + " " + productos.length);
			console.log(productos);
		}
		
		$scope.verMas = function(){
			if((cantidadVisibles + cantidadVerMas) <= productos.length){
				for(var cant = cantidadVerMas; cant > 0; cant--){
					$scope.ultimasVentas.push(productos[(productos.length - 1) - cantidadVisibles]);
					cantidadVisibles = cantidadVisibles + 1;
				}
			}
			else
			{
				copiaCantVerMas = cantidadVerMas;
				do {
					if(--copiaCantVerMas > 0 && (cantidadVisibles + copiaCantVerMas) <= productos.length)
					{
						for(var cant = copiaCantVerMas; cant > 0; cant--){
							$scope.ultimasVentas.push(productos[(productos.length - 1) - cantidadVisibles]);
							cantidadVisibles = cantidadVisibles + 1;
						}
					}
				}
				while (copiaCantVerMas > 0 && (cantidadVisibles + copiaCantVerMas) > productos.length);
			}
		}
	
})
   
.controller('modificarDatosCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('proveedoresCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('nuevoProveedorCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('infoProveedorCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('nuevoPedidoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('elijaProveedorCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('pedidosCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('detallesPedidoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('ventasConfirmadasCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('detalleVentaCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('ventasPendientesCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('productosCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('nuevoProductoCtrl', ['$scope', '$stateParams',

function ($scope, $stateParams) {
	

}])

.controller('signupCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('loginCtrl', function ($scope, $state,$rootScope, API) {
	
	$rootScope.token = "";
	
	$scope.login = function(user, pass) {

		    API.logIn(user, pass, function(token){
			$rootScope.token = token;
			console.log("token devuelto: "+ token);
			$state.go('menu.perfil');
		}, function(error) {
			$scope.errormessage = error;
			console.log("error traje esto: "+ error);
		});
		
	}

})


.factory('API', function($http, $rootScope) {
	return {
		
		logIn: function(user, pass, cexito, cerror){
			
			var data = {
				"usser": user,
				"password": pass,
			};
 
			$http.post('http://localhost:8080/autentificacion',data).success(function(response){
		  
				if (response.success) {
					cexito(response.token);
				} else {
					cerror(response.message);
				}
				
			});
			
		},
		
		getProductos: function(cexito, cerror){
			
			if($rootScope != null && $rootScope != "")
			{
				$http.post('http://localhost:8080/api/productos/listar?token=' + $rootScope.token).success(function(response){
					
					if (response.success) {
						cexito(response.res);
					} else {
						cerror(response.message);
					}
				});
			}
			else
			{
				cerror("conexion perdida!");
			}
			
		}
		
		
	}
	
})






 