	angular
		.module('mimasApp')
		.service('registarMascotaServices',registarMascotaServices);


	registarMascotaServices.$inject = ['$http','$q','CONFIG'];

	function registarMascotaServices($http,$q,CONFIG){
         var self = this;
        self.registrarMascota = registrarMascota;
        self.consultarMascotaServices = consultarMascotaServices;
        self.actualizarMascota = actualizarMascota;
        self.eliminarMascota = eliminarMascota;

        function registrarMascota(auditJson){                
            var promesa = $q.defer();
            $http.post(CONFIG.APIURL+"mascotas",auditJson)
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

    function consultarMascotaServices(id){                
            var promesa = $q.defer();
            $http.get(CONFIG.APIURL+"mascotas/"+id)
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

        function actualizarMascota(auditJson){                
            var promesa = $q.defer();
            $http.put(CONFIG.APIURL+"mascotas",auditJson)
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

    
         function eliminarMascota(id){                
            var promesa = $q.defer();
            $http.delete(CONFIG.APIURL+"mascotas/"+id)
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
