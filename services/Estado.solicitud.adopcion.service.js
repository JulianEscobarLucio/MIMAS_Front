angular
.module('mimasApp')
.service('estadoSolicitudAdopcionService',estadoSolicitudAdopcionService);


estadoSolicitudAdopcionService.$inject = ['$http','$q'];

function estadoSolicitudAdopcionService($http,$q){
    var self = this;
    var ipserver = 'http://localhost:8080'; 
  //  self.enviarSolicitud = enviarSolicitud;
   

}