angular.module('mimasApp', ['ngRoute','ngMaterial', 'ngMessages','ngMask','ngMdIcons'])
 
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/Home.publico.html',
            controller: 'homepublicoController',
        })
        .when('/login', {
            templateUrl: 'views/Login.html',
            controller: 'loginController'
        })
        .when('/home-transaccional', {
            templateUrl: 'views/Home.transaccional.html',
            controller: 'homeController'
        })
        .when('/mascota', {
            templateUrl: 'views/Mascota.html',
            controller: 'mascotaController'
        })
        .when('/registra-suario', {
            templateUrl: 'views/Registrar_Usuario.html',
            controller: 'registrarUsuarioController'
        })
        .when('/usuario', {
            templateUrl: 'views/Usuario.html',
            controller: 'UsuarioController'
        })
        .when('/adopcion', {
            templateUrl: 'views/Adopcion.html',
            controller: 'adopcionController'
        })        
        .when('/apadrinamiento', {
            templateUrl: 'views/apadrinamiento.html',
            controller: 'apadrinamientoController'
        })
        .when('/solicitudes-adopcion', {
            templateUrl: 'views/SoliciudesAdopcion.html',
            controller: 'solicitudAdopcionController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);