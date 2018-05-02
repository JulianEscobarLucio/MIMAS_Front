angular
.module('mimasApp')
.service('apadrinamientoService',apadrinamientoService);


apadrinamientoService.$inject = ['$http','$q'];

function apadrinamientoService($http,$q){
    var self = this;
    var ipserver = 'http://localhost:8081'; 
    self.enviarSolicitud = enviarSolicitud;

    function enviarSolicitud(auditJson){                
        var promesa = $q.defer();
        $http.post(ipserver+"/mimas/rest/apadrinamientoservices/apadrinamiento",auditJson)
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