    angular.module('mimasApp')
    .controller('eventoController', eventoController);

    function eventoController($scope, $mdDialog,registarEventoServices, $timeout) {
        var vm = this;
        vm.fechai = "";
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
        vm.mensajeIdEvento ="";
        vm.mensajeNombre= "";
        vm.mensajeUsuario = "";
        vm.mensajeFechaI = "";
        vm.mensajeFechaF = "";
        vm.mensajeLugar = "";
        vm.mensajeDescripcion = "";
        vm.mensajeEstado = "";
        vm.mensajeImagen = "";
        
         vm.functionIdEvento2 = functionIdEvento2;
        vm.functionNombre = functionNombre;
        vm.functionUsuario = functionUsuario;
        vm.functionFechaI = functionFechaI;
        vm.functionFechaF = functionFechaF;
        vm.functionLugar = functionLugar;
        vm.functionDescripcion = functionDescripcion;
        vm.functionEstado = functionEstado;
        vm.functionImagen = functionImagen;
       
        vm.showConfirm = showConfirm;
        vm.cancelar = cancelar;
        vm.DisabledCancelar = true;
        vm.IdEvento = localStorage.getItem("user"); 
        vm.imagen = "";
        vm.fechai = new Date();
        vm.fechaf = new Date();


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

       $scope.photoChanged = function(files){
          if (files != null) {
              debugger;
              var file = files[0];
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
        
        vm.IdEvento2 = "";
        vm.Nombre = "";
        vm.Usuario  = "";
        vm.FechaI = "";
        vm.FechaF = "";
        vm.Lugar = "";   
        vm.Descripcion = "";
        vm.Estado = "",
       
        vm.thumbnail.dataUrl = getBase64Image(document.getElementById("img"));
       } 

        

     function showConfirm (ev) {
          // Appending dialog to document.body to cover sidenav in docs app
          var confirm = $mdDialog.confirm()
                .title('Vas a eliminar un evento')
                .textContent('Estás seguro que vas a eliminar este evento.')
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


 
      function functionIdEvento2(){
             if(vm.IdEvento2.length > 0){
               vm.mensajeIdEvento2 ="";
             }
        }

        


        function functionNombre(){
             if(vm.nombre.length > 0){
               vm.mensajeNombre ="";
             }
        }

        
        function functionUsuario(){
             if(vm.Usuario.length > 0){
               vm.mensajeUsuario ="";
             }
        }

        function functionFechaI(){
             if(vm.FechaI != '0'){
               vm.mensajeFechaI ="";
             }
        }
        

        function functionFechaF(){
             if(vm.FechaF.length > 0){
               vm.mensajeFechaF ="";
             }
        }


        function functionLugar(){
             if(vm.Lugar != '0'){
               vm.mensajeLugar ="";
             }
        }

        function functionDescripcion(){
             if(vm.Descripcion.length > 0){
               vm.mensajeDescripcion ="";
             }
        }


        function functionEstado(){
             if(vm.Estado != '0'){
               vm.mensajeEstado ="";
             }
        }



        function registrar(){           
              
              if(vm.Nombre == undefined  || vm.Nombre  == ''){
                vm.mensajeNombre = "Debes ingresar un dato válido para este campo";
                return;
              }
              
              
              if(vm.Usuario == undefined  || vm.Usuario  == ''){
                vm.mensajeUsuario = "Debes ingresar un dato válido para este campo";
                return;
              }
              
              
              if(vm.FechaI <= new Date()){
                vm.mensajeFechaI = "La fecha debe ser mayor a la fecha actual";
                return;
              }
              
              if(vm.FechaF >= new Date()){
                vm.mensajeFechaF = "La fecha debe ser menor a la fecha actual";
                return;
              }

             if(vm.Lugar == undefined  || vm.Lugar == ''){
                   vm.mensajeLugar = "Debes seleccionar una opción";
                    return;
              } 

                 
              if(vm.Descripcion == undefined  || vm.Descripcion == ''){
                   vm.mensajeDescripcion = "Debes seleccionar una opción";
                    return;
              }


              if(vm.Estado == undefined  || vm.Estado == '0'){
                   vm.mensajeEstado = "Debes seleccionar una opción";
                    return;
              }



          var mes = vm.FechaI.getMonth()+1;  
          var mes = vm.FechaF.getMonth()+1; 
          var requestJson = {
                    "idEvento" : vm.IdEvento,
                    "nombre" : vm.nombre,
                    "usuario": vm.Usuario ,
                    "fechai" : vm.FechaI,
                    "fechaf" : vm.FechaF,
                    "lugar" : vm.Lugar,                 
                    "descripcion" : vm.Descripcion,
                    "estado" : vm.Estado,
                     "imagen" : vm.thumbnail.dataUrl                
                    }
             console.log(JSON.stringify(requestJson));
             jQuery(window).spin();       
             registarEventoServices.registrarEvento(requestJson).then(function(data){
              jQuery(window).spin();
              vm.thumbnail.dataUrl = getBase64Image(document.getElementById("img"));
                if(data.resultado[0].codRespuesta == "200") {     
                       $mdDialog.show(
                       $mdDialog.alert()
                       .parent(angular.element(document.querySelector('#dialogContainer')))
                       .clickOutsideToClose(true)
                       .title('Registrar Evento')
                       .textContent('Se registró el evento exitósamente.')
                       .ariaLabel('Se registró el evento exitósamente.')
                       .ok('Cerrar')                     
                      );
                      
                     vm.IdEvento = "",
                     vm.Nombre = "",
                     vm.Usuario  = "",
                     vm.FechaI = "",
                     vm.FechaF = "",
                     vm.Lugar = "",                  
                     vm.Descripcion = "",
                     vm.Estado = "",
                     vm.thumbnail.dataUrl = "";
                     vm.thumbnail = {
                    dataUrl: ''
                    };               

                }else if(data.resultado[0].codRespuesta == "201"){
                       $mdDialog.show(
                       $mdDialog.alert()
                       .parent(angular.element(document.querySelector('#dialogContainer')))
                       .clickOutsideToClose(true)
                       .title('Registrar Evento')
                       .textContent('Evento no registrado')
                       .ariaLabel('Evento no registrado')
                       .ok('Cerrar')                     
                      );
                }else if(data.resultado[0].codRespuesta == "202"){
                       $mdDialog.show(
                       $mdDialog.alert()
                       .parent(angular.element(document.querySelector('#dialogContainer')))
                       .clickOutsideToClose(true)
                       .title('Registrar Evento')
                       .textContent('El Evento ya se encuentra registrado.')
                       .ariaLabel('El Evento ya se enuentra registrado.')
                       .ok('Cerrar')                     
                      );
                }           
             });
        } 


        function actualizar(){ 
          
          if(vm.Nombre == undefined  || vm.Nombre  == ''){
            vm.mensajeNombre = "Debes ingresar un dato válido para este campo";
            return;
          }
          
          
          if(vm.Usuario == undefined  || vm.Usuario  == ''){
            vm.mensajeUsuario = "Debes ingresar un dato válido para este campo";
            return;
          }
          
          
          if(vm.FechaI <= new Date()){
            vm.mensajeFechaI = "La fecha debe ser mayor a la fecha actual";
            return;
          }
          
          if(vm.FechaF >= new Date()){
            vm.mensajeFechaF = "La fecha debe ser menor a la fecha actual";
            return;
          }

         if(vm.Lugar == undefined  || vm.Lugar == ''){
               vm.mensajeLugar = "Debes seleccionar una opción";
                return;
          } 

             
          if(vm.Descripcion == undefined  || vm.Descripcion == ''){
               vm.mensajeDescripcion = "Debes seleccionar una opción";
                return;
          }


          if(vm.Estado == undefined  || vm.Estado == '0'){
               vm.mensajeEstado = "Debes seleccionar una opción";
                return;
          }
          
  
           var mes = vm.FechaI.getMonth()+1; 
           var mes = vm.FechaN.getMonth()+1; 
          var requestJson = {
                    "idEvento" : vm.IdEvento,
                    "nombre" : vm.Nombre,
                    "usuario": vm.Usuario ,
                    "fechai" : vm.FechaI,
                    "fechaf" : vm.FechaF,
                    "lugar" : vm.Lugar,                    
                    "descripcion" : vm.Descripcion,
                    "estado" : vm.Estado,
                    "imagen" : vm.thumbnail.dataUrl                   
                    }         

          
               console.log(JSON.stringify(requestJson));
               jQuery(window).spin();       
             registarEventoServices.actualizarEvento(requestJson).then(function(data){
              jQuery(window).spin();
              vm.thumbnail.dataUrl = getBase64Image(document.getElementById("img"));
                if(data.resultado[0].codRespuesta == "200") {     
                       $mdDialog.show(
                       $mdDialog.alert()
                       .parent(angular.element(document.querySelector('#dialogContainer')))
                       .clickOutsideToClose(true)
                       .title('Actualizar evento')
                       .textContent('Se actualizó evento exitósamente.')
                       .ariaLabel('Se actualizó eventoexitósamente.')
                       .ok('Cerrar')                     
                      );
                    vm.IdEvento2 = "";
                    vm.IdEvento = "";
                    vm.Nombre = "";                   
                    vm.FechaI = "";
                    vm.FechaF = "";
                    vm.Lugar = "";            
                    vm.Descripcion = "";
                    vm.Estado = "";
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
                       .title('Actualizar evento')
                       .textContent('evento no actualizado')
                       .ariaLabel('evento no actualizado')
                       .ok('Cerrar')                     
                      );
                }           
             });
        } 


        function consultar(){
            if(vm.IdEvento2 == undefined  || vm.IdEvento2  == ''){
                   vm.mensajeIdEvento2 = "Debes ingresar un id para consultar";
                   return;
             }
       

           var requestJson = {
                     "idEvento" : vm.IdEvento2,
                    "nombre" : vm.Nombre,
                    "usuario": vm.Usuario ,
                    "fechai" : vm.FechaI,
                    "fechaf" : vm.FechaF,
                    "lugar" : vm.Lugar,                  
                    "descripcion" : vm.Descripcion,
                    "estado" : vm.Estado,
                    "imagen" : vm.imagen                                        
                    }
                    jQuery(window).spin();
             registarEventoServices.consultarEventoServices(requestJson).then(function(data){
                   jQuery(window).spin();
                if(data.resultado[0].codRespuesta == "200") { 
                     $mdDialog.show(
                       $mdDialog.alert()
                       .parent(angular.element(document.querySelector('#dialogContainer')))
                       .clickOutsideToClose(true)
                       .title('Consultar Evento')
                       .textContent('Evento consultado.')
                       .ariaLabel('Evento consultado.')
                       .ok('Cerrar')                     
                      );
                    vm.IdEvento = vm.IdEvento2;
                    vm.Nombre = data.resultado[0].nombre,
                    vm.Usuario = data.resultado[0].usuario,
                    vm.FechaI = new Date(data.resultado[0].fechai),
                    vm.FechaF = new Date(data.resultado[0].fechaf),
                    vm.Lugar = data.resultado[0].lugar,
                    vm.Descripcion = data.resultado[0].descripcion,                
                    vm.Estado = data.resultado[0].estado,
                    vm.thumbnail.dataUrl =  data.resultado[0].imagen,

                    vm.IdEvento2 = ""; 
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
                       .title('Consultar Evento')
                       .textContent('Evento no consultada.')
                       .ariaLabel('Verifique el id del Evento.')
                       .ok('Cerrar')                     
                      );

                }            
             });
        } 



        function eliminar(){
         

        
           var requestJson = {
                     "idEvento" : vm.IdEvento,
                    "nombre" : vm.Nombre,
                    "usuario": vm.Usuario ,
                    "fechai" : vm.FechaI,
                    "fechaf" : vm.FechaF,
                    "lugar" : vm.Lugar,                
                    "descripcion" : vm.Descripcion,
                    "estado" : vm.Estado,
                    "imagen" : vm.imagen                                         
                    }
             jQuery(window).spin();
             registarMascotaServices.eliminarEvento(requestJson).then(function(data){
               jQuery(window).spin();
               vm.thumbnail.dataUrl = getBase64Image(document.getElementById("img"));
                if(data.resultado[0].codRespuesta == "200") { 
                     $mdDialog.show(
                       $mdDialog.alert()
                       .parent(angular.element(document.querySelector('#dialogContainer')))
                       .clickOutsideToClose(true)
                       .title('Eliminar evento')
                       .textContent('Evento eliminado exitósamente.')
                       .ariaLabel('Evento eliminado exitósamente.')
                       .ok('Cerrar')                     
                      );
                    
                    vm.IdEvento = "";
                    vm.Nombre = "",                   
                    vm.FechaI = "",
                    vm.FechaF = "",
                    vm.Lugar = "",              
                    vm.Descripcion = "",
                    vm.Estado = "",
                     

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
                       .title('Eliminar Evento')
                       .textContent('Evento no eliminado.')
                       .ariaLabel('Evento no eliminado.')
                       .ok('Cerrar')                     
                      );

                }            
             });
        }    

}        
    