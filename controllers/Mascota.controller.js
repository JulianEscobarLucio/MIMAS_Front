    angular.module('mimasApp')
    .controller('mascotaController', mascotaController);

    function mascotaController($scope, $mdDialog,registarMascotaServices, $timeout,CONFIG,$location) {
        
      if(sessionStorage.getItem("access") != 'true' ){
        $location.url("/"); 
       }
       
        var vm = this;
        vm.FechaN = "";
        vm.isOpen = false;             
        vm.registrar = registrar;
        vm.consultar = consultar;
        vm.actualizar = actualizar;
        vm.eliminar = eliminar;
        vm.idDisabled = false;
        vm.registrarDisabled = false;
        vm.consultarDisabled = false; 
        vm.actualizarDisabled = true;
        vm.eliminarDisabled = true; 
        vm.mensajeId ="";
        vm.mensajeNombre= "";
        vm.mensajeIdResponsable = "";
        vm.mensajeEspecie = "";
        vm.mensajeRaza = "";
        vm.mensajeGenero = "";
        vm.mensajeEdad = "";
        vm.mensajeTamano = "";
        vm.mensajeEstado = "";
        vm.mensajeCaracteristicas = "";
        vm.mensajeVacunas = "";
        vm.mensajeSenales = "";
        vm.mensajeColor = "";
        vm.mensajeColorojos = "";
        vm.mensajepersonalidad = "";
        vm.mensajeEstadoSalud = "";
        vm.mensajeFecha = "";
         vm.functionId2 = functionId2;
        vm.functionNombre = functionNombre;
        vm.functionResponsable = functionResponsable;
        vm.functionEspecie = functionEspecie;
        vm.functionRaza = functionRaza;
        vm.functionGenero = functionGenero;
        vm.functionEdad = functionEdad;
        vm.functionTamano = functionTamano;
        vm.functionEstado = functionEstado;
        vm.functionCaracteristicas = functionCaracteristicas;      
        vm.functionFechaN = functionFechaN;
        vm.functionSenales = functionSenales;
        vm.functionColor = functionColor;
        vm.functionColorojos = functionColorojos;
        vm.functionPersonalidad = functionPersonalidad;
        vm.functionEstadoSalud = functionEstadoSalud;
        vm.showConfirm = showConfirm;
        vm.cancelar = cancelar;
        vm.DisabledCancelar = true;
        vm.IdResponsable = sessionStorage.getItem("user"); 
        vm.imagen = "";
        vm.fechaN = new Date();
        vm.rol = sessionStorage.getItem("rol");
        vm.bienvenidaUsuario = ", "+ sessionStorage.getItem("nombre");
        

       vm.thumbnail = {
         dataUrl: ''
       };
       vm.fileReaderSupported = window.FileReader != null;
       

       function getBase64Image(img) {
        console.log(img);
          var canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          var dataURL = canvas.toDataURL();
          return dataURL;
      }
      
      vm.thumbnail.dataUrl = getBase64Image(document.getElementById("img"));
      
      if(vm.thumbnail.dataUrl =="data:," ){
        location.reload(true);
      }


       $scope.photoChanged = function(files){
          if (files != null) {
              debugger;
              var file = files;
              vm.imagen = file.name 
            if (vm.fileReaderSupported && file.type.indexOf('image') > -1) {
                $timeout(function() {
                    var fileReader = new FileReader();
                    fileReader.readAsDataURL(file);
                    fileReader.onload = function(e) {
                        $timeout(function(){
                           vm.thumbnail.dataUrl = e.target.result;
                        });
                    }
                });
            }
          }
        };



      function cancelar(){
        vm.consultarDisabled = false; 
        vm.actualizarDisabled = true;
        vm.DisabledCancelar = true;
        vm.eliminarDisabled = true;
        vm.idDisabled = false;
        vm.registrarDisabled = false;
        
        vm.Id2 = "";
        vm.nombre = "";
        vm.Especie = "";
        vm.Raza = "";
        vm.Genero = "";   
        vm.Tamano = "";
        vm.Estado = "",
        vm.Caracteristicas = "";
        vm.Vacunas = "";
        vm.FechaN = "";
        vm.Senales = "";
        vm.Color = "";
        vm.Colorojos = "";
        vm.Personalidad = "";
        vm.EstadoSalud   = "" 
        vm.thumbnail.dataUrl = getBase64Image(document.getElementById("img"));
       } 

        

     function showConfirm (ev) {
          // Appending dialog to document.body to cover sidenav in docs app
          var confirm = $mdDialog.confirm()
                .title('Vas a eliminar una mascota')
                .textContent('Estás seguro que vas a eliminar esta mascota.')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Aceptar')
                .cancel('Cancelar');

          $mdDialog.show(confirm).then(function() {
            vm.eliminar();
          }, function() {
            //$scope.status = 'You decided to keep your debt.';
          });
        };


 
      function functionId2(){
             if(vm.Id2.length > 0){
               vm.mensajeId2 ="";
             }
        }

        


        function functionNombre(){
             if(vm.nombre.length > 0){
               vm.mensajeNombre ="";
             }
        }

        
        function functionResponsable(){
             if(vm.IdResponsable.length > 0){
               vm.mensajeResponsable ="";
             }
        }

        function functionEspecie(){
             if(vm.Especie != '0'){
               vm.mensajeEspecie ="";
             }
        }
        

        function functionRaza(){
             if(vm.Raza.length > 0){
               vm.mensajeRaza ="";
             }
        }


        function functionGenero(){
             if(vm.Genero != '0'){
               vm.mensajeGenero ="";
             }
        }

        function functionEdad(){
             if(vm.Edad.length > 0){
               vm.mensajeEdad ="";
             }
        }

        function functionTamano(){
             if(vm.Tamano != '0'){
               vm.mensajeTamano ="";
             }
        }

        function functionEstado(){
             if(vm.Estado != '0'){
               vm.mensajeEstado ="";
             }
        }

        function functionCaracteristicas(){
             if(vm.Caracteristicas.length > 0){
               vm.mensajeCaracteristicas ="";
             }
        }
       

        function functionFechaN(){
             if(vm.fechaN < new Date()){
                vm.mensajeFecha ="";
             }
        }

        function functionSenales(){
             if(vm.Senales.length > 0){
               vm.mensajeSenales ="";
             }
        }

        function functionColor(){
             if(vm.Color.length > 0){
               vm.mensajeColor ="";
             }
        }

        function functionColorojos(){
             if(vm.Colorojos.length > 0){
               vm.mensajeColorojos ="";
             }
        }

        function functionPersonalidad(){
             if(vm.Personalidad.length > 0){
               vm.mensajepersonalidad ="";
             }
        }

        function functionEstadoSalud(){
             if(vm.EstadoSalud.length > 0){
               vm.mensajeEstadoSalud ="";
             }
        }



        function registrar(){           
              
              if(vm.nombre == undefined  || vm.nombre  == ''){
                vm.mensajeNombre = "Debes ingresar un dato válido para este campo";
                return;
              }
              
              
              if(vm.IdResponsable == undefined  || vm.IdResponsable  == ''){
                vm.mensajeResponsable = "Debes ingresar un dato válido para este campo";
                return;
              }
              
              
              if(vm.Especie == undefined  || vm.Especie == '0'){
                vm.mensajeEspecie = "Debes seleccionar una opción";
                return;
              }
              
              if(vm.fechaN >= new Date()){
                vm.mensajeFecha = "La fecha debe ser menor a la fecha actual";
                return;
              }

             if(vm.Genero == undefined  || vm.Genero == '0'){
                   vm.mensajeGenero = "Debes seleccionar una opción";
                    return;
              } 

                 
              if(vm.Tamano == undefined  || vm.Tamano == '0'){
                   vm.mensajeTamano = "Debes seleccionar una opción";
                    return;
              }


              if(vm.Estado == undefined  || vm.Estado == '0'){
                   vm.mensajeEstado = "Debes seleccionar una opción";
                    return;
              }


              if(vm.Caracteristicas == undefined  || vm.Caracteristicas == ''){
                   vm.mensajeCaracteristicas = "Debes ingresar un dato válido para este campo";
                    return;
              }


              if(vm.Raza == undefined  || vm.Raza == ''){
                   vm.mensajeRaza = "Debes ingresar un dato válido para este campo";
                    return;
              }


              if(vm.Senales == undefined  || vm.Senales == ''){
                   vm.mensajeSenales = "Debes ingresar un dato válido para este campo";
                    return;
              }

              if(vm.Color == undefined  || vm.Color == ''){
                   vm.mensajeColor= "Debes ingresar un dato válido para este campo";
                    return;
              }


              if(vm.Colorojos == undefined  || vm.Colorojos == ''){
                   vm.mensajeColorojos = "Debes ingresar un dato válido para este campo";  
                    return;
              }


              if(vm.Personalidad == undefined  || vm.Personalidad == ''){
                   vm.mensajepersonalidad = "Debes ingresar un dato válido para este campo";
                    return;
              }


              if(vm.EstadoSalud == undefined  || vm.EstadoSalud == ''){
                   vm.mensajeEstadoSalud = "Debes ingresar un dato válido para este campo";
                    return;
              }   

          var mes = vm.fechaN.getMonth()+1;  
          var requestJson = {
                    "id" : vm.Id,
                    "nombre" : vm.nombre,
                    "idResponsable": vm.IdResponsable ,
                    "especie" : vm.Especie,
                    "raza" : vm.Raza,
                    "genero" : vm.Genero,                 
                    "tamano" : vm.Tamano,
                    "estado" : vm.Estado,
                    "caracteristicas" : vm.Caracteristicas,
                    "fechaN" : "" ,
                    "senales" : vm.Senales,
                    "color" : vm.Color,
                    "colorojos" : vm.Colorojos,
                    "personalidad" : vm.Personalidad,
                    "estadoSalud" : vm.EstadoSalud ,
                     "imagen" : vm.thumbnail.dataUrl                
                    }
             jQuery(window).spin();       
             registarMascotaServices.registrarMascota(requestJson).then(function(data){
             jQuery(window).spin();
             vm.thumbnail.dataUrl = getBase64Image(document.getElementById("img"));
             if(data.resultado.codigoRespuesta == "201") {     
                  $mdDialog.show(
                  $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#dialogContainer')))
                  .clickOutsideToClose(true)
                  .title('Registrar Mascota')
                  .textContent('Se registró la mascota exitósamente, identificador de la mascota: ' +data.resultado.id)
                  .ariaLabel('Se registró la mascota exitósamente.')
                  .ok('Cerrar')                     
                );
                      
                  vm.Id = "",
                  vm.nombre = "",
                  vm.IdResponsable  = "",
                  vm.Especie = "",
                  vm.Raza = "",
                  vm.Genero = "",                  
                  vm.Tamano = "",
                  vm.Estado = "",
                  vm.Caracteristicas = "",
                  vm.Vacunas = "",
                  vm.FechaN = "",
                  vm.Senales = "",
                  vm.Color = "",
                  vm.Colorojos = "",
                  vm.Personalidad = "",
                  vm.EstadoSalud   = "",
                  vm.thumbnail.dataUrl = "";
                  vm.thumbnail = {
                  dataUrl: ''
                };               

                }else if(data.resultado.codigoRespuesta == "202" ){
                       $mdDialog.show(
                       $mdDialog.alert()
                       .parent(angular.element(document.querySelector('#dialogContainer')))
                       .clickOutsideToClose(true)
                       .title('Registrar Mascota')
                       .textContent('Mascota no registrada.')
                       .ariaLabel('Mascota no registrada.')
                       .ok('Cerrar')                     
                      );
                }else if(data.resultado.codigoRespuesta == "203"){
                       $mdDialog.show(
                       $mdDialog.alert()
                       .parent(angular.element(document.querySelector('#dialogContainer')))
                       .clickOutsideToClose(true)
                       .title('Registrar Mascota')
                       .textContent('La mascota ya se encuentra registrada.')
                       .ariaLabel('La mascota ya se enuentra registrada.')
                       .ok('Cerrar')                     
                      );
                }else if(data.resultado.codigoRespuesta == "500"){
                  $mdDialog.show(
                  $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#dialogContainer')))
                  .clickOutsideToClose(true)
                  .title('Registrar Mascota')
                  .textContent('Ocurrió un error tratando de registrar la mascota.')
                  .ariaLabel('La mascota ya se enuentra registrada.')
                  .ok('Cerrar')                     
                 );
           }           
             });
        } 


        function actualizar(){ 
          
          if(vm.Id == undefined  || vm.Id  == ''){
            vm.mensajeId = "Debes ingresar un dato válido para este campo";
            return;
          }
          
          if(vm.nombre == undefined  || vm.nombre  == ''){
            vm.mensajeNombre = "Debes ingresar un dato válido para este campo";
            return;
          }
          
          
          if(vm.IdResponsable == undefined  || vm.IdResponsable  == ''){
            vm.mensajeResponsable = "Debes ingresar un dato válido para este campo";
            return;
          }
          
          
          if(vm.Especie == undefined  || vm.Especie == '0'){
            vm.mensajeEspecie = "Debes seleccionar una opción";
            return;
          }
          
          if(vm.fechaN >= new Date()){
             vm.mensajeFecha = "La fecha debe ser menor a la fecha actual";
             return;
           }

             if(vm.Genero == undefined  || vm.Genero == '0'){
                   vm.mensajeGenero = "Debes seleccionar una opción";
                    return;
              } 

                 
              if(vm.Tamano == undefined  || vm.Tamano == '0'){
                   vm.mensajeTamano = "Debes seleccionar una opción";
                    return;
              }


              if(vm.Estado == undefined  || vm.Estado == '0'){
                   vm.mensajeEstado = "Debes seleccionar una opción";
                    return;
              }


              if(vm.Caracteristicas == undefined  || vm.Caracteristicas == ''){
                   vm.mensajeCaracteristicas = "Debes ingresar un dato válido para este campo";
                    return;
              }


              if(vm.Raza == undefined  || vm.Raza == ''){
                   vm.mensajeRaza = "Debes ingresar un dato válido para este campo";
                    return;
              }

              if(vm.Senales == undefined  || vm.Senales == ''){
                   vm.mensajeSenales = "Debes ingresar un dato válido para este campo";
                    return;
              }

              if(vm.Color == undefined  || vm.Color == ''){
                   vm.mensajeColor= "Debes ingresar un dato válido para este campo";
                    return;
              }


              if(vm.Colorojos == undefined  || vm.Colorojos == ''){
                   vm.mensajeColorojos = "Debes ingresar un dato válido para este campo";  
                    return;
              }


              if(vm.Personalidad == undefined  || vm.Personalidad == ''){
                   vm.mensajepersonalidad = "Debes ingresar un dato válido para este campo";
                    return;
              }


              if(vm.EstadoSalud == undefined  || vm.EstadoSalud == ''){
                   vm.mensajeEstadoSalud = "Debes ingresar un dato válido para este campo";
                    return;
              }    
          
  
           var mes = vm.fechaN.getMonth()+1; 
          var requestJson = {
                    "id" : vm.Id,
                    "nombre" : vm.nombre,
                    "idResponsable": vm.IdResponsable ,
                    "especie" : vm.Especie,
                    "raza" : vm.Raza,
                    "genero" : vm.Genero,                    
                    "tamano" : vm.Tamano,
                    "estado" : vm.Estado,
                    "caracteristicas" : vm.Caracteristicas,
                    "fechaN" : vm.fechaN ,
                    "senales" : vm.Senales,
                    "color" : vm.Color,
                    "colorojos" : vm.Colorojos,
                    "personalidad" : vm.Personalidad,
                    "estadoSalud" : vm.EstadoSalud,
                    "imagen" : vm.thumbnail.dataUrl                   
                    }         

          
              jQuery(window).spin();       
              registarMascotaServices.actualizarMascota(requestJson).then(function(data){
              jQuery(window).spin();
              vm.thumbnail.dataUrl = getBase64Image(document.getElementById("img"));
              if(data.resultado == "200") {     
                       $mdDialog.show(
                       $mdDialog.alert()
                       .parent(angular.element(document.querySelector('#dialogContainer')))
                       .clickOutsideToClose(true)
                       .title('Actualizar mascota')
                       .textContent('Se actualizó la mascota exitosamente.')
                       .ariaLabel('Se actualizó la mascota exitosamente.')
                       .ok('Cerrar')                     
                      );
                    vm.Id2 = "";
                    vm.Id = "";
                    vm.nombre = "";                   
                    vm.Especie = "";
                    vm.Raza = "";
                    vm.Genero = "";            
                    vm.Tamano = "";
                    vm.Estado = "";
                    vm.Caracteristicas = "";
                    vm.Vacunas = "";
                    vm.FechaN = "";
                    vm.Senales = "";
                    vm.Color = "";
                    vm.Colorojos = "";
                    vm.Personalidad = "";
                    vm.EstadoSalud   = ""; 
                    vm.thumbnail.dataUrl = vm.imagen;
                    vm.imagen = "";
         
                    vm.idDisabled = false;
                    vm.registrarDisabled = false;
                    vm.consultarDisabled = false; 
                    vm.actualizarDisabled = true;
                    vm.eliminarDisabled = true; 
                }else{
                       $mdDialog.show(
                       $mdDialog.alert()
                       .parent(angular.element(document.querySelector('#dialogContainer')))
                       .clickOutsideToClose(true)
                       .title('Actualizar mascota')
                       .textContent('Mascota no actualizada.')
                       .ariaLabel('Mascota no actualizada.')
                       .ok('Cerrar')                     
                      );
                }           
             });
        } 


        function consultar(){
            if(vm.Id2 == undefined  || vm.Id2  == ''){
                   vm.mensajeId2 = "Debes ingresar un id para consultar";
                   return;
             }
       
             jQuery(window).spin();
             registarMascotaServices.consultarMascotaServices(vm.Id2).then(function(data){
             jQuery(window).spin();
             if(data.resultado.nombre != null && data.resultado.nombre != "" ) { 
                     $mdDialog.show(
                       $mdDialog.alert()
                       .parent(angular.element(document.querySelector('#dialogContainer')))
                       .clickOutsideToClose(true)
                       .title('Consultar Mascota')
                       .textContent('Mascota consultada.')
                       .ariaLabel('Mascota consultada.')
                       .ok('Cerrar')                     
                      );
                    vm.Id = vm.Id2;
                    vm.nombre = data.resultado.nombre;
                    vm.IdResponsable  = data.resultado.idResponsable;
                    vm.Especie = data.resultado.especie;
                    vm.Raza = data.resultado.raza;
                    vm.Genero = data.resultado.genero;                
                    vm.Tamano = data.resultado.tamano;
                    vm.Estado = data.resultado.estado;
                    vm.Caracteristicas = data.resultado.caracteristicas;
                    vm.FechaN = new Date(data.resultado.fechaN);
                    vm.Senales = data.resultado.senales;
                    vm.Color = data.resultado.color;
                    vm.Colorojos = data.resultado.colorojos;
                    vm.Personalidad = data.resultado.personalidad;
                    vm.EstadoSalud   = data.resultado.estadoSalud; 
                    vm.thumbnail.dataUrl =  data.resultado.imagen;

                    vm.Id2 = ""; 
                     vm.idDisabled = true;
                     vm.actualizarDisabled = false;
                     vm.eliminarDisabled = false; 
                      vm.DisabledCancelar = false;

                     vm.registrarDisabled = true;
                     vm.consultarDisabled = true; 

                }else {
                      $mdDialog.show(
                       $mdDialog.alert()
                       .parent(angular.element(document.querySelector('#dialogContainer')))
                       .clickOutsideToClose(true)
                       .title('Consultar Mascota')
                       .textContent('Masocta no consultada')
                       .ariaLabel('Verifique el id de la mascota.')
                       .ok('Cerrar')                     
                      );

                }            
             });
        } 



        function eliminar(){
             jQuery(window).spin();
             registarMascotaServices.eliminarMascota(vm.Id).then(function(data){
              jQuery(window).spin();
               vm.thumbnail.dataUrl = getBase64Image(document.getElementById("img"));
                if(data.resultado == "200") { 
                     $mdDialog.show(
                       $mdDialog.alert()
                       .parent(angular.element(document.querySelector('#dialogContainer')))
                       .clickOutsideToClose(true)
                       .title('Eliminar mascota')
                       .textContent('Mascota eliminada exitósamente.')
                       .ariaLabel('Mascota eliminada exitósamente.')
                       .ok('Cerrar')                     
                      );
                    
                    vm.Id = "";
                    vm.nombre = "",                   
                    vm.Especie = "",
                    vm.Raza = "",
                    vm.Genero = "",              
                    vm.Tamano = "",
                    vm.Estado = "",
                    vm.Caracteristicas = "",
                    vm.FechaN = "",
                    vm.Senales = "",
                    vm.Color = "",
                    vm.Colorojos = "",
                    vm.Personalidad = "",
                    vm.EstadoSalud   = "",   

                    vm.idDisabled = false;
                    vm.registrarDisabled = false;
                    vm.consultarDisabled = false; 
                    vm.actualizarDisabled = true;
                    vm.eliminarDisabled = true; 

                }else {
                      $mdDialog.show(
                        $mdDialog.alert()
                       .parent(angular.element(document.querySelector('#dialogContainer')))
                       .clickOutsideToClose(true)
                       .title('Eliminar Mascota')
                       .textContent('Mascota no eliminada.')
                       .ariaLabel('Mascota no eliminada.')
                       .ok('Cerrar')                     
                      );

                }            
             });
        }    

}        
    