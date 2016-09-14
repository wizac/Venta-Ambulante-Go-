angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('ventas.agregueProductos', {
    url: '/nuevaventa',
    views: {
      'tab5': {
        templateUrl: 'templates/agregueProductos.html',
        controller: 'agregueProductosCtrl'
      }
    }
  })

  .state('ventas.listaDeVentas', {
    url: '/listaventas',
    views: {
      'tab1': {
        templateUrl: 'templates/listaDeVentas.html',
        controller: 'listaDeVentasCtrl'
      }
    }
  })

  .state('ventas.mapaDeVentas', {
    url: '/mapaventas',
    views: {
      'tab2': {
        templateUrl: 'templates/mapaDeVentas.html',
        controller: 'mapaDeVentasCtrl'
      }
    }
  })

  .state('ventas', {
    url: '/tabventa',
    templateUrl: 'templates/ventas.html',
    abstract:true
  })

  .state('login', {
    url: '/page5',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('tab3DefaultPage', {
    url: '/page7',
    templateUrl: 'templates/tab3DefaultPage.html',
    controller: 'tab3DefaultPageCtrl'
  })

  .state('perfil', {
    url: '/perfil',
    templateUrl: 'templates/perfil.html',
    controller: 'perfilCtrl'
  })

  .state('ventas.confirmarProductos', {
    url: '/confirmarproductos',
    views: {
      'tab5': {
        templateUrl: 'templates/confirmarProductos.html',
        controller: 'confirmarProductosCtrl'
      }
    }
  })

  .state('ventas.seleccionarCliente', {
    url: '/selecclientes',
    views: {
      'tab5': {
        templateUrl: 'templates/seleccionarCliente.html',
        controller: 'seleccionarClienteCtrl'
      }
    }
  })

  .state('ventas.agregarCliente', {
    url: '/agregCliente',
    views: {
      'tab5': {
        templateUrl: 'templates/agregarCliente.html',
        controller: 'agregarClienteCtrl'
      }
    }
  })

  .state('ventas.detalleDeVenta', {
    url: '/detalleventa',
    views: {
      'tab1': {
        templateUrl: 'templates/detalleDeVenta.html',
        controller: 'detalleDeVentaCtrl'
      }
    }
  })

  .state('page', {
    url: '/page13',
    templateUrl: 'templates/page.html',
    controller: 'pageCtrl'
  })

$urlRouterProvider.otherwise('/tabventa/mapaventas')

  

});