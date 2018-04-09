angular
.module('mimasApp')
.service('solicitudAdopcionService',solicitudAdopcionService);


solicitudAdopcionService.$inject = ['$http','$q'];

function solicitudAdopcionService($http,$q){
    var self = this;
    var ipserver = 'http://localhost:8081'; 
    self.listarSolicitud = listarSolicitud;
    
    function listarSolicitud(){                
        var promesa = $q.defer();
        $http.get(ipserver+"/mimas/rest/adopcionservices/list-adopcion")
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