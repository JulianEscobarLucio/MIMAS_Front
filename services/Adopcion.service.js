angular
.module('mimasApp')
.service('adopcionService',adopcionService);


adopcionService.$inject = ['$http','$q'];

function adopcionService($http,$q){
    var self = this;
    var ipserver = 'http://localhost:8081';
    self.consultarSolicitud = consultarSolicitud;
    self.actualizarSolicitud = actualizarSolicitud; 


    function actualizarSolicitud(auditJson){                
        var promesa = $q.defer();
        $http.put(ipserver+"/mimas/rest/adopcionservices/adopcion",auditJson)
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

    function consultarSolicitud(idSolicitud){
        var promesa = $q.defer();
        $http.get(ipserver+"/mimas/rest/adopcionservices/adopcion",{
            params: {
                id: idSolicitud
            }  
        })
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