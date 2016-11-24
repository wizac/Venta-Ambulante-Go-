angular.module('app.controllers', [])
.controller('misDatosCtrl', function ($scope, $stateParams, $rootScope) {

$scope.nombreUsuario = "Nombre: " + $rootScope.usuario.nombre;
$scope.apellidoUsuario = "Apellido: " + $rootScope.usuario.apellido;

})
   
.controller('menuCtrl', ['$scope', '$stateParams', '$ionicHistory', '$rootScope', '$state',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicHistory, $rootScope, $state) {
	
	$scope.logout = function(){
	
		$ionicHistory.clearCache().then(function() {
			$ionicHistory.clearHistory();
			$ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
			$rootScope = $rootScope.$new(true);
			$scope = $scope.$new(true);
			$state.go('login');
		})
	
	}


}])
   
.controller('registrarseCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('elijaLosProductosCtrl', function ($scope, $stateParams, $rootScope, $state, $filter, API) {
	
	$scope.productosStock = [];
	$rootScope.productosSeleccionados = [];
	$scope.productosFiltrados = []
	
	API.getProductosConStock(function(result){
		
		$scope.productosStock = result;
		$scope.productosFiltrados = $scope.productosStock
		
	}, function(error) {
		console.log('la promesa se ha rechazado ' + error);
		$scope.errormessage = error;
	});
	
	
	$scope.agregarProducto = function(producto){
		for(var i = 0; i < $scope.productosStock.length; i ++){
			if($scope.productosStock[i]._id == producto._id){
				if($scope.productosStock[i].cantidad > $scope.productosStock[i].cantidadSeleccionados){
					$scope.productosStock[i].cantidadSeleccionados += 1;
				}
			}
		}
		
	}
	
	
	$scope.quitarProducto = function(producto){
		for(var i = 0; i < $scope.productosStock.length; i ++){
			if($scope.productosStock[i]._id == producto._id){
				if($scope.productosStock[i].cantidadSeleccionados > 0){
					$scope.productosStock[i].cantidadSeleccionados -= 1;
				}
			}
		}
		
	}
	


	$scope.confirmarProductos = function(){
		$rootScope.productosSeleccionados = [];
		for(var i = 0; i < $scope.productosStock.length; i ++){
			if($scope.productosStock[i].cantidadSeleccionados > 0){
				$rootScope.productosSeleccionados.push($scope.productosStock[i]);
			}
		}
		if($rootScope.productosSeleccionados.length > 0){
			$state.go("menu.confirmarProductos");
		}
		else{
			console.log("debe seleccionar algún producto para realizar la venta");
		}
	}
	
	$scope.limpiar = function(){
		for(var i = 0; i < $scope.productosStock.length; i ++){
			$scope.productosStock[i].cantidadSeleccionados = 0;
		}
	}
	
	$scope.adn = {};
	 $scope.srchchange = function () {

        $scope.productosFiltrados = null;
        var filtervalue = [];
		var serachData=$scope.productosStock;
		console.log(serachData);
        for (var i = 0; i <serachData.length; i++) {

            var fltvar = $filter('uppercase')($scope.adn.item);
            var jsval = $filter('uppercase')(serachData[i].nombre);

            if (jsval.indexOf(fltvar) >= 0) {
                filtervalue.push(serachData[i]);
            }
        }
       // console.log("last");
        console.log(filtervalue);
        $scope.productosFiltrados = filtervalue;

    };

    $scope.ressetserach = function () {

        $scope.adn.item = "";
        $scope.productosFiltrados =$scope.productosStock;
    }



})
   
.controller('confirmarProductosCtrl', function ($scope, $stateParams, $rootScope, $state, $ionicPopup) {
	
	
	$scope.productosSeleccionados = $rootScope.productosSeleccionados;
	$rootScope.precioTotal = 0;
	
	$scope.agregarProductoSeleccionado = function(producto){
		for(var i = 0; i < $scope.productosSeleccionados.length; i ++){
			if($scope.productosSeleccionados[i]._id == producto._id){
				if($scope.productosSeleccionados[i].cantidad > $scope.productosSeleccionados[i].cantidadSeleccionados){
					$scope.productosSeleccionados[i].cantidadSeleccionados += 1;
				}
			}
			$rootScope.productosSeleccionados = $scope.productosSeleccionados;
		}
		
		$rootScope.precioTotal = 0;
		for(var i = 0; i < $scope.productosSeleccionados.length; i ++){
			$rootScope.precioTotal += ($scope.productosSeleccionados[i].precioVenta * $scope.productosSeleccionados[i].cantidadSeleccionados);
		}
		$scope.precioTotal = "Precio total: $" + $rootScope.precioTotal;
		
	}
	
	$scope.problema=function(){

		$ionicPopup.alert({
			title: 'Aviso!',
			template: 'Esta opcion no esta disponible en esta version'
		});
		$ionicHistory.nextViewOptions({
				disableBack: true
		});

	}
	
	$scope.quitarProductoSeleccionado = function(producto){
		for(var i = 0; i < $scope.productosSeleccionados.length; i ++){
			if($scope.productosSeleccionados[i]._id == producto._id){
				if($scope.productosSeleccionados[i].cantidadSeleccionados > 1){
					$scope.productosSeleccionados[i].cantidadSeleccionados -= 1;
				}
				else{
					$scope.productosSeleccionados.splice(i, 1);
				}
			}
		}
		$rootScope.productosSeleccionados = $scope.productosSeleccionados;
		
		$rootScope.precioTotal = 0;
		for(var i = 0; i < $scope.productosSeleccionados.length; i ++){
			$rootScope.precioTotal += ($scope.productosSeleccionados[i].precioVenta * $scope.productosSeleccionados[i].cantidadSeleccionados);
		}
		$scope.precioTotal = "Precio total: $" + $rootScope.precioTotal;
	}

	$rootScope.precioTotal = 0;
	for(var i = 0; i < $scope.productosSeleccionados.length; i ++){
		$rootScope.precioTotal += ($scope.productosSeleccionados[i].precioVenta * $scope.productosSeleccionados[i].cantidadSeleccionados)
	}
	
	$scope.precioTotal = "Precio total: $" + $rootScope.precioTotal;
	
	
	$scope.seleccionarCliente = function(){
		
		$state.go("menu.elijaCliente");
		
	}

})
   
.controller('elijaClienteCtrl', function ($scope, $stateParams, $rootScope, $state, API, $filter) {

	
	$scope.clientes = [];
	$scope.clientesFiltrados = [];
	$scope.clienteSeleccionado = {};
	$rootScope.clienteSeleccionado = {};

	API.getClientes(function(result){
		$scope.clientes = result;
		$scope.clientesFiltrados = $scope.clientes;
	}, function(error) {
		console.log('la promesa se ha rechazado ' + error);
		$scope.errormessage = error;
	});;
	
	$scope.seleccionarPuntoMapa = function(){
		
		if(!angular.equals($scope.clienteSeleccionado,{})){
			$rootScope.clienteSeleccionado = $scope.clienteSeleccionado.opcionSeleccionada;
			console.log($rootScope.clienteSeleccionado);
			$state.go("menu.elijaPuntoDeVenta")
		}
		else{
			console.log("debe seleccionar un cliente");
		}
	}
	
	$scope.adn = {};
	 $scope.srchchange = function () {

        $scope.clientesFiltrados = null;
        var filtervalue = [];
		var serachData=$scope.clientes;
		console.log(serachData);
        for (var i = 0; i <serachData.length; i++) {

            var fltvar = $filter('uppercase')($scope.adn.item);
            var jsval = $filter('uppercase')(serachData[i].nombre + " " +serachData[i].apellido);

            if (jsval.indexOf(fltvar) >= 0) {
                filtervalue.push(serachData[i]);
            }
        }
        console.log(filtervalue);
        $scope.clientesFiltrados = filtervalue;

    };

    $scope.ressetserach = function () {

        $scope.adn.item = "";
        $scope.clientesFiltrados =$scope.clientes;
    }

})
   
.controller('elijaPuntoDeVentaCtrl', function ($scope, $stateParams, API, $rootScope, $state, $filter, $ionicHistory, $ionicPopup) {
	
	var fecha;
	var producto;
	var total;
	var marcador;
	var centrado;
	var cliente;
	var estado;

	angular.extend($scope, {
        center: {
            lat: -33.20,
            lng: -66.30,
            zoom: 14
        },
        markers: {
            osloMarker: {
                lat: -33.20,
                lng: -66.30,   
                message: "Arrastra el marcado hacia el punto de venta!",
                focus: true,
                draggable: true
            }
		},
		defaults: {
            scrollWheelZoom: true
        }
	});
	
	
	
	$scope.guardarVenta = function(){
		
		fecha = ($filter('date')(new Date(), "dd/MM/yyyy"));
		producto = $rootScope.productosSeleccionados;
		for(var i = 0; i < producto.length; i++){
			producto[i].cantidad = producto[i].cantidadSeleccionados;
		}
		total = $rootScope.precioTotal;
		marcador = $scope.markers;
		centrado = $scope.center;
		cliente = angular.fromJson($rootScope.clienteSeleccionado);
		estado = false;
		
		
		API.nuevaVenta(fecha, producto, total, marcador, centrado, cliente, estado, function(result){
			
			console.log(result.message);
			$ionicPopup.alert({
							title: 'Aviso!',
							template: 'La venta se registro correctamente. Debe confirmarla'
						});
			$ionicHistory.nextViewOptions({
				disableBack: true
			});
			$state.go("menu.ventasPendientes");
			
		}, function(error) {
			console.log('la promesa se ha rechazado ' + error);
			$scope.errormessage = error;
		});;
			
	}

})
   
.controller('perfilCtrl',function (API, $scope, $stateParams, $rootScope, $state) {
	
	
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
	$rootScope.ventaDetallada = [];
	
		
	API.getVentasConfirmadasConNombreClienteOrdenado(function(result){
		console.log('las ventas con nombre del cliente se recuperaron con exito');
        $rootScope.ventas = result;
		console.log($rootScope.ventas);
		if(cantidadVisiblesVentas + 1 <= $rootScope.ventas.length){
			if($rootScope.ventas[$rootScope.ventas.length - 1].estado){
				$scope.ultimasVentas.push($rootScope.ventas[$rootScope.ventas.length - 1]);
				cantidadVisiblesVentas = cantidadVisiblesVentas+ 1;
			}
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
			if($rootScope.pedidos[$rootScope.pedidos.length - 1].estado){
				$scope.ultimosPedidos.push($rootScope.pedidos[$rootScope.pedidos.length - 1]);
				cantidadVisiblesPedidos = cantidadVisiblesPedidos + 1;
			}
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
		$rootScope.ventaDetallada = venta;
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
   
.controller('modificarDatosCtrl', function ($scope, $stateParams, $state, $rootScope, $ionicPopup, $ionicHistory, API) {

	$scope.nombre = "";
	$scope.apellido = "";
	$scope.pass = "";
	$scope.passRep = "";
	
	if($rootScope.usuario != null){
		
		$scope.nombre = $rootScope.usuario.nombre;
		$scope.apellido = $rootScope.usuario.apellido;
	}
	else{
		console.log("no hay usuario");
		$ionicHistory.nextViewOptions({
			disableBack: true
		});
		$state.go("login");
	}
	
	$scope.guardarCambios = function(nombre, apellido, pass, passRep){
		
		if(pass != "" && pass != "" && pass == passRep){
			
			if($rootScope.usuario != null){
				API.actualizarUsuario($rootScope.usuario._id, nombre, apellido, $rootScope.usuario.user, pass,
				function(result){
					console.log(result.message);
					$ionicPopup.alert({
							title: 'Aviso!',
							template: 'Los datos se actualizaron correctamente!'
						});
						
					$ionicHistory.nextViewOptions({
						disableBack: true
					});
					$state.go("menu.misDatos");

				}, function(error) {
					console.log('la promesa se ha rechazado ' + error);
					$scope.errormessage = error;
					$ionicPopup.alert({
							title: 'Error!',
							template: error
						});
				});
			}
			else{
				console.log("no hay cliente");
				$ionicHistory.nextViewOptions({
					disableBack: true
				});
				$state.go("login");
			}
		}
		else{
			
			$ionicPopup.alert({
							title: 'Aviso!',
							template: 'La contraseña no coincide!'
						});
			
		}
	}
	
	

})
   
.controller('clientesCtrl', function ($scope, $stateParams,$rootScope, $state, API, $filter) {
	
	
	$scope.clientes = [];
	$scope.clientesFiltrados = [];
	$rootScope.cliente;

	API.getClientes(function(result){
		$scope.clientes = result;
		$scope.clientesFiltrados = $scope.clientes;
	}, function(error) {
		console.log('la promesa se ha rechazado ' + error);
		$scope.errormessage = error;
	});
	
	$scope.informacionCliente = function(cliente){
		$rootScope.cliente = cliente;
		$state.go("menu.infoCliente");
	}
	
	
	$scope.nuevoCliente = function(){
		$state.go("menu.nuevoCliente");
	}
	
	$scope.adn = {};
	 $scope.srchchange = function () {

        $scope.clientesFiltrados = null;
        var filtervalue = [];
		var serachData=$scope.clientes;
		console.log(serachData);
        for (var i = 0; i <serachData.length; i++) {

            var fltvar = $filter('uppercase')($scope.adn.item);
            var jsval = $filter('uppercase')(serachData[i].nombre + " " + serachData[i].apellido);

            if (jsval.indexOf(fltvar) >= 0) {
                filtervalue.push(serachData[i]);
            }
        }
       // console.log("last");
        console.log(filtervalue);
        $scope.clientesFiltrados = filtervalue;

    };

    $scope.ressetserach = function () {

        $scope.adn.item = "";
        $scope.clientesFiltrados =$scope.clientes;
    }


})
   
.controller('nuevoClienteCtrl', function ($scope, $stateParams,$rootScope, $state, API) {
	
	$scope.nombreCliente = "";
	$scope.apellidoCliente = "";
	$scope.dniCliente = "";
	$scope.direccionCliente = "";
	$scope.telefonoCliente = "";
	
	$scope.nuevoCliente = function(nombreCliente, apellidoCliente, dniCliente, direccionCliente, telefonoCliente){
		API.nuevoCliente( nombreCliente, apellidoCliente, dniCliente, direccionCliente, telefonoCliente,
			function(result){
				console.log(result.message);
				$state.go("menu.clientes");

			}, function(error) {
				console.log('la promesa se ha rechazado ' + error);
				$scope.errormessage = error;
			});
	}


}) 

.controller('infoClienteCtrl', function ($scope, $stateParams, $rootScope, $state, API) {

	$scope.nombreCliente = "";
	$scope.apellidoCliente = "";
	$scope.dniCliente = "";
	$scope.direccionCliente = "";
	$scope.telefonoCliente = "";
	
	if($rootScope.cliente != null){
		
		$scope.nombreCliente = $rootScope.cliente.nombre;
		$scope.apellidoCliente = $rootScope.cliente.apellido;
		$scope.dniCliente = $rootScope.cliente.dni;
		$scope.direccionCliente = $rootScope.cliente.direccion;
		$scope.telefonoCliente = $rootScope.cliente.telefono;
	}
	else{
		console.log("no hay cliente");
	}
	
	$scope.guardarCambios = function(nombreCliente, apellidoCliente, dniCliente, direccionCliente, telefonoCliente){
		
		if($rootScope.cliente != null){
			API.actualizarCliente($rootScope.cliente._id, nombreCliente, apellidoCliente, dniCliente, direccionCliente, telefonoCliente,
			function(result){
				console.log(result.message);
				$state.go("menu.clientes");

			}, function(error) {
				console.log('la promesa se ha rechazado ' + error);
				$scope.errormessage = error;
			});
		}
		else{
			console.log("no hay cliente");
		}
	}
	
	
	$scope.eliminarCliente = function(){
		
		if($rootScope.cliente != null){
			API.eliminarCliente($rootScope.cliente._id, function(result){
				console.log(result.message);
				$state.go("menu.clientes");
			}, function(error) {
				console.log('la promesa se ha rechazado ' + error);
				$scope.errormessage = error;
			});
		}
		else{
			console.log("no hay cliente");
		}
		
	}

})
   
.controller('proveedoresCtrl', function ($scope, $stateParams,$rootScope, $state, API, $filter) {

	$scope.proveedores = [];
	$scope.proveedoresFiltrados = [];
	$rootScope.proveedor;

	API.getProveedores(function(result){
		$scope.proveedores = result;
		$scope.proveedoresFiltrados = $scope.proveedores;
	}, function(error) {
		console.log('la promesa se ha rechazado ' + error);
		$scope.errormessage = error;
	});
	
	$scope.informacionProveedor = function(proveedor){
		$rootScope.proveedor = proveedor;
		$state.go("menu.infoProveedor");
	}
	
	$scope.nuevoProveedor = function(){
		$state.go("menu.nuevoProveedor");
	}
	
	$scope.adn = {};
	 $scope.srchchange = function () {

        $scope.proveedoresFiltrados = null;
        var filtervalue = [];
		var serachData=$scope.proveedores;
		console.log(serachData);
        for (var i = 0; i <serachData.length; i++) {

            var fltvar = $filter('uppercase')($scope.adn.item);
            var jsval = $filter('uppercase')(serachData[i].nombre);

            if (jsval.indexOf(fltvar) >= 0) {
                filtervalue.push(serachData[i]);
            }
        }
        console.log(filtervalue);
        $scope.proveedoresFiltrados = filtervalue;

    };

    $scope.ressetserach = function () {

        $scope.adn.item = "";
        $scope.proveedoresFiltrados =$scope.proveedores;
    }
})
   
.controller('nuevoProveedorCtrl', function ($scope, $stateParams,$rootScope, $state, API) {

	$scope.nombreProveedor = "";
	$scope.direccionProveedor = "";
	$scope.cuitProveedor = "";
	$scope.telefonoProveedor = "";
	
	
	$scope.nuevoProveedor = function(nombreProveedor, direccionProveedor, cuitProveedor, telefonoProveedor){
		
		API.nuevoProveedor(nombreProveedor, direccionProveedor, cuitProveedor, telefonoProveedor, 
		function(result){
			console.log(result.message);
			$state.go("menu.proveedores");

		}, function(error) {
			console.log('la promesa se ha rechazado ' + error);
			$scope.errormessage = error;
		});
		
	}

})
   
.controller('infoProveedorCtrl', function ($scope, $stateParams, $rootScope, $state, API) {

	$scope.nombreProveedor = "";
	$scope.direccionProveedor = "";
	$scope.cuitProveedor = "";
	$scope.telefonoProveedor = "";
	
	if($rootScope.proveedor != null){
		
		$scope.nombreProveedor = $rootScope.proveedor.nombre;
		$scope.direccionProveedor = $rootScope.proveedor.direccion;
		$scope.cuitProveedor = $rootScope.proveedor.cuit;
		$scope.telefonoProveedor = $rootScope.proveedor.telefono;
	}
	else{
		console.log("no hay proveedor");
	}
	
	$scope.guardarCambios = function(nombreProveedor, direccionProveedor, cuitProveedor, telefonoProveedor){
		
		if($rootScope.proveedor != null){
			console.log($scope.nombreProveedor);
			API.actualizarProveedor($rootScope.proveedor._id, nombreProveedor, direccionProveedor, cuitProveedor, telefonoProveedor, 
			function(result){
				console.log(result.message);
				$state.go("menu.proveedores");

			}, function(error) {
				console.log('la promesa se ha rechazado ' + error);
				$scope.errormessage = error;
			});
		}
		else{
			console.log("no hay proveedor");
		}
	}
	
	$scope.eliminarProveedor = function(){
		
		if($rootScope.proveedor != null){
			API.eliminarProveedor($rootScope.proveedor._id, function(result){
				console.log(result.message);
				$state.go("menu.proveedores");
			}, function(error) {
				console.log('la promesa se ha rechazado ' + error);
				$scope.errormessage = error;
			});
		}
		else{
			console.log("no hay proveedor");
		}
		
	}

})
   
.controller('elijaLosProductosPedidosCtrl', function ($scope, $stateParams, $rootScope, $state, API, $ionicPopup, $filter) {


	$scope.productosStock = [];
	$scope.productosPedidosFiltrados = [];
	$rootScope.productosSeleccionadosPedidos = [];
	
	API.getProductosConStock(function(result){
		
		$scope.productosStock = result;
		$scope.productosPedidosFiltrados = $scope.productosStock;
	}, function(error) {
		console.log('la promesa se ha rechazado ' + error);
		$scope.errormessage = error;
	});
	
	
	$scope.agregarProducto = function(producto){
		for(var i = 0; i < $scope.productosStock.length; i ++){
			if($scope.productosStock[i]._id == producto._id){
					$scope.productosStock[i].cantidadSeleccionados += 1;
				
			}
		}
		
	}
	
	
	$scope.quitarProducto = function(producto){
		for(var i = 0; i < $scope.productosStock.length; i ++){
			if($scope.productosStock[i]._id == producto._id){
				if($scope.productosStock[i].cantidadSeleccionados > 0){
					$scope.productosStock[i].cantidadSeleccionados -= 1;
				}
			}
		}
		
	}
	
	$scope.confirmarProductos = function(){
		$rootScope.productosSeleccionadosPedidos = [];
		for(var i = 0; i < $scope.productosStock.length; i ++){
			if($scope.productosStock[i].cantidadSeleccionados > 0){
				$rootScope.productosSeleccionadosPedidos.push($scope.productosStock[i]);
			}
		}
		if($rootScope.productosSeleccionadosPedidos.length > 0){
			$state.go("menu.confirmarProductosPedidos");
		}
		else{
			$ionicPopup.alert({
							title: 'Aviso!',
							template: 'debe seleccionar algún producto para realizar el pedido'
						});
			console.log("debe seleccionar algún producto para realizar la venta");
		}
	}
	
	$scope.limpiar = function(){
		for(var i = 0; i < $scope.productosStock.length; i ++){
			$scope.productosStock[i].cantidadSeleccionados = 0;
		}
	}
	
	$scope.adn = {};
	 $scope.srchchange = function () {

        $scope.productosPedidosFiltrados = null;
        var filtervalue = [];
		var serachData=$scope.productosStock;
		console.log(serachData);
        for (var i = 0; i <serachData.length; i++) {

            var fltvar = $filter('uppercase')($scope.adn.item);
            var jsval = $filter('uppercase')(serachData[i].nombre);

            if (jsval.indexOf(fltvar) >= 0) {
                filtervalue.push(serachData[i]);
            }
        }
        console.log(filtervalue);
        $scope.productosPedidosFiltrados = filtervalue;

    };

    $scope.ressetserach = function () {

        $scope.adn.item = "";
        $scope.productosPedidosFiltrados = $scope.productosStock;
    }

})

.controller('confirmarProductosPedidosCtrl', function ($scope, $stateParams, $rootScope, $state, API) {
	
	$rootScope.totalPedidos = 0;
	
	if(!angular.isUndefined($rootScope.productosSeleccionadosPedidos)){
		$scope.productosSeleccionados = $rootScope.productosSeleccionadosPedidos
	}
	else{
		$scope.productosSeleccionados = [];
	}
	
	$scope.agregarProductoSeleccionado = function(producto){
		for(var i = 0; i < $scope.productosSeleccionados.length; i ++){
			if($scope.productosSeleccionados[i]._id == producto._id){
				$scope.productosSeleccionados[i].cantidadSeleccionados += 1;
			}
			$rootScope.productosSeleccionadosPedidos = $scope.productosSeleccionados;
		}
		
		for(var i = 0; i < $scope.productosSeleccionados.length; i ++){
			$rootScope.totalPedidos += ($scope.productosSeleccionados[i].precioVenta * $scope.productosSeleccionados[i].cantidadSeleccionados);
		}
		$scope.precioTotal = "Precio total: $" + $rootScope.totalPedidos;
		
	}
	
	
	$scope.quitarProductoSeleccionado = function(producto){
		for(var i = 0; i < $scope.productosSeleccionados.length; i ++){
			if($scope.productosSeleccionados[i]._id == producto._id){
				if($scope.productosSeleccionados[i].cantidadSeleccionados > 1){
					$scope.productosSeleccionados[i].cantidadSeleccionados -= 1;
				}
				else{
					$scope.productosSeleccionados.splice(i, 1);
				}
			}
		}
		$rootScope.productosSeleccionadosPedidos = $scope.productosSeleccionados;
		
		$rootScope.totalPedidos = 0;
		for(var i = 0; i < $scope.productosSeleccionados.length; i ++){
			$rootScope.totalPedidos += ($scope.productosSeleccionados[i].precioVenta * $scope.productosSeleccionados[i].cantidadSeleccionados);
		}
		$scope.precioTotal = "Precio total: $" + $rootScope.totalPedidos;
	}

	$rootScope.totalPedidos = 0;
	for(var i = 0; i < $scope.productosSeleccionados.length; i ++){
		$rootScope.totalPedidos += ($scope.productosSeleccionados[i].precioVenta * $scope.productosSeleccionados[i].cantidadSeleccionados)
	}
	$scope.precioTotal = "Precio total: $" + $rootScope.totalPedidos;
	
	
	$scope.seleccionarProveedor = function(){
		$state.go("menu.elijaProveedor");
	}

	
})
   
.controller('elijaProveedorCtrl', function ($scope, $stateParams, $rootScope, $state, API, $filter, $ionicHistory, $ionicPopup) {

	$scope.proveedores = [];
	$scope.proveedoresFiltrados = [];
	$scope.proveedorSeleccionado = {};
	$rootScope.proveedorSeleccionado = {};

	API.getProveedores(function(result){
		$scope.proveedores = result;
		$scope.proveedoresFiltrados = $scope.proveedores;
	}, function(error) {
		console.log('la promesa se ha rechazado ' + error);
		$scope.errormessage = error;
	});;
	
	$scope.terminarPedido = function(){
		
		if(!angular.equals($scope.proveedorSeleccionado,{})){
			$rootScope.proveedorSeleccionado = $scope.proveedorSeleccionado.opcionSeleccionada;
			
			var fecha = ($filter('date')(new Date(), "dd/MM/yyyy"))
			var producto = $rootScope.productosSeleccionadosPedidos;
			for(var i = 0; i < producto.length; i++){
				producto[i].cantidad = producto[i].cantidadSeleccionados;
			}
			console.log($rootScope.totalPedidos);
			var total = $rootScope.totalPedidos;
			var proveedor = angular.fromJson($rootScope.proveedorSeleccionado);
			var estado = true;
			
			API.nuevoPedido(fecha, producto, total, proveedor, estado, function(result){
				console.log(result.message);
				$ionicPopup.alert({
							title: 'Aviso!',
							template: 'el pedido se registró correctamente!'
				});
				
				$ionicHistory.nextViewOptions({
					disableBack: true
				});
				$state.go("menu.pedidos");
				
			}, function(error) {
				console.log('la promesa se ha rechazado ' + error);
				$scope.errormessage = error;
			});;
		}
		else{
			$ionicPopup.alert({
							title: 'Aviso!',
							template: 'debe seleccionar un proveedor'
						});
		}
	}
	
	$scope.adn = {};
	 $scope.srchchange = function () {

        $scope.proveedoresFiltrados = null;
        var filtervalue = [];
		var serachData=$scope.proveedores;
		console.log(serachData);
        for (var i = 0; i <serachData.length; i++) {

            var fltvar = $filter('uppercase')($scope.adn.item);
            var jsval = $filter('uppercase')(serachData[i].nombre);

            if (jsval.indexOf(fltvar) >= 0) {
                filtervalue.push(serachData[i]);
            }
        }
        console.log(filtervalue);
        $scope.proveedoresFiltrados = filtervalue;

    };

    $scope.ressetserach = function () {

        $scope.adn.item = "";
        $scope.proveedoresFiltrados =$scope.proveedores;
    }


})
   
.controller('pedidosCtrl', function ($scope, $stateParams, $rootScope, $state, $filter, API) {

	$scope.pedidosConfirmados = [];
	$scope.pedidosFiltrados = [];
	var pedidos = [];
	var contador = 0;
	
	API.getPedidosConNombreProveedorOrdenado(function(result){
		console.log('los pedidos se recuperaron con exito');
		console.log(result);
		pedidos = result;
		contador = pedidos.length;
		for(var i = 0; i < pedidos.length; i ++){
			$scope.pedidosConfirmados.push(pedidos[--contador]);
		}
		$scope.pedidosFiltrados=$scope.pedidosConfirmados;
	}, function(error) {
		console.log('la promesa se ha rechazado ' + error);
		$scope.errormessage = error;
	});

	
	
	$scope.nuevoPedido = function(){
		
		$state.go("menu.elijaLosProductosPedidos");
	}
	
	$scope.adn = {};
	 $scope.srchchange = function () {

        $scope.pedidosFiltrados = null;
        var filtervalue = [];
		var serachData=$scope.pedidosConfirmados;
		console.log(serachData);
        for (var i = 0; i <serachData.length; i++) {

            var fltvar = $filter('uppercase')($scope.adn.item);
            var jsval = $filter('uppercase')(serachData[i].proveedor.nombre);

            if (jsval.indexOf(fltvar) >= 0) {
                filtervalue.push(serachData[i]);
            }
        }
        console.log(filtervalue);
        $scope.pedidosFiltrados = filtervalue;

    };

    $scope.ressetserach = function () {

        $scope.adn.item = "";
        $scope.pedidosFiltrados =$scope.pedidosConfirmados;
    }
	
	$scope.verDetallePedido = function(pedido){
			console.log("paso");
			$rootScope.pedidoDetallado = pedido;
			console.log(pedido);
			console.log(".-----------------------------------------------------------------")
			$state.go('menu.detallesPedido');
	}


})
   
.controller('detallesPedidoCtrl', function ($scope, $stateParams, $state, $rootScope, $ionicHistory, $ionicPopup, API) {

	$scope.nombreProveedorPedido = "";
	$scope.fechaPedido = "";
	$scope.totalPedido = "";
	$scope.productos = [];
	
	if($rootScope.pedidoDetallado != null){
		$scope.nombreProveedorPedido = "Nombre: " + $rootScope.pedidoDetallado.proveedor.nombre;
		$scope.fechaPedido = "Fecha: " + $rootScope.pedidoDetallado.fecha;
		$scope.totalPedido = "Total: " + $rootScope.pedidoDetallado.total;
		$scope.productos = $rootScope.pedidoDetallado.producto;
		console.log($scope.productos);
		$scope.eliminarPedido = function(){
			
			
			API.eliminarPedido($rootScope.pedidoDetallado, function(result){
			
			$ionicPopup.alert({
							title: 'Aviso',
							template: "El pedido fue eliminado"
			});
			$ionicHistory.nextViewOptions({
				disableBack: true
			});
			$state.go("menu.pedidos");
			}, function(error) {
			$ionicPopup.alert({
							title: 'Error',
							template: error
			});
			console.log('la promesa se ha rechazado ' + error);
			$scope.errormessage = error;
		});
			
		}
	
		
	}
	else{
		console.log("no hay pedido");
	}

})
   
.controller('ventasConfirmadasCtrl', function (API, $scope, $stateParams, $filter, $state, $rootScope) {
	
	$scope.ventasConfirmadas = [];
	$scope.ventasConfirmadasFiltradas = [];
	var ventas = [];
	var contador;
	
	API.getVentasConfirmadasConNombreClienteOrdenado(function(result){
		console.log('las ventas se recuperaron con exito');
        ventas = result;
		console.log(result);
		contador = ventas.length;
		for(var i = 0; i < ventas.length; i ++){
			$scope.ventasConfirmadas.push(ventas[--contador]);
		}
		$scope.ventasConfirmadasFiltradas = $scope.ventasConfirmadas;
	}, function(error) {
		console.log('la promesa se ha rechazado ' + error);
		$scope.errormessage = error;
	});
	
	$scope.adn = {};
	 $scope.srchchange = function () {

        $scope.ventasConfirmadasFiltradas = null;
        var filtervalue = [];
		var serachData=$scope.ventasConfirmadas;
		console.log(serachData);
        for (var i = 0; i <serachData.length; i++) {

            var fltvar = $filter('uppercase')($scope.adn.item);
            var jsval = $filter('uppercase')(serachData[i].cliente.nombre + " " + serachData[i].cliente.apellido);

            if (jsval.indexOf(fltvar) >= 0) {
                filtervalue.push(serachData[i]);
            }
        }
        console.log(filtervalue);
        $scope.ventasConfirmadasFiltradas = filtervalue;

    };

    $scope.ressetserach = function () {

        $scope.adn.item = "";
        $scope.ventasConfirmadasFiltradas = $scope.ventasConfirmadas;
    }
	
	$scope.verDetalleVenta = function(venta){
		$rootScope.ventaDetallada = venta;
		$state.go('menu.detalleVenta');
	}
	


})
   
.controller('detalleVentaCtrl', function ($scope, $stateParams, $rootScope, $state, $ionicHistory, $ionicPopup, API) {

	$scope.nombreClienteVenta = "";
	$scope.fechaVenta = "";
	$scope.totalVenta = "";
	$scope.productos = [];
	
	if($rootScope.ventaDetallada != null){
		$scope.nombreClienteVenta = "Nombre: " + $rootScope.ventaDetallada.cliente.nombre + " " + $rootScope.ventaDetallada.cliente.apellido;
		$scope.fechaVenta = "Fecha: " + $rootScope.ventaDetallada.fecha;
		$scope.totalVenta = "Total: " + $rootScope.ventaDetallada.total;

		angular.extend($scope, {
			center: {
				lat: -33.20,
				lng: -66.30,
				zoom: 14
			},
			markers: {
				osloMarker: {
					lat: -33.20,
					lng: -66.30,   
					message: "Arrastra el marcado hacia el punto de venta!",
					focus: true,
					draggable: true
				}
			},
			defaults: {
				scrollWheelZoom: true
			}
		});
	
		$scope.productos = $rootScope.ventaDetallada.producto;
		$scope.markers = $rootScope.ventaDetallada.marcador;
		$scope.center = $rootScope.ventaDetallada.centrado;
		
		$scope.eliminarVenta = function(){
			
			
			API.eliminarVenta($rootScope.ventaDetallada, function(result){
			
			$ionicPopup.alert({
							title: 'Aviso',
							template: "la venta fue eliminada"
			});
			$ionicHistory.nextViewOptions({
				disableBack: true
			});
			$state.go("menu.perfil");
			}, function(error) {
			$ionicPopup.alert({
							title: 'Error',
							template: error
			});
			console.log('la promesa se ha rechazado ' + error);
			$scope.errormessage = error;
		});
			
		}
	}
	else{
		console.log("no hay venta");
	}
	

})
   
.controller('ventasPendientesCtrl', function ($scope, $stateParams, API, $filter, $ionicPopup, $rootScope, $state) {

	$scope.ventasPendientes = [];
	$scope.ventasPendientesFiltradas = [];
	var ventas = [];
	var contador;
	
	API.getVentasNoConfirmadasConNombreClienteOrdenado(function(result){
		console.log('las ventas se recuperaron con exito');
		console.log(result);
        ventas = result;
		contador = ventas.length;
		for(var i = 0; i < ventas.length; i ++){
			$scope.ventasPendientes.push(ventas[--contador]);
		}
		$scope.ventasPendientesFiltradas = $scope.ventasPendientes
	}, function(error) {
		console.log('la promesa se ha rechazado ' + error);
		$scope.errormessage = error;
	});
	
	
	$scope.eliminarVentaNoConfirmada = function(venta){
		
		API.eliminarVentaNoConfirmada(venta, function(result){
			
			$ionicPopup.alert({
							title: 'Aviso',
							template: "la venta pendiente fue cancelada"
			});
			for(var i = 0; i < $scope.ventasPendientesFiltradas.length; i++){
				if($scope.ventasPendientesFiltradas[i]._id == venta._id){
					$scope.ventasPendientesFiltradas.splice(i, 1);
				}
			}
			for(var i = 0; i < $scope.ventasPendientes.length; i++){
				if($scope.ventasPendientes[i]._id == venta._id){
					$scope.ventasPendientes.splice(i, 1);
				}
			}
		
		}, function(error) {
			$ionicPopup.alert({
							title: 'Error',
							template: error
			});
			console.log('la promesa se ha rechazado ' + error);
			$scope.errormessage = error;
		});
		
	}
	
	$scope.confirmarVenta = function(venta){
		
		API.confirmarVenta(venta, function(result){
			
			$ionicPopup.alert({
							title: 'Aviso',
							template: "la venta fue confirmada!"
			});
			
			for(var i = 0; i < $scope.ventasPendientesFiltradas.length; i++){
				if($scope.ventasPendientesFiltradas[i]._id == venta._id){
					$scope.ventasPendientesFiltradas.splice(i, 1);
				}
			}
			for(var i = 0; i < $scope.ventasPendientes.length; i++){
				if($scope.ventasPendientes[i]._id == venta._id){
					$scope.ventasPendientes.splice(i, 1);
				}
			}
		
		}, function(error) {
			console.log('la promesa se ha rechazado ' + error);
			$scope.errormessage = error;
			$ionicPopup.alert({
							title: 'Error',
							template: error
			});
		});
		
	}
	
	$scope.adn = {};
	 $scope.srchchange = function () {

        $scope.ventasPendientesFiltradas = null;
        var filtervalue = [];
		var serachData=$scope.ventasPendientes;
		console.log(serachData);
        for (var i = 0; i <serachData.length; i++) {

            var fltvar = $filter('uppercase')($scope.adn.item);
            var jsval = $filter('uppercase')(serachData[i].cliente.nombre + "" +serachData[i].cliente.apellido);

            if (jsval.indexOf(fltvar) >= 0) {
                filtervalue.push(serachData[i]);
            }
        }
        console.log(filtervalue);
        $scope.ventasPendientesFiltradas = filtervalue;

    };

    $scope.ressetserach = function () {

        $scope.adn.item = "";
        $scope.ventasPendientesFiltradas =$scope.ventasPendientes;
    }

	
	/*$scope.verDetalleVenta = function(venta){
		$rootScope.ventaDetallada = venta;
		$state.go('menu.detalleVenta');
	}*/


})
   
.controller('productosCtrl', function ($scope, $stateParams, $rootScope, $state, $ionicPopup, API, $filter) {
	
	$scope.productos = [];
	$scope.productosFiltrados = [];
	$rootScope.modificarProducto = [];
	var productos = [];
	var contador;
	
	API.getProductos(function(result){
		console.log('Los productos se recuperaron con exito');
        productos = result;
		console.log(result);
		contador = productos.length;
		for(var i = 0; i < productos.length; i ++){
			$scope.productos.push(productos[--contador]);
		}
		$scope.productosFiltrados = $scope.productos;
	}, function(error) {
		console.log('la promesa se ha rechazado ' + error);
		$scope.errormessage = error;
	});
	
	$scope.nuevoProducto = function(){
		
		$state.go("menu.nuevoProducto");
	}
	
	var confirmPopup;
	
	$scope.eliminarProducto = function(producto){
		
		confirmPopup = $ionicPopup.confirm({
			title: 'Confirmar',
			template: 'Esta seguro que desea eliminar este producto?'
		});
		
		confirmPopup.then(function(res) {
				if(res) {
					API.eliminarProducto(producto._id, function(result){
						for(var i = 0; i < $scope.productosFiltrados.length; i++){
							if($scope.productosFiltrados[i]._id == producto._id){
								$scope.productosFiltrados.splice(i, 1);
							}
						}
						for(var i = 0; i < $scope.productos.length; i++){
							if($scope.productos[i]._id == producto._id){
								$scope.productos.splice(i, 1);
							}
						}
						$ionicPopup.alert({
							title: 'Producto eliminado',
							template: result.message
						});
						
					}, function(error) {
						$ionicPopup.alert({
							title: 'Error',
							template: error
						});
						console.log('la promesa se ha rechazado ' + error);
						$scope.errormessage = error
					});
				} 
			});
	}
	
	$scope.modificarProducto = function(producto){
		$rootScope.producto = producto;
		$state.go("menu.infoProducto");
	}
	
	$scope.adn = {};
	 $scope.srchchange = function () {

        $scope.productosFiltrados = null;
        var filtervalue = [];
		var serachData=$scope.productos;
		console.log(serachData);
        for (var i = 0; i <serachData.length; i++) {

            var fltvar = $filter('uppercase')($scope.adn.item);
            var jsval = $filter('uppercase')(serachData[i].nombre);

            if (jsval.indexOf(fltvar) >= 0) {
                filtervalue.push(serachData[i]);
            }
        }
        console.log(filtervalue);
        $scope.productosFiltrados = filtervalue;

    };

    $scope.ressetserach = function () {

        $scope.adn.item = "";
        $scope.productosFiltrados =$scope.productos;
    }

})
   
.controller('nuevoProductoCtrl', function ($scope, $stateParams, API, $ionicPopup) {
	
	$scope.nuevoProducto = function(nombre, descripcion, precioVenta, precioCompra, cantidad,categoria) {

        API.nuevoProducto(nombre, descripcion, precioVenta, precioCompra, cantidad, categoria, function(result){
        console.log(result.message);
		$ionicPopup.alert({
			title: 'Aviso',
			template: "El producto se cargo correctamente!"
		});
      }, function(error) {
        $scope.errormessage = error;
        console.log("error traje esto: "+ error);
      }
      );

  }

})

.controller('infoProductoCtrl', function ($scope, $stateParams, API, $ionicPopup, $rootScope, $state) {
	
	
	$scope.nombreProducto = "";
	$scope.descripcionProducto = "";
	$scope.precioVentaProducto = "";
	$scope.precioCompraProducto = "";
	$scope.cantidadProducto = "";
	$scope.categoriaProducto = "";
	
	if($rootScope.producto != null){
		
		$scope.nombreProducto = $rootScope.producto.nombre;
		$scope.descripcionProducto = $rootScope.producto.descripcion;
		$scope.precioVentaProducto = $rootScope.producto.precioVenta;
		$scope.precioCompraProducto = $rootScope.producto.precioCompra;
		$scope.cantidadProducto = $rootScope.producto.cantidad;
		$scope.categoriaProducto = $rootScope.producto.categoria;
	}
	else{
		console.log("no hay producto");
	}
	
	$scope.guardarCambios = function(nombreProducto, descripcionProducto, precioVentaProducto, precioCompraProducto, cantidadProducto, categoriaProducto){
		
		if($rootScope.producto != null){
			API.actualizarProducto($rootScope.producto._id, nombreProducto, descripcionProducto, precioVentaProducto, precioCompraProducto, cantidadProducto, categoriaProducto,
			function(result){
				console.log(result.message);
				$ionicPopup.alert({
					title: 'Aviso',
					template: "El producto se actualizo correctamente!"
				});

			}, function(error) {
				console.log('la promesa se ha rechazado ' + error);
				$scope.errormessage = error;
				$ionicPopup.alert({
					title: 'Error',
					template: error
					});
			});
		}
		else{
			console.log("no hay producto");
		}
	}
	
	

})

.controller('signupCtrl', function ($scope, $stateParams, API, $state, $ionicPopup, $ionicHistory) {


	$scope.signup = function(nombre, apellido, user, pass) {

		    API.signUp(nombre, apellido, user, pass, function(result){
				console.log(result.message);
				$ionicPopup.alert({
							title: 'Aviso!',
							template: result.message
						});
				$ionicHistory.nextViewOptions({
					disableBack: true
				});
				$state.go("login");
				
			}, function(error) {
				$scope.errormessage = error;
				$ionicPopup.alert({
							title: 'Error!',
							template: error
						});
				console.log("error, la api retorno : "+ error);
			}	
			);
		
	}
	
	$scope.irLogin = function(){
		
		$ionicHistory.nextViewOptions({
					disableBack: true
		});
		$state.go("login");
		
	}


})

.controller('loginCtrl', function ($scope, $state,$rootScope, API, $ionicPopup, $ionicHistory) {
	
	$rootScope.token = "";
	$rootScope.usuario = {};
	
	$scope.login = function(user, pass) {

		    API.logIn(user, pass, function(result){
				$rootScope.token = result.token;
				$rootScope.usuario = result.user;
				console.log("token devuelto: "+ result.token);
				$state.go('menu.perfil');
			}, function(error) {
				$scope.errormessage = error;
				$ionicPopup.alert({
							title: 'Error!',
							template: error
						});
				console.log("error, la api retorno : "+ error);
			}	
			);
		
	}
	
	$scope.irSignUp = function(){
		
		$ionicHistory.nextViewOptions({
			disableBack: true
		});
		$state.go("signup");
		
	}

})


.factory('API', function($http, $rootScope, $q, $filter) {
	var deferred = $q.defer();
	return {
		
		
		// pasandole 2 callback 
		logIn: function(user, pass, cexito, cerror){
			
			var data = {
				"user": user,
				"pass": pass
			};
 
			$http.post('http://localhost:8080/autentificacion',data).success(function(response){
		  
				if (response.success) {
					cexito(response);
				} else {
					cerror(response.message);
				}
				
			});
			
		},
		
		signUp: function(nombre, apellido, user, pass, cexito, cerror){
			
			var data = {
				"nombre": nombre,
				"apellido": apellido,
				"user": user,
				"pass": pass
			};
 
			$http.post('http://localhost:8080/registro',data).success(function(response){
		  
				if (response.success) {
					cexito(response);
				} else {
					cerror(response.message);
				}
				
			});
			
		},
		// usando patron promise-deferred
		getProductosDeferred: function(){
			
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
		
		getProductos: function(cexito, cerror){
			
			if($rootScope != null && $rootScope != "")
			{
				$http.post('http://localhost:8080/api/producto/listar?token=' + $rootScope.token).success(function(response){
					
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
		
		getProductosConStock: function(cexito, cerror){
			
			if($rootScope != null && $rootScope != "")
			{
				$http.post('http://localhost:8080/api/productosConStock?token=' + $rootScope.token).success(function(response){
					
					if (response.success) {
						response.res.forEach(function (itemProducto) {
							itemProducto.cantidadSeleccionados = 0;
						});
						console.log(response);
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
		
		getProveedores: function(cexito, cerror){
			
			if($rootScope != null && $rootScope != "")
			{
				$http.post('http://localhost:8080/api/proveedor/listar?token=' + $rootScope.token).success(function(response){
					
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
		
		getVentasConfirmadasConNombreClienteOrdenado: function(cexito, cerror){
			if($rootScope != null && $rootScope != "")
			{
				$http.post('http://localhost:8080/api/ventasOrdenadasConfirmadas?token=' + $rootScope.token).success(function(responseVenta){
					if (responseVenta.success) {
							responseVenta.res.forEach(function (itemVenta) {
								itemVenta.fecha = $filter('date')(itemVenta.fecha, "dd/MM/yyyy");	
							});
							cexito(responseVenta.res)
					} else{
							cerror(responseVenta.message);
					}
				});
			}
			else{
				cerror("conexion perdida");
			}
			
		},
		
		getVentasNoConfirmadasConNombreClienteOrdenado: function(cexito, cerror){
			if($rootScope != null && $rootScope != "")
			{
				$http.post('http://localhost:8080/api/ventasOrdenadasNoConfirmadas?token=' + $rootScope.token).success(function(responseVenta){
					if (responseVenta.success) {
						responseVenta.res.forEach(function (itemVenta) {
							itemVenta.fecha = $filter('date')(itemVenta.fecha, "dd/MM/yyyy");
						});
						cexito(responseVenta.res)
						
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
				$http.post('http://localhost:8080/api/pedidosOrdenadosConfirmados?token=' + $rootScope.token).success(function(responsePedido){
					if (responsePedido.success) {
							responsePedido.res.forEach(function (itemPedido) {
								itemPedido.fecha = $filter('date')(itemPedido.fecha, "dd/MM/yyyy");			
							});
						cexito(responsePedido.res)

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
				$http.post('http://localhost:8080/api/ventasOrdenadasConfirmadas?token=' + $rootScope.token).success(function(responseVenta){
					
					if (responseVenta.success) {
						
						if($rootScope != null && $rootScope != "")
						{
							$http.post('http://localhost:8080/api/pedidosOrdenadosConfirmados?token=' + $rootScope.token).success(function(responsePedido){
					
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
				$http.post('http://localhost:8080/api/ventasOrdenadasConfirmadas?token=' + $rootScope.token).success(function(responseVenta){
					
					if (responseVenta.success) {
						
						if($rootScope != null && $rootScope != "")
						{
							$http.post('http://localhost:8080/api/pedidosOrdenadosConfirmados?token=' + $rootScope.token).success(function(responsePedido){
					
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
				$http.post('http://localhost:8080/api/ventasOrdenadasConfirmadas?token=' + $rootScope.token).success(function(responseVenta){
					
					if (responseVenta.success) {
						
						if($rootScope != null && $rootScope != "")
						{
							$http.post('http://localhost:8080/api/pedidosOrdenadosConfirmados?token=' + $rootScope.token).success(function(responsePedido){
					
								if (responsePedido.success) {
									
									var totalVentas = 0;
									var totalPedidos = 0;
									for(var i = 0; i < responseVenta.res.length; i++){
										if(($filter('date')(responseVenta.res[i].fecha, "MM/yyyy")) == ($filter('date')(new Date(), "MM/yyyy"))){
											if(($filter('date')(new Date(), "EEEE")) == "Monday"){					
												if(($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Monday" ){
													totalVentas = totalVentas + responseVenta.res[i].total;
												}
											}
											else if(($filter('date')(new Date(), "EEEE")) == "Tuesday"){
											if(($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Monday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Tuesday" ){
													totalVentas = totalVentas + responseVenta.res[i].total;
												}
											}
											else if(($filter('date')(new Date(), "EEEE")) == "Wednesday"){
												if(($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Monday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Tuesday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Wednesday"){
													totalVentas = totalVentas + responseVenta.res[i].total;
												}
											}
											else if(($filter('date')(new Date(), "EEEE")) == "Thursday"){
												if(($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Monday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Tuesday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Wednesday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Thursday"){
													totalVentas = totalVentas + responseVenta.res[i].total;
												}
											}
											else if(($filter('date')(new Date(), "EEEE")) == "Friday"){
												if(($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Monday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Tuesday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Wednesday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Thursday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Friday"){
													totalVentas = totalVentas + responseVenta.res[i].total;
												}
											}
											else if(($filter('date')(new Date(), "EEEE")) == "Saturday"){
												if(($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Monday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Tuesday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Wednesday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Thursday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Friday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Saturday"){
													totalVentas = totalVentas + responseVenta.res[i].total;
												}
											}
											else{
												if(($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Monday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Tuesday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Wednesday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Thursday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Friday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Saturday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Sunday"){
													totalVentas = totalVentas + responseVenta.res[i].total;
												}
											}
										}
									}
									for(var i = 0; i < responsePedido.res.length; i++){
										if(($filter('date')(responsePedido.res[i].fecha, "MM/yyyy")) == ($filter('date')(new Date(), "MM/yyyy"))){
											if(($filter('date')(new Date(), "EEEE")) == "Monday"){					
												if(($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Monday" ){
													totalPedidos = totalPedidos+ responsePedido.res[i].total;
												}
											}
											else if(($filter('date')(new Date(), "EEEE")) == "Tuesday"){
											if(($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Monday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Tuesday" ){
													totalPedidos = totalPedidos+ responsePedido.res[i].total;
												}
											}
											else if(($filter('date')(new Date(), "EEEE")) == "Wednesday"){
												if(($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Monday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Tuesday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Wednesday"){
													totalPedidos = totalPedidos+ responsePedido.res[i].total;
												}
											}
											else if(($filter('date')(new Date(), "EEEE")) == "Thursday"){
												if(($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Monday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Tuesday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Wednesday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Thursday"){
													totalPedidos = totalPedidos+ responsePedido.res[i].total;
												}
											}
											else if(($filter('date')(new Date(), "EEEE")) == "Friday"){
												if(($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Monday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Tuesday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Wednesday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Thursday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Friday"){
													totalPedidos = totalPedidos+ responsePedido.res[i].total;
												}
											}
											else if(($filter('date')(new Date(), "EEEE")) == "Saturday"){
												if(($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Monday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Tuesday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Wednesday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Thursday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Friday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Saturday"){
													totalPedidos = totalPedidos+ responsePedido.res[i].total;
												}
											}
											else{
												if(($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Monday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Tuesday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Wednesday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Thursday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Friday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Saturday" || ($filter('date')(responseVenta.res[i].fecha, "EEEE")) == "Sunday"){
													totalPedidos = totalPedidos+ responsePedido.res[i].total;
												}
											}
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
		
		eliminarVentaNoConfirmada: function(venta, cexito, cerror){
			if($rootScope != null && $rootScope != "")
			{
				console.log(venta);
				var data = {
					"id": venta._id
				};
				$http.post('http://localhost:8080/api/venta/eliminar?token=' + $rootScope.token, data).success(function(response){
					
					if (response.success) {
						cexito(response)
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
		
		eliminarVenta: function(venta, cexito, cerror){
			if($rootScope != null && $rootScope != "")
			{
				console.log(venta);
				var data = {
					"id": venta._id
				};
				$http.post('http://localhost:8080/api/venta/eliminar?token=' + $rootScope.token, data).success(function(response){
					
					if (response.success) {
						cexito(response)
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
		
		eliminarPedido: function(pedido, cexito, cerror){
			if($rootScope != null && $rootScope != "")
			{
				console.log(pedido);
				var data = {
					"id": pedido._id
				};
				$http.post('http://localhost:8080/api/pedido/eliminar?token=' + $rootScope.token, data).success(function(response){
					
					if (response.success) {
						cexito(response)
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
		
		confirmarVenta: function(venta, cexito, cerror){
			if($rootScope != null && $rootScope != "")
			{
				var data = {
					"id": venta._id,
					"fecha" : venta.fecha,
					"producto" : venta.producto,
					"total" : venta.total,
					"marcador" : venta.marcador,
					"centrado" : venta.centrado,
					"cliente" : venta.cliente,
					"estado" : true
					
				};
				$http.post('http://localhost:8080/api/venta/actualizar?token=' + $rootScope.token, data).success(function(response){
					
					if (response.success) {
						cexito(response)
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
		
		actualizarProveedor: function(id, nombre, direccion, cuit, telefono, cexito, cerror){
			if($rootScope != null && $rootScope != "")
			{
				var data = {
					"id" : id,
					"nombre": nombre,
					"direccion": direccion,
					"cuit": cuit,
					"telefono": telefono
				};
				$http.post('http://localhost:8080/api/proveedor/actualizar?token=' + $rootScope.token, data).success(function(response){
					
					if (response.success) {
						cexito(response)
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
		
		actualizarCliente: function(id, nombre, apellido, dni, direccion, telefono, cexito, cerror){
			if($rootScope != null && $rootScope != "")
			{
				var data = {
					"id" : id,
					"nombre": nombre,
					"apellido": apellido,
					"dni": dni,
					"direccion": direccion,
					"telefono": telefono
				};
				$http.post('http://localhost:8080/api/cliente/actualizar?token=' + $rootScope.token, data).success(function(response){
					
					if (response.success) {
						cexito(response)
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
		
		actualizarProducto: function(id, nombre, descripcion, precioVenta, precioCompra, cantidad, categoria, cexito, cerror){
			if($rootScope != null && $rootScope != "")
			{
				var data = {
					"id" : id,
					"nombre" : nombre,
					"descripcion" : descripcion,
					"precioVenta" : precioVenta,
					"precioCompra" : precioCompra,
					"cantidad" : cantidad,
					"categoria" : categoria
				};
				$http.post('http://localhost:8080/api/producto/actualizar?token=' + $rootScope.token, data).success(function(response){
					
					if (response.success) {
						cexito(response)
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
		
		actualizarUsuario: function(id, nombre, apellido, user, pass, cexito, cerror){
			if($rootScope != null && $rootScope != "")
			{
				var data = {
					"id" : id,
					"nombre": nombre,
					"apellido": apellido,
					"user": user,
					"pass": pass
				};
				$http.post('http://localhost:8080/api/usuario/actualizar?token=' + $rootScope.token, data).success(function(response){
					
					if (response.success) {
						cexito(response)
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
		
		nuevoProveedor: function(nombre, direccion, cuit, telefono, cexito, cerror){
			if($rootScope != null && $rootScope != "")
			{
				var data = {
					"nombre": nombre,
					"direccion": direccion,
					"cuit": cuit,
					"telefono": telefono
				};
				$http.post('http://localhost:8080/api/proveedor/insertar?token=' + $rootScope.token, data).success(function(response){
					
					if (response.success) {
						cexito(response)
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
		
		nuevoCliente: function(nombre, apellido, dni, direccion, telefono, cexito, cerror){
			if($rootScope != null && $rootScope != "")
			{
				var data = {
					"nombre": nombre,
					"apellido": apellido,
					"dni": dni,
					"direccion": direccion,
					"telefono": telefono
				};
				$http.post('http://localhost:8080/api/cliente/insertar?token=' + $rootScope.token, data).success(function(response){
					
					if (response.success) {
						cexito(response)
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
		
		eliminarProveedor: function(id, cexito, cerror){
			if($rootScope != null && $rootScope != "")
			{
				var data = {
					"id" : id
				};
				$http.post('http://localhost:8080/api/proveedor/eliminar?token=' + $rootScope.token, data).success(function(response){
					
					if (response.success) {
						cexito(response)
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
		
		eliminarCliente: function(id, cexito, cerror){
			if($rootScope != null && $rootScope != "")
			{
				var data = {
					"id" : id
				};
				$http.post('http://localhost:8080/api/cliente/eliminar?token=' + $rootScope.token, data).success(function(response){
					
					if (response.success) {
						cexito(response)
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
		
		eliminarProducto: function(id, cexito, cerror){
			if($rootScope != null && $rootScope != "")
			{
				var data = {
					"id" : id
				};
				$http.post('http://localhost:8080/api/producto/eliminar?token=' + $rootScope.token, data).success(function(response){
					
					if (response.success) {
						cexito(response)
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
		
		nuevaVenta: function(fecha, producto, total, marcador, centrado, cliente, estado, cexito, cerror){
			if($rootScope != null && $rootScope != "")
			{
				var data = {
					"fecha" : fecha,
					"producto" : producto,
					"total" : total,
					"marcador" : marcador,
					"centrado" : centrado,
					"cliente" : cliente,
					"estado" : estado
				};
				$http.post('http://localhost:8080/api/venta/insertar?token=' + $rootScope.token, data).success(function(response){
					
					if (response.success) {
						cexito(response)
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
		
		nuevoPedido: function(fecha, producto, total, proveedor, estado, cexito, cerror){
			if($rootScope != null && $rootScope != "")
			{
				var data = {
					"fecha" : fecha,
					"producto" : producto,
					"total" : total,
					"proveedor" : proveedor,
					"estado" : estado
				};
				$http.post('http://localhost:8080/api/pedido/insertar?token=' + $rootScope.token, data).success(function(response){
					
					if (response.success) {
						cexito(response)
					} else {
						cerror(response.message);
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






 