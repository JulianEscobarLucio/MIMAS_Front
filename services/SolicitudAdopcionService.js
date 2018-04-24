angular
.module('mimasApp')
.service('solicituAdopcionService',solicituAdopcionService);


solicituAdopcionService.$inject = ['$http','$q'];

function solicituAdopcionService($http,$q){
    var self = this;
    var ipserver = 'http://localhost:8080'; 
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