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
function (API, $scope, $stateParams, $rootScope, $state) {
	
	
	var cantidadVisiblesVentas = 0;
	var cantidadVisiblesPedidos = 0;
	var cantidadVerMas = 3;
	var cantidadVerMenos = 3;
	$scope.ultimasVentas = [];
	$scope.ultimosPedidos = [];
	$scope.gananciaAnual = "Anual: $0";
	$scope.gananciaMensual = "Mensual: $0";
	$scope.gananciaSemanal = "Ultima semana: $0";
	$rootScope.ventas = [];
	$rootScope.pedidos = [];
	
		
	API.getVentasConNombreClienteOrdenado(function(result){
		console.log('las ventas con nombre del cliente se recuperaron con exito');
		var dia = new Date();
        $rootScope.ventas = result;
		console.log($rootScope.ventas);
		if(cantidadVisiblesVentas + 1 <= $rootScope.ventas.length){
			$scope.ultimasVentas.push($rootScope.ventas[$rootScope.ventas.length - 1]);
			cantidadVisiblesVentas = cantidadVisiblesVentas+ 1;
		}
	}, function(error) {
		console.log('la promesa se ha rechazado ' + error);
		$scope.errormessage = error;
	});

	
	API.getPedidosConNombreProveedorOrdenado(function(result){
		console.log('los pedidos con nombre proveedor se recuperaron con exito');
        $rootScope.pedidos = result;
		console.log($rootScope.pedidos);
		if(cantidadVisiblesPedidos + 1 <= $rootScope.pedidos.length){
			$scope.ultimosPedidos.push($rootScope.pedidos[$rootScope.pedidos.length - 1]);
			cantidadVisiblesPedidos = cantidadVisiblesPedidos + 1;
		}
	}, function(error) {
		console.log('la promesa se ha rechazado ' + error);
		$scope.errormessage = error;
	});
	
	
	API.getGananciaAnual(function(result){
		$scope.gananciaAnual = "Anual: $" + result;
	}, function(error) {
		console.log('la promesa se ha rechazado ' + error);
		$scope.errormessage = error;
	});
	
	API.getGananciaMensual(function(result){
		$scope.gananciaMensual = "Mensual: $" + result;
	}, function(error) {
		console.log('la promesa se ha rechazado ' + error);
		$scope.errormessage = error;
	});
	
	API.getGananciaSemanal(function(result){
		$scope.gananciaSemanal = "Ultima semana: $" + result;
	}, function(error) {
		console.log('la promesa se ha rechazado ' + error);
		$scope.errormessage = error;
	});
	
	// ---------------------------- VER MAS VENTAS --------------------------------------
	
	$scope.verMasVentas = function(){
			if((cantidadVisiblesVentas + cantidadVerMas) <= $rootScope.ventas.length){
				for(var cant = cantidadVerMas; cant > 0; cant--){
						$scope.ultimasVentas.push($rootScope.ventas[($rootScope.ventas.length - 1) - cantidadVisiblesVentas]);
						cantidadVisiblesVentas = cantidadVisiblesVentas + 1;
				}
			}
			else
			{
				copiaCantVerMas = cantidadVerMas;
				do {
					if(--copiaCantVerMas > 0 && (cantidadVisiblesVentas + copiaCantVerMas) <= $rootScope.ventas.length)
					{
						for(var cant = copiaCantVerMas; cant > 0; cant--){
							$scope.ultimasVentas.push($rootScope.ventas[($rootScope.ventas.length - 1) - cantidadVisiblesVentas]);
							cantidadVisiblesVentas = cantidadVisiblesVentas + 1;
						}
					}
				}
				while (copiaCantVerMas > 0 && (cantidadVisiblesVentas + copiaCantVerMas) > $rootScope.ventas.length);
			}
	}
	
	$scope.verMenosVentas = function(){
			if((cantidadVisiblesVentas - cantidadVerMenos) > 0){
				for(var cant = cantidadVerMenos; cant > 0; cant--){
						$scope.ultimasVentas.splice($scope.ultimasVentas.length - 1, 1);
						cantidadVisiblesVentas = cantidadVisiblesVentas - 1;
				}
			}
			else
			{
				copiaCantVerMenos = cantidadVerMenos;
				do {
					if(--copiaCantVerMenos > 0 && (cantidadVisiblesVentas - copiaCantVerMenos) > 0)
					{
						for(var cant = copiaCantVerMenos; cant > 0; cant--){
							$scope.ultimasVentas.splice($scope.ultimasVentas.length - 1, 1);
							cantidadVisiblesVentas = cantidadVisiblesVentas - 1;
						}
					}
				}
				while (copiaCantVerMenos > 0 && (cantidadVisiblesVentas - copiaCantVerMenos) < 1);
			}
	}
	
	
	
	// ---------------------------- VER DETALLE VENTA ------------------------------------
	
	
	$scope.verDetalleVenta = function(venta){
		
		$state.go('menu.detalleVenta');
	}
	
	
    // ---------------------------- VER MAS PEDIDOS --------------------------------------
	
	$scope.verMasPedidos = function(){
			if((cantidadVisiblesPedidos + cantidadVerMas) <= $rootScope.pedidos.length){
				for(var cant = cantidadVerMas; cant > 0; cant--){
						$scope.ultimosPedidos.push($rootScope.pedidos[($rootScope.pedidos.length - 1) - cantidadVisiblesPedidos]);
						cantidadVisiblesPedidos = cantidadVisiblesPedidos + 1;
				}
			}
			else
			{
				copiaCantVerMas = cantidadVerMas;
				do {
					if(--copiaCantVerMas > 0 && (cantidadVisiblesPedidos + copiaCantVerMas) <= $rootScope.pedidos.length)
					{
						for(var cant = copiaCantVerMas; cant > 0; cant--){
							$scope.ultimosPedidos.push($rootScope.pedidos[($rootScope.pedidos.length - 1) - cantidadVisiblesPedidos]);
							cantidadVisiblesPedidos = cantidadVisiblesPedidos + 1;
						}
					}
				}
				while (copiaCantVerMas > 0 && (cantidadVisiblesPedidos + copiaCantVerMas) > $rootScope.pedidos.length);
			}
	}
	
	$scope.verMenosPedidos = function(){
			if((cantidadVisiblesPedidos - cantidadVerMenos) > 0){
				for(var cant = cantidadVerMenos; cant > 0; cant--){
						$scope.ultimosPedidos.splice($scope.ultimosPedidos.length - 1, 1);
						cantidadVisiblesPedidos = cantidadVisiblesPedidos - 1;
				}
			}
			else
			{
				copiaCantVerMenos = cantidadVerMenos;
				do {
					if(--copiaCantVerMenos > 0 && (cantidadVisiblesPedidos - copiaCantVerMenos) > 0)
					{
						for(var cant = copiaCantVerMenos; cant > 0; cant--){
							$scope.ultimosPedidos.splice($scope.ultimosPedidos.length - 1, 1);
							cantidadVisiblesPedidos = cantidadVisiblesPedidos - 1;
						}
					}
				}
				while (copiaCantVerMenos > 0 && (cantidadVisiblesPedidos - copiaCantVerMenos) < 1);
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
   
.controller('ventasConfirmadasCtrl',
function (API, $scope, $stateParams) {
	
	var cantidadVisiblesVentasConfirmadas = 0;
	var cantidadVerMas = 5;
	var cantidadVerMenos = 5;
	$scope.ventasConfirmadas = [];
	var ventas = [];
	
	API.getVentas(function(result){
		console.log('las ventas se recuperaron con exito');
        ventas = result;
		console.log(result);
		for(var i = 0; i < 5; i ++){
			if(cantidadVisiblesVentasConfirmadas + 1 <= ventas.length){
				$scope.ventasConfirmadas.push(ventas[$scope.ventasConfirmadas.length]);
				cantidadVisiblesVentasConfirmadas = cantidadVisiblesVentasConfirmadas + 1;
			}
		}
	}, function(error) {
		console.log('la promesa se ha rechazado ' + message);
		$scope.errormessage = error;
	});
	
	
	$scope.verMasVentasConfirmadas = function(){
			if((cantidadVisiblesVentasConfirmadas + cantidadVerMas) <= ventas.length){
				for(var cant = cantidadVerMas; cant > 0; cant--){
						$scope.ventasConfirmadas.push(ventas[($rootScope.ventas.length - 1) - cantidadVisiblesVentas]);
						cantidadVisiblesVentas = cantidadVisiblesVentas + 1;
				}
			}
			else
			{
				copiaCantVerMas = cantidadVerMas;
				do {
					if(--copiaCantVerMas > 0 && (cantidadVisiblesVentas + copiaCantVerMas) <= $rootScope.ventas.length)
					{
						for(var cant = copiaCantVerMas; cant > 0; cant--){
							$scope.ultimasVentas.push($rootScope.ventas[($rootScope.ventas.length - 1) - cantidadVisiblesVentas]);
							cantidadVisiblesVentas = cantidadVisiblesVentas + 1;
						}
					}
				}
				while (copiaCantVerMas > 0 && (cantidadVisiblesVentas + copiaCantVerMas) > $rootScope.ventas.length);
			}
	}
	
	$scope.verMenosVentasConfirmadas = function(){
			if((cantidadVisiblesVentas - cantidadVerMenos) > 0){
				for(var cant = cantidadVerMenos; cant > 0; cant--){
						$scope.ultimasVentas.splice($scope.ultimasVentas.length - 1, 1);
						cantidadVisiblesVentas = cantidadVisiblesVentas - 1;
				}
			}
			else
			{
				copiaCantVerMenos = cantidadVerMenos;
				do {
					if(--copiaCantVerMenos > 0 && (cantidadVisiblesVentas - copiaCantVerMenos) > 0)
					{
						for(var cant = copiaCantVerMenos; cant > 0; cant--){
							$scope.ultimasVentas.splice($scope.ultimasVentas.length - 1, 1);
							cantidadVisiblesVentas = cantidadVisiblesVentas - 1;
						}
					}
				}
				while (copiaCantVerMenos > 0 && (cantidadVisiblesVentas - copiaCantVerMenos) < 1);
			}
	}
	


})
   
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
   
.controller('nuevoProductoCtrl',
function ($scope, $stateParams, API) {
	
	$scope.nuevoProducto = function(nombre, descripcion, precioVenta, precioCompra, cantidad,categoria) {

        API.nuevoProducto(nombre, descripcion, precioVenta, precioCompra, cantidad, categoria, function(result){
        console.log(result.message);
         //$state.go("menu.productos");
      }, function(error) {
        $scope.errormessage = error;
        console.log("error traje esto: "+ error);
      }
      );

  }

})

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
			}	
			);
		
	}

})


.factory('API', function($http, $rootScope, $q, $filter) {
	var deferred = $q.defer();
	return {
		
		
		// pasandole 2 callback 
		logIn: function(user, pass, cexito, cerror){
			
			var data = {
				"user": user,
				"pass": pass,
			};
 
			$http.post('http://localhost:8080/autentificacion',data).success(function(response){
		  
				if (response.success) {
					cexito(response.token);
				} else {
					cerror(response.message);
				}
				
			});
			
		},
		// usando patron promise-deferred
		getProductos: function(){
			
			if($rootScope != null && $rootScope != "")
			{
				$http.post('http://localhost:8080/api/producto/listar?token=' + $rootScope.token).success(function(response){
					
					if (response.success) {
						deferred.resolve(response.res);
					} else {
						deferred.reject(response.message)
					}
					return deferred.promise;
				});
			}
			else
			{
				deferred.reject("conexion perdida")
			}
			return deferred.promise;
			
		},
		
		nuevoProducto: function(nombre, descripcion, precioVenta, precioCompra, cantidad, categoria, cexito, cerror){
			var data = {
					"nombre": nombre,
					"descripcion": descripcion,
					"precioVenta":precioVenta,
					"precioCompra":precioCompra,
					"cantidad":cantidad,
					"categoria":categoria,
				  };

			$http.post('http://localhost:8080/api/producto/insertar?token='+ $rootScope.token,data).success(function(response){

				if (response.success) {
					  cexito(response);
				} else {
					  cerror(response.message);
				}

			});	 
		},
					
		getVentas: function(cexito, cerror){
			
			if($rootScope != null && $rootScope != "")
			{
				$http.post('http://localhost:8080/api/venta/listar?token=' + $rootScope.token).success(function(response){
					
					if (response.success) {
						cexito(response.res)
					} else {
						cerror(response.message);
					}
				});
			}
			else
			{
				cerror("conexion perdida");
			}
			
		},
		
		getPedidos: function(cexito, cerror){
			
			if($rootScope != null && $rootScope != "")
			{
				$http.post('http://localhost:8080/api/pedido/listar?token=' + $rootScope.token).success(function(response){
					
					if (response.success) {
						cexito(response.res)
					} else {
						cerror(response.message);
					}
				});
			}
			else
			{
				cerror("conexion perdida");
			}
			
		},
		
		getClientes: function(cexito, cerror){
			
			if($rootScope != null && $rootScope != "")
			{
				$http.post('http://localhost:8080/api/cliente/listar?token=' + $rootScope.token).success(function(response){
					
					if (response.success) {
						cexito(response.res)
					} else {
						cerror(response.message);
					}
				});
			}
			else
			{
				cerror("conexion perdida");
			}
			
		},
		
		getClientesPorId: function(id, cexito, cerror){
			if($rootScope != null && $rootScope != "")
			{
				var data = {
					"id": id
				};
				$http.post('http://localhost:8080/api/cliente/listar?token=' + $rootScope.token, data).success(function(response){
					
					if (response.success) {
						cexito(response.res)
					} else {
						cerror(response.message);
					}
				});
			}
			else
			{
				cerror("conexion perdida");
			}
			
		},
		
		getVentasConNombreClienteOrdenado: function(cexito, cerror){
			if($rootScope != null && $rootScope != "")
			{
				$http.post('http://localhost:8080/api/ventasOrdenadas?token=' + $rootScope.token).success(function(responseVenta){
					if (responseVenta.success) {
						if($rootScope != null && $rootScope != ""){
							responseVenta.res.forEach(function (itemVenta) {
								var data = {
									"id": itemVenta.cliente
								}; 
								$http.post('http://localhost:8080/api/cliente/listar?token=' + $rootScope.token, data).success(function(responseCliente){
									if (responseCliente.success) {
										itemVenta.fecha = $filter('date')(itemVenta.fecha, "dd/MM/yyyy");
										itemVenta.nombreCliente = responseCliente.res.nombre + " " + responseCliente.res.apellido;
									} else {
										cerror(responseCliente.message);
									}
								});
							});
						cexito(responseVenta.res)
						}
						else{
							cerror("conexion perdida");
						}

					} else{
							cerror(responseVenta.message);
					}
				});
			}
			else{
				cerror("conexion perdida");
			}
			
		},
		
		getPedidosConNombreProveedorOrdenado: function(cexito, cerror){
			if($rootScope != null && $rootScope != "")
			{
				$http.post('http://localhost:8080/api/pedidosOrdenados?token=' + $rootScope.token).success(function(responsePedido){
					if (responsePedido.success) {
						if($rootScope != null && $rootScope != ""){
							responsePedido.res.forEach(function (itemPedido) {
								var data = {
									"id": itemPedido.proveedor
								}; 
								$http.post('http://localhost:8080/api/proveedor/listar?token=' + $rootScope.token, data).success(function(responseProveedor){
									if (responseProveedor.success) {
										itemPedido.fecha = $filter('date')(itemPedido.fecha, "dd/MM/yyyy");
										itemPedido.nombreProveedor = responseProveedor.res.nombre;
									} else {
										cerror(responseProveedor.message);
									}
								});
							});
						cexito(responsePedido.res)
						}
						else{
							cerror("conexion perdida");
						}

					} else{
							cerror(responsePedido.message);
					}
				});
			}
			else{
				cerror("conexion perdida");
			}
			
		},
		
		getVentasOrdenadas: function(cexito, cerror){
			
			if($rootScope != null && $rootScope != "")
			{
				$http.post('http://localhost:8080/api/ventasOrdenadas?token=' + $rootScope.token).success(function(response){
					
					if (response.success) {
						cexito(response.res)
					} else {
						cerror(response.message);
					}
				});
			}
			else
			{
				cerror("conexion perdida");
			}
			
		},
		
		getPedidosOrdenados: function(cexito, cerror){
			
			if($rootScope != null && $rootScope != "")
			{
				$http.post('http://localhost:8080/api/pedidosOrdenados?token=' + $rootScope.token).success(function(response){
					
					if (response.success) {
						cexito(response.res)
					} else {
						cerror(response.message);
					}
				});
			}
			else
			{
				cerror("conexion perdida");
			}
			
		},
		
		getGananciaAnual: function(cexito, cerror){
			
			if($rootScope != null && $rootScope != "")
			{
				$http.post('http://localhost:8080/api/venta/listar?token=' + $rootScope.token).success(function(responseVenta){
					
					if (responseVenta.success) {
						
						if($rootScope != null && $rootScope != "")
						{
							$http.post('http://localhost:8080/api/pedido/listar?token=' + $rootScope.token).success(function(responsePedido){
					
								if (responsePedido.success) {
									
									var totalVentas = 0;
									var totalPedidos = 0;
									for(var i = 0; i < responseVenta.res.length; i++){
										if(($filter('date')(responseVenta.res[i].fecha, "yyyy")) == ($filter('date')(new Date(), "yyyy"))){
											totalVentas = totalVentas + responseVenta.res[i].total;
										}
									}
									for(var i = 0; i < responsePedido.res.length; i++){
										if(($filter('date')(responsePedido.res[i].fecha, "yyyy")) == ($filter('date')(new Date(), "yyyy"))){
											totalPedidos = totalPedidos+ responsePedido.res[i].total;
										}
									}
									
									cexito(totalVentas - totalPedidos);
									
								} else {
									cerror(responsePedido.message);
								}
							});
						}
						else
						{
							cerror("conexion perdida");
						}
						
					} else {
						cerror(responseVenta.message);
					}
				});
			}
			else
			{
				cerror("conexion perdida");
			}
			
		},
		
		getGananciaMensual: function(cexito, cerror){
			
			if($rootScope != null && $rootScope != "")
			{
				$http.post('http://localhost:8080/api/venta/listar?token=' + $rootScope.token).success(function(responseVenta){
					
					if (responseVenta.success) {
						
						if($rootScope != null && $rootScope != "")
						{
							$http.post('http://localhost:8080/api/pedido/listar?token=' + $rootScope.token).success(function(responsePedido){
					
								if (responsePedido.success) {
									
									var totalVentas = 0;
									var totalPedidos = 0;
									for(var i = 0; i < responseVenta.res.length; i++){
										if(($filter('date')(responseVenta.res[i].fecha, "MM/yyyy")) == ($filter('date')(new Date(), "MM/yyyy"))){
											totalVentas = totalVentas + responseVenta.res[i].total;
										}
									}
									for(var i = 0; i < responsePedido.res.length; i++){
										if(($filter('date')(responsePedido.res[i].fecha, "MM/yyyy")) == ($filter('date')(new Date(), "MM/yyyy"))){
											totalPedidos = totalPedidos+ responsePedido.res[i].total;
										}
									}
									
									cexito(totalVentas - totalPedidos);
									
								} else {
									cerror(responsePedido.message);
								}
							});
						}
						else
						{
							cerror("conexion perdida");
						}
						
					} else {
						cerror(responseVenta.message);
					}
				});
			}
			else
			{
				cerror("conexion perdida");
			}
			
		},
		
		
		getGananciaSemanal: function(cexito, cerror){
			
			if($rootScope != null && $rootScope != "")
			{
				$http.post('http://localhost:8080/api/venta/listar?token=' + $rootScope.token).success(function(responseVenta){
					
					if (responseVenta.success) {
						
						if($rootScope != null && $rootScope != "")
						{
							$http.post('http://localhost:8080/api/pedido/listar?token=' + $rootScope.token).success(function(responsePedido){
					
								if (responsePedido.success) {
									
									var totalVentas = 0;
									var totalPedidos = 0;
									for(var i = 0; i < responseVenta.res.length; i++){
										if(($filter('date')(responseVenta.res[i].fecha, "MM/yyyy")) == ($filter('date')(new Date(), "MM/yyyy"))){
											totalVentas = totalVentas + responseVenta.res[i].total;
										}
									}
									for(var i = 0; i < responsePedido.res.length; i++){
										if(($filter('date')(responsePedido.res[i].fecha, "MM/yyyy")) == ($filter('date')(new Date(), "MM/yyyy"))){
											totalPedidos = totalPedidos+ responsePedido.res[i].total;
										}
									}
									
									cexito(totalVentas - totalPedidos);
									
								} else {
									cerror(responsePedido.message);
								}
							});
						}
						else
						{
							cerror("conexion perdida");
						}
						
					} else {
						cerror(responseVenta.message);
					}
				});
			}
			else
			{
				cerror("conexion perdida");
			}
			
		}
		
		
	}
	
})






 