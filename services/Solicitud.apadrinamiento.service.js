angular
.module('mimasApp')
.service('solicitudApadrinamientoService',solicitudApadrinamientoService);


solicitudApadrinamientoService.$inject = ['$http','$q','CONFIG'];

function solicitudApadrinamientoService($http,$q,CONFIG){
    var self = this;
    self.listarSolicitud = listarSolicitud;

    
    function listarSolicitud(){                
        var promesa = $q.defer();
        debugger;
        $http.get(CONFIG.APIURL+"/apadrinamientos")
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