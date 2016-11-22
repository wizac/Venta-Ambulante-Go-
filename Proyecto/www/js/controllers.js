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
   
.controller('elijaLosProductosCtrl', function ($scope, $stateParams, $rootScope, $state, API) {
	
	$scope.productosStock = [];
	$rootScope.productosSeleccionados = [];
	
	API.getProductosConStock(function(result){
		
		$scope.productosStock = result;
		
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


})
   
.controller('confirmarProductosCtrl', function ($scope, $stateParams, $rootScope) {
	
	
	$scope.productosSeleccionados = $rootScope.productosSeleccionados;
	
	$scope.agregarProductoSeleccionado = function(producto){
		for(var i = 0; i < $scope.productosSeleccionados.length; i ++){
			if($scope.productosSeleccionados[i]._id == producto._id){
				if($scope.productosSeleccionados[i].cantidad > $scope.productosSeleccionados[i].cantidadSeleccionados){
					$scope.productosStock[i].cantidadSeleccionados += 1;
				}
			}
			$rootScope.productosSeleccionados = $scope.productosSeleccionados;
		}
		
		var precioTotal = 0;
		for(var i = 0; i < $scope.productosSeleccionados.length; i ++){
			precioTotal += ($scope.productosSeleccionados[i].precioVenta * $scope.productosSeleccionados[i].cantidadSeleccionados);
		}
		$scope.precioTotal = "Precio total: $" + precioTotal;
		
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
		
		var precioTotal = 0;
		for(var i = 0; i < $scope.productosSeleccionados.length; i ++){
			precioTotal += ($scope.productosSeleccionados[i].precioVenta * $scope.productosSeleccionados[i].cantidadSeleccionados);
		}
		$scope.precioTotal = "Precio total: $" + precioTotal;
	}

	var precioTotal = 0;
	for(var i = 0; i < $scope.productosSeleccionados.length; i ++){
		precioTotal += ($scope.productosSeleccionados[i].precioVenta * $scope.productosSeleccionados[i].cantidadSeleccionados)
	}
	$scope.precioTotal = "Precio total: $" + precioTotal;

})
   
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
	
		
	API.getVentasConfirmadasConNombreClienteOrdenado(function(result){
		console.log('las ventas con nombre del cliente se recuperaron con exito');
		var dia = new Date();
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
   
.controller('clientesCtrl', function ($scope, $stateParams,$rootScope, $state, API) {
	
	
	$scope.clientes = [];
	$rootScope.cliente;

	API.getClientes(function(result){
		$scope.clientes = result;
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
			console.log($scope.nombreCliente);
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
   
.controller('proveedoresCtrl', function ($scope, $stateParams,$rootScope, $state, API) {

	$scope.proveedores = [];
	$rootScope.proveedor;

	API.getProveedores(function(result){
		$scope.proveedores = result;
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
				$state.go("menu.proveedor");
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
   
.controller('pedidosCtrl', function ($scope, $stateParams, $rootScope, $state, API) {

	var cantidadVisiblesPedidosConfirmados = 0;
	var cantidadVerMas = 5;
	var cantidadVerMenos = 5;
	$scope.pedidosConfirmados = [];
	var pedidos = [];
	var contador;
	
	API.getPedidosConNombreProveedorOrdenado(function(result){
		console.log('los pedidos se recuperaron con exito');
        pedidos = result;
		console.log(result);
		contador = pedidos.length;
		for(var i = 0; i < 5; i ++){
			if(cantidadVisiblesPedidosConfirmados + 1 <= pedidos.length){
				$scope.pedidosConfirmados.push(pedidos[--contador]);
				cantidadVisiblesPedidosConfirmados = cantidadVisiblesPedidosConfirmados + 1;
			}
		}
	}, function(error) {
		console.log('la promesa se ha rechazado ' + error);
		$scope.errormessage = error;
	});
	
	
	$scope.verMasPedidos = function(){
			if((cantidadVisiblesPedidosConfirmados + cantidadVerMas) <= pedidos.length){
				for(var cant = cantidadVerMas; cant > 0; cant--){
						$scope.pedidosConfirmados.push(pedidos[(pedidos.length - 1) - cantidadVisiblesPedidosConfirmados]);
						cantidadVisiblesPedidosConfirmados = cantidadVisiblesPedidosConfirmados + 1;
				}
			}
			else
			{
				copiaCantVerMas = cantidadVerMas;
				do {
					if(--copiaCantVerMas > 0 && (cantidadVisiblesPedidosConfirmados + copiaCantVerMas) <= pedidos.length)
					{
						for(var cant = copiaCantVerMas; cant > 0; cant--){
							$scope.pedidosConfirmados.push(pedidos[(pedidos.length - 1) - cantidadVisiblesPedidosConfirmados]);
							cantidadVisiblesPedidosConfirmados = cantidadVisiblesPedidosConfirmados + 1;
						}
					}
				}
				while (copiaCantVerMas > 0 && (cantidadVisiblesPedidosConfirmados + copiaCantVerMas) > pedidos.length);
			}
	}
	
	$scope.verMenosPedidos = function(){
			if((cantidadVisiblesPedidosConfirmados - cantidadVerMenos) > 0){
				for(var cant = cantidadVerMenos; cant > 0; cant--){
						$scope.pedidosConfirmados.splice($scope.pedidosConfirmados.length - 1, 1);
						cantidadVisiblesPedidosConfirmados = cantidadVisiblesPedidosConfirmados - 1;
				}
			}
			else
			{
				copiaCantVerMenos = cantidadVerMenos;
				do {
					if(--copiaCantVerMenos > 0 && (cantidadVisiblesPedidosConfirmados - copiaCantVerMenos) > 0)
					{
						for(var cant = copiaCantVerMenos; cant > 0; cant--){
							$scope.pedidosConfirmados.splice($scope.pedidosConfirmados.length - 1, 1);
							cantidadVisiblesPedidosConfirmados = cantidadVisiblesPedidosConfirmados - 1;
						}
					}
				}
				while (copiaCantVerMenos > 0 && (cantidadVisiblesPedidosConfirmados - copiaCantVerMenos) < 1);
			}
	}
	
	$scope.nuevoPedido = function(){
		
		$state.go("menu.nuevoPedido");
	}

})
   
.controller('detallesPedidoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('ventasConfirmadasCtrl', function (API, $scope, $stateParams) {
	
	var cantidadVisiblesVentasConfirmadas = 0;
	var cantidadVerMas = 5;
	var cantidadVerMenos = 5;
	$scope.ventasConfirmadas = [];
	var ventas = [];
	var contador;
	
	API.getVentasConfirmadasConNombreClienteOrdenado(function(result){
		console.log('las ventas se recuperaron con exito');
        ventas = result;
		console.log(result);
		contador = ventas.length;
		for(var i = 0; i < 5; i ++){
			if(cantidadVisiblesVentasConfirmadas + 1 <= ventas.length){
				$scope.ventasConfirmadas.push(ventas[--contador]);
				cantidadVisiblesVentasConfirmadas = cantidadVisiblesVentasConfirmadas + 1;
			}
		}
	}, function(error) {
		console.log('la promesa se ha rechazado ' + error);
		$scope.errormessage = error;
	});
	
	
	$scope.verMasVentasConfirmadas = function(){
			if((cantidadVisiblesVentasConfirmadas + cantidadVerMas) <= ventas.length){
				for(var cant = cantidadVerMas; cant > 0; cant--){
						$scope.ventasConfirmadas.push(ventas[(ventas.length - 1) - cantidadVisiblesVentasConfirmadas]);
						cantidadVisiblesVentasConfirmadas = cantidadVisiblesVentasConfirmadas + 1;
				}
			}
			else
			{
				copiaCantVerMas = cantidadVerMas;
				do {
					if(--copiaCantVerMas > 0 && (cantidadVisiblesVentasConfirmadas + copiaCantVerMas) <= ventas.length)
					{
						for(var cant = copiaCantVerMas; cant > 0; cant--){
							$scope.ventasConfirmadas.push(ventas[(ventas.length - 1) - cantidadVisiblesVentasConfirmadas]);
							cantidadVisiblesVentasConfirmadas = cantidadVisiblesVentasConfirmadas + 1;
						}
					}
				}
				while (copiaCantVerMas > 0 && (cantidadVisiblesVentasConfirmadas + copiaCantVerMas) > ventas.length);
			}
	}
	
	$scope.verMenosVentasConfirmadas = function(){
			if((cantidadVisiblesVentasConfirmadas - cantidadVerMenos) > 0){
				for(var cant = cantidadVerMenos; cant > 0; cant--){
						$scope.ventasConfirmadas.splice($scope.ventasConfirmadas.length - 1, 1);
						cantidadVisiblesVentasConfirmadas = cantidadVisiblesVentasConfirmadas - 1;
				}
			}
			else
			{
				copiaCantVerMenos = cantidadVerMenos;
				do {
					if(--copiaCantVerMenos > 0 && (cantidadVisiblesVentasConfirmadas - copiaCantVerMenos) > 0)
					{
						for(var cant = copiaCantVerMenos; cant > 0; cant--){
							$scope.ventasConfirmadas.splice($scope.ventasConfirmadas.length - 1, 1);
							cantidadVisiblesVentasConfirmadas = cantidadVisiblesVentasConfirmadas - 1;
						}
					}
				}
				while (copiaCantVerMenos > 0 && (cantidadVisiblesVentasConfirmadas - copiaCantVerMenos) < 1);
			}
	}
	


})
   
.controller('detalleVentaCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('ventasPendientesCtrl', function ($scope, $stateParams, API) {

var cantidadVisiblesVentasNoConfirmadas = 0;
	var cantidadVerMas = 5;
	var cantidadVerMenos = 5;
	$scope.ventasNoConfirmadas = [];
	var ventas = [];
	var contador;
	
	API.getVentasNoConfirmadasConNombreClienteOrdenado(function(result){
		console.log('las ventas se recuperaron con exito');
        ventas = result;
		console.log(result);
		contador = ventas.length;
		for(var i = 0; i < 5; i ++){
			if(cantidadVisiblesVentasNoConfirmadas + 1 <= ventas.length){
				$scope.ventasNoConfirmadas.push(ventas[--contador]);
				cantidadVisiblesVentasNoConfirmadas = cantidadVisiblesVentasNoConfirmadas + 1;
			}
		}
	}, function(error) {
		console.log('la promesa se ha rechazado ' + error);
		$scope.errormessage = error;
	});
	
	
	$scope.verMasVentasNoConfirmadas = function(){
			if((cantidadVisiblesVentasNoConfirmadas + cantidadVerMas) <= ventas.length){
				for(var cant = cantidadVerMas; cant > 0; cant--){
						$scope.ventasNoConfirmadas.push(ventas[(ventas.length - 1) - cantidadVisiblesVentasNoConfirmadas]);
						cantidadVisiblesVentasNoConfirmadas = cantidadVisiblesVentasNoConfirmadas + 1;
				}
			}
			else
			{
				copiaCantVerMas = cantidadVerMas;
				do {
					if(--copiaCantVerMas > 0 && (cantidadVisiblesVentasNoConfirmadas + copiaCantVerMas) <= ventas.length)
					{
						for(var cant = copiaCantVerMas; cant > 0; cant--){
							$scope.ventasNoConfirmadas.push(ventas[(ventas.length - 1) - cantidadVisiblesVentasNoConfirmadas]);
							cantidadVisiblesVentasNoConfirmadas = cantidadVisiblesVentasNoConfirmadas + 1;
						}
					}
				}
				while (copiaCantVerMas > 0 && (cantidadVisiblesVentasNoConfirmadas + copiaCantVerMas) > ventas.length);
			}
	}
	
	$scope.verMenosVentasNoConfirmadas = function(){
			if((cantidadVisiblesVentasNoConfirmadas - cantidadVerMenos) > 0){
				for(var cant = cantidadVerMenos; cant > 0; cant--){
						$scope.ventasNoConfirmadas.splice($scope.ventasNoConfirmadas.length - 1, 1);
						cantidadVisiblesVentasNoConfirmadas = cantidadVisiblesVentasNoConfirmadas - 1;
				}
			}
			else
			{
				copiaCantVerMenos = cantidadVerMenos;
				do {
					if(--copiaCantVerMenos > 0 && (cantidadVisiblesVentasNoConfirmadas - copiaCantVerMenos) > 0)
					{
						for(var cant = copiaCantVerMenos; cant > 0; cant--){
							$scope.ventasNoConfirmadas.splice($scope.ventasNoConfirmadas.length - 1, 1);
							cantidadVisiblesVentasNoConfirmadas = cantidadVisiblesVentasNoConfirmadas - 1;
						}
					}
				}
				while (copiaCantVerMenos > 0 && (cantidadVisiblesVentasNoConfirmadas - copiaCantVerMenos) < 1);
			}
	}
	
	$scope.eliminarVentaNoConfirmada = function(venta){
		
		API.eliminarVentaNoConfirmada(function(result){
		console.log('las ventas se recuperaron con exito');
        ventas = result;
		console.log(result);
		contador = ventas.length;
		for(var i = 0; i < 5; i ++){
			if(cantidadVisiblesVentasNoConfirmadas + 1 <= ventas.length){
				$scope.ventasNoConfirmadas.push(ventas[--contador]);
				cantidadVisiblesVentasNoConfirmadas = cantidadVisiblesVentasNoConfirmadas + 1;
			}
		}
		}, function(error) {
			console.log('la promesa se ha rechazado ' + error);
			$scope.errormessage = error;
		});
		
	}


})
   
.controller('productosCtrl', function ($scope, $stateParams, $rootScope, $state, $ionicPopup, API) {
	
	var cantidadVisiblesProductos = 0;
	var cantidadVerMas = 5;
	var cantidadVerMenos = 5;
	$scope.productos = [];
	var productos = [];
	var contador;
	
	API.getProductos(function(result){
		console.log('Los productos se recuperaron con exito');
        productos = result;
		console.log(result);
		contador = productos.length;
		for(var i = 0; i < productos.length; i ++){
			if(cantidadVisiblesProductos + 1 <= productos.length){
				$scope.productos.push(productos[--contador]);
				cantidadVisiblesProductos = cantidadVisiblesProductos + 1;
			}
		}
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

})
   
.controller('nuevoProductoCtrl', function ($scope, $stateParams, API) {
	
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

.controller('signupCtrl', function ($scope, $stateParams, API) {


	$scope.signup = function(nombre, apellido, user, pass) {

		    API.signUp(nombre, apellido, user, pass, function(result){
				console.log(result.message);
			}, function(error) {
				$scope.errormessage = error;
				console.log("error traje esto: "+ error);
			}	
			);
		
	}


})

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
				"pass": pass
			};
 
			$http.post('http://localhost:8080/autentificacion',data).success(function(response){
		  
				if (response.success) {
					cexito(response.token);
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
		
		getVentasNoConfirmadasConNombreClienteOrdenado: function(cexito, cerror){
			if($rootScope != null && $rootScope != "")
			{
				$http.post('http://localhost:8080/api/ventasOrdenadasNoConfirmadas?token=' + $rootScope.token).success(function(responseVenta){
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
				$http.post('http://localhost:8080/api/pedidosOrdenadosConfirmados?token=' + $rootScope.token).success(function(responsePedido){
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
				var data = {
					"id": venta._id
				};
				$http.post('http://localhost:8080/api/eliminar/listar?token=' + $rootScope.token, data).success(function(response){
					
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
			
		}
		
		
	}
	
})






 