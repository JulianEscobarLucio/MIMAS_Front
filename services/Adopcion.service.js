angular
.module('mimasApp')
.service('adopcionService',adopcionService);


adopcionService.$inject = ['$http','$q'];

function adopcionService($http,$q){
    var self = this;
    var ipserver = 'http://localhost:8080'; 
    self.enviarSolicitud = enviarSolicitud;

    function enviarSolicitud(auditJson){                
        var promesa = $q.defer();
        $http.post(ipserver+"/mimas/rest/adopcionservices/adopcion",auditJson)
            .success(function(data){
                promesa.resolve({
                    resultado:data
                })
            })
            .error(function(err){
                promesa.resolve({
                    resultado:err
                })
            })
            return promesa.promise      
        
    }

}