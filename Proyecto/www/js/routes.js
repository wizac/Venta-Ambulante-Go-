angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.misDatos', {
    url: '/page1',
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
    url: '/page4',
    templateUrl: 'templates/registrarse.html',
    controller: 'registrarseCtrl'
  })

  .state('menu.elijaLosProductos', {
    url: '/n',
    views: {
      'side-menu21': {
        templateUrl: 'templates/elijaLosProductos.html',
        controller: 'elijaLosProductosCtrl'
      }
    }
  })

  .state('menu.confirmarProductos', {
    url: '/page6',
    views: {
      'side-menu21': {
        templateUrl: 'templates/confirmarProductos.html',
        controller: 'confirmarProductosCtrl'
      }
    }
  })

  .state('menu.elijaCliente', {
    url: '/page7',
    views: {
      'side-menu21': {
        templateUrl: 'templates/elijaCliente.html',
        controller: 'elijaClienteCtrl'
      }
    }
  })

  .state('menu.elijaPuntoDeVenta', {
    url: '/page8',
    views: {
      'side-menu21': {
        templateUrl: 'templates/elijaPuntoDeVenta.html',
        controller: 'elijaPuntoDeVentaCtrl'
      }
    }
  })

  .state('menu.perfil', {
    url: '/page9',
    views: {
      'side-menu21': {
        templateUrl: 'templates/perfil.html',
        controller: 'perfilCtrl'
      }
    }
  })

  .state('menu.modificarDatos', {
    url: '///page10M',
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

  .state('menu.proveedores', {
    url: '/page11',
    views: {
      'side-menu21': {
        templateUrl: 'templates/proveedores.html',
        controller: 'proveedoresCtrl'
      }
    }
  })

  .state('menu.nuevoProveedor', {
    url: '/page12',
    views: {
      'side-menu21': {
        templateUrl: 'templates/nuevoProveedor.html',
        controller: 'nuevoProveedorCtrl'
      }
    }
  })

  .state('menu.infoProveedor', {
    url: '/page13',
    views: {
      'side-menu21': {
        templateUrl: 'templates/infoProveedor.html',
        controller: 'infoProveedorCtrl'
      }
    }
  })

  .state('menu.nuevoPedido', {
    url: '/page14',
    views: {
      'side-menu21': {
        templateUrl: 'templates/nuevoPedido.html',
        controller: 'nuevoPedidoCtrl'
      }
    }
  })

  .state('menu.elijaProveedor', {
    url: '/page15',
    views: {
      'side-menu21': {
        templateUrl: 'templates/elijaProveedor.html',
        controller: 'elijaProveedorCtrl'
      }
    }
  })

  .state('menu.pedidos', {
    url: '/page16',
    views: {
      'side-menu21': {
        templateUrl: 'templates/pedidos.html',
        controller: 'pedidosCtrl'
      }
    }
  })

  .state('menu.detallesPedido', {
    url: '/page17',
    views: {
      'side-menu21': {
        templateUrl: 'templates/detallesPedido.html',
        controller: 'detallesPedidoCtrl'
      }
    }
  })

  .state('menu.ventasConfirmadas', {
    url: '/page18',
    views: {
      'side-menu21': {
        templateUrl: 'templates/ventasConfirmadas.html',
        controller: 'ventasConfirmadasCtrl'
      }
    }
  })

  .state('menu.detalleVenta', {
    url: '/page19',
    views: {
      'side-menu21': {
        templateUrl: 'templates/detalleVenta.html',
        controller: 'detalleVentaCtrl'
      }
    }
  })

  .state('menu.ventasPendientes', {
    url: '/page20',
    views: {
      'side-menu21': {
        templateUrl: 'templates/ventasPendientes.html',
        controller: 'ventasPendientesCtrl'
      }
    }
  })

  .state('menu.productos', {
    url: '/page21',
    views: {
      'side-menu21': {
        templateUrl: 'templates/productos.html',
        controller: 'productosCtrl'
      }
    }
  })

  .state('menu.nuevoProducto', {
    url: '/page22',
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