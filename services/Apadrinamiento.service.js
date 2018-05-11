angular
.module('mimasApp')
.service('apadrinamientoService',apadrinamientoService);


apadrinamientoService.$inject = ['$http','$q','CONFIG'];

function apadrinamientoService($http,$q,CONFIG){
    var self = this;
    self.enviarSolicitud = enviarSolicitud;

    function enviarSolicitud(auditJson){                
        var promesa = $q.defer();
        $http.post(CONFIG.APIURL+"apadrinamientoservices/apadrinamiento",auditJson)
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