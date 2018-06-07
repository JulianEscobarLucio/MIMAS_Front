angular
    .module('mimasApp')
    .directive("menuTransaccional", function() {
        return {
            templateUrl: 'views/Menu.transaccional.html'  
        }
    })
    .directive("listaMascota", function() {
        return {
            templateUrl: 'views/Lista.mascota.html'  
        }
    })