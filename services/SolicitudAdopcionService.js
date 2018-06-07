angular
.module('mimasApp')
.service('solicituAdopcionService',solicituAdopcionService);


solicituAdopcionService.$inject = ['$http','$q','CONFIG'];

function solicituAdopcionService($http,$q,CONFIG){
    var self = this;
    self.listarSolicitud = listarSolicitud;


    function listarSolicitud(){
        var promesa = $q.defer();
        $http.get(CONFIG.APIURL+"adopciones")
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