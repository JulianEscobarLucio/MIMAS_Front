angular
.module('mimasApp')
.service('estadoSolicitudApadrinamientoService',estadoSolicitudApadrinamientoService);


estadoSolicitudApadrinamientoService.$inject = ['$http','$q','CONFIG'];

function estadoSolicitudApadrinamientoService($http,$q,CONFIG){
    var self = this;
    self.consultarSolicitud = consultarSolicitud;
    self.actualizarSolicitud = actualizarSolicitud;

  
      function consultarSolicitud(idSolicitud){
        var promesa = $q.defer();
        $http.get(CONFIG.APIURL+"/apadrinamientos/"+idSolicitud)
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

    function actualizarSolicitud(auditJson){                
      var promesa = $q.defer();
      $http.put(CONFIG.APIURL+"/apadrinamientos",auditJson)
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