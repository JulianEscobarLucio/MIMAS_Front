angular
.module('mimasApp')
.service('apadrinamientoService',apadrinamientoService);


apadrinamientoService.$inject = ['$http','$q'];

function apadrinamientoService($http,$q){
    var self = this;
    var ipserver = 'http://localhost:8080';
    self.consultarSolicitud = consultarSolicitud;
    self.actualizarSolicitud = actualizarSolicitud; 


    function actualizarSolicitud(auditJson){                
        var promesa = $q.defer();
        $http.put(ipserver+"/mimas/rest/apadrinamientoservices/apadrinamiento",auditJson)
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
        $http.get(ipserver+"/mimas/rest/apadrinamientoservices/apadrinamiento",{
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