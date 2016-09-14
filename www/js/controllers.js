

var productos = [
  {
    nombre: "Zanahoria",
    descripcion: "Una zanahoria",
    precioVenta: 4.4,
    precioCompra: 5.5,
    cantidad: 8,
    categoria: "Verduras"
  },
  {
    nombre: "Papa",
    descripcion: "Una papa",
    precioVenta: 3.3,
    precioCompra: 4.4,
    cantidad: 20,
    categoria: "Verduras"
  },
  {
    nombre: "Naranja",
    descripcion: "Una naranja",
    precioVenta: 2.2,
    precioCompra: 3.3,
    cantidad: 200,
    categoria: "Frutas"
  }
];

var productosSeleccionados = [];

var alerta = function(){
  console.log("hi");
  var confirmPopup = $ionicPopup.confirm({
    title: 'Consume ice cream',
    template: 'adklfjalkfjadf'
  });

  confirmPopup.then(function(res){
    if(res){

    }else{

    }
  });
};
angular.module('app.controllers', [])
  
.controller('agregueProductosCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

  $scope.productosStock = productos;

  $scope.seleccionarProducto = function(item){
    var a = false;
    for(var p = 0; p < productosSeleccionados.length; p++)
    {
      console.log(productosSeleccionados[p].nombre +" "+productosSeleccionados[p].cantidad +" "+ item.nombre)
      if(productosSeleccionados[p].nombre == item.nombre)
      {
        productosSeleccionados[p].cantidad += 1;
        a = true;
      }
    }
    if(!a)
    {
      productosSeleccionados.push({nombre: item.nombre, cantidad: 1});
    }
    console.log(item.nombre);
  }

}])

.controller('listaDeVentasCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('mapaDeVentasCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
         
.controller('loginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('signupCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('tab3DefaultPageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('perfilCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('confirmarProductosCtrl', ['$scope', '$stateParams','$ionicPopup', '$timeout','$state','$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$ionicPopup, $timeout,$state,$http) {
   $http.get('http://localhost:3000/persona/list')
      .then(function(data){
		  console.log(data);
	  });
	data = {
    "nombre": "gonsss",
    "apellido": "podesss",
    "documento": "32422233"
	};
	  $http.post('http://localhost:3000/persona/put',data)
      .success(function(){
		  
	   console.log("Listo!");
	  });
	  
  $scope.prodConfirmar = productosSeleccionados;

   $scope.showConfirm = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Confirmar',
     template: 'Esta seguro que desea agregar estos productos?'
   });

   confirmPopup.then(function(res) {
     if(res) {
       $state.go('ventas.seleccionarCliente');
     } 
   });
 };

 
}])
   
.controller('seleccionarClienteCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('agregarClienteCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('detalleDeVentaCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('pageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 