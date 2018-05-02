	angular
		.module('mimasApp')
		.service('registarEventoServices',registarEventoServices);


	registarEventoServices.$inject = ['$http','$q'];

	function registarEventoServices($http,$q){
         var self = this;
        var ipserver = 'http://localhost:8081'; 
        self.registrarEvento = registrarEvento;
        self.consultarEventoServices = consultarEventoServices;
        self.actualizarEvento = actualizarEvento;
        self.eliminarEvento = eliminarEvento;

        function registrarEvento(auditJson){                
            var promesa = $q.defer();
            $http.post(ipserver+"/mimas/rest/Eventoservices/registrarEvento",auditJson)
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
            $http.post(ipserver+"/mimas/rest/Mascotaservices/consultarMascota",auditJson)
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
            $http.post(ipserver+"/mimas/rest/Eventoservices/actualizarEvento",auditJson)
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
            $http.post(ipserver+"/mimas/rest/Eventoservices/eliminarEvento",auditJson)
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
