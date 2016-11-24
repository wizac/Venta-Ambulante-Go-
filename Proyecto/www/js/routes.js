angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.misDatos', {
    url: '/misDatos',
    views: {
      'side-menu21': {
        templateUrl: 'templates/misDatos.html',
        controller: 'misDatosCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('registrarse', {
    url: '/registrarse',
    templateUrl: 'templates/registrarse.html',
    controller: 'registrarseCtrl'
  })

  .state('menu.elijaLosProductos', {
    url: '/elijaLosProductos',
    views: {
      'side-menu21': {
        templateUrl: 'templates/elijaLosProductos.html',
        controller: 'elijaLosProductosCtrl'
      }
    }
  })

  .state('menu.confirmarProductos', {
    url: '/confirmarProductos',
    views: {
      'side-menu21': {
        templateUrl: 'templates/confirmarProductos.html',
        controller: 'confirmarProductosCtrl'
      }
    }
  })
  
  .state('menu.confirmarProductosPedidos', {
    url: '/confirmarProductosPedidos',
    views: {
      'side-menu21': {
        templateUrl: 'templates/confirmarProductosPedidos.html',
        controller: 'confirmarProductosPedidosCtrl'
      }
    }
  })

  .state('menu.elijaCliente', {
    url: '/elijaCliente',
    views: {
      'side-menu21': {
        templateUrl: 'templates/elijaCliente.html',
        controller: 'elijaClienteCtrl'
      }
    }
  })

  .state('menu.elijaPuntoDeVenta', {
    url: '/elijaPuntoDeVenta',
    views: {
      'side-menu21': {
        templateUrl: 'templates/elijaPuntoDeVenta.html',
        controller: 'elijaPuntoDeVentaCtrl'
      }
    }
  })

  .state('menu.perfil', {
    url: '/perfil',
    views: {
      'side-menu21': {
        templateUrl: 'templates/perfil.html',
        controller: 'perfilCtrl'
      }
    }
  })

  .state('menu.modificarDatos', {
    url: '/modificarDatos',
    views: {
      'side-menu21': {
        templateUrl: 'templates/modificarDatos.html',
        controller: 'modificarDatosCtrl'
      }
    }
  })
  
  .state('menu.clientes', {
    url: '/clientes',
    views: {
      'side-menu21': {
        templateUrl: 'templates/clientes.html',
        controller: 'clientesCtrl'
      }
    }
  })

  .state('menu.nuevoCliente', {
    url: '/nuevoCliente',
    views: {
      'side-menu21': {
        templateUrl: 'templates/nuevoCliente.html',
        controller: 'nuevoClienteCtrl'
      }
    }
  })
  
  .state('menu.infoCliente', {
    url: '/infoCliente',
    views: {
      'side-menu21': {
        templateUrl: 'templates/infoCliente.html',
        controller: 'infoClienteCtrl'
      }
    }
  })
  
  .state('menu.infoProducto', {
    url: '/infoProducto',
    views: {
      'side-menu21': {
        templateUrl: 'templates/infoProducto.html',
        controller: 'infoProductoCtrl'
      }
    }
  })

  .state('menu.proveedores', {
    url: '/proveedores',
    views: {
      'side-menu21': {
        templateUrl: 'templates/proveedores.html',
        controller: 'proveedoresCtrl'
      }
    }
  })

  .state('menu.nuevoProveedor', {
    url: '/nuevoProveedor',
    views: {
      'side-menu21': {
        templateUrl: 'templates/nuevoProveedor.html',
        controller: 'nuevoProveedorCtrl'
      }
    }
  })

  .state('menu.infoProveedor', {
    url: '/infoProveedor',
    views: {
      'side-menu21': {
        templateUrl: 'templates/infoProveedor.html',
        controller: 'infoProveedorCtrl'
      }
    }
  })

  .state('menu.elijaLosProductosPedidos', {
    url: '/elijaLosProductosPedidos',
    views: {
      'side-menu21': {
        templateUrl: 'templates/elijaLosProductosPedidos.html',
        controller: 'elijaLosProductosPedidosCtrl'
      }
    }
  })

  .state('menu.elijaProveedor', {
    url: '/elijaProveedor',
    views: {
      'side-menu21': {
        templateUrl: 'templates/elijaProveedor.html',
        controller: 'elijaProveedorCtrl'
      }
    }
  })

  .state('menu.pedidos', {
    url: '/pedidos',
    views: {
      'side-menu21': {
        templateUrl: 'templates/pedidos.html',
        controller: 'pedidosCtrl'
      }
    }
  })

  .state('menu.detallesPedido', {
    url: '/detallesPedido',
    views: {
      'side-menu21': {
        templateUrl: 'templates/detallesPedido.html',
        controller: 'detallesPedidoCtrl'
      }
    }
  })

  .state('menu.ventasConfirmadas', {
    url: '/ventasConfirmadas',
    views: {
      'side-menu21': {
        templateUrl: 'templates/ventasConfirmadas.html',
        controller: 'ventasConfirmadasCtrl'
      }
    }
  })

  .state('menu.detalleVenta', {
    url: '/detalleVenta',
    views: {
      'side-menu21': {
        templateUrl: 'templates/detalleVenta.html',
        controller: 'detalleVentaCtrl'
      }
    }
  })

  .state('menu.ventasPendientes', {
    url: '/ventasPendientes',
    views: {
      'side-menu21': {
        templateUrl: 'templates/ventasPendientes.html',
        controller: 'ventasPendientesCtrl'
      }
    }
  })

  .state('menu.productos', {
    url: '/productos',
    views: {
      'side-menu21': {
        templateUrl: 'templates/productos.html',
        controller: 'productosCtrl'
      }
    }
  })

  .state('menu.nuevoProducto', {
    url: '/nuevoProducto',
    views: {
      'side-menu21': {
        templateUrl: 'templates/nuevoProducto.html',
        controller: 'nuevoProductoCtrl'
      }
    }
  })
  
  
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })
  
    .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

$urlRouterProvider.otherwise('login')

  

});