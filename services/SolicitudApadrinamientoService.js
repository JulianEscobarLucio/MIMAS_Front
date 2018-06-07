angular
.module('mimasApp')
.service('solicituApadrinamientoService',solicituApadrinamientoService);


solicituApadrinamientoService.$inject = ['$http','$q'];

function solicituApadrinamientoService($http,$q,CONFIG){
    var self = this;
    self.listarSolicitud = listarSolicitud;


    function listarSolicitud(){
        var promesa = $q.defer();
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