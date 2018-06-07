angular
.module('mimasApp')
.service('registarEventoServices',registarEventoServices);


registarEventoServices.$inject = ['$http','$q','CONFIG'];

function registarEventoServices($http,$q,CONFIG){
 var self = this;
self.registrarEvento = registrarEvento;
self.consultarEventoServices = consultarEventoServices;
self.actualizarEvento = actualizarEvento;
self.eliminarEvento = eliminarEvento;

function registrarEvento(auditJson){                
    var promesa = $q.defer();
    $http.post(CONFIG+"/eventos",auditJson)
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

function consultarEventoServices(auditJson){                
    var promesa = $q.defer();
    $http.post(CONFIG+"/eventos",auditJson)
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

function actualizarEvento(auditJson){                
    var promesa = $q.defer();
    $http.post(CONFIG+"/eventos",auditJson)
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


 function eliminarEvento(auditJson){                
    var promesa = $q.defer();
    $http.post(CONFIG+"/eventos",auditJson)
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