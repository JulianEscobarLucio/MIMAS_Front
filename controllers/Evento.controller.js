angular.module('mimasApp')
.controller('eventoController', eventoController);

function eventoController($scope, $mdDialog,registarEventoServices, $timeout,CONFIG,$location) {
    
  if(sessionStorage.getItem("access") != 'true' ){
    $location.url("/"); 
   }
   
    var vm = this;
    vm.FechaI = "";
    vm.FechaF = "";
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
    vm.mensajeLugar = "";
    vm.mensajeEstado = "";
    vm.mensajeDescripcion = "";
    vm.mensajeFechaI = "";
    vm.mensajeFechaF = "";
    vm.functionId2 = functionId2;
    vm.functionNombre = functionNombre;
    vm.functionResponsable = functionResponsable;
    vm.functionLugar = functionLugar;
    vm.functionEstado = functionEstado;
    vm.functionDescripcion = functionDescripcion;      
    vm.functionFechaI = functionFechaI;
    vm.functionFechaF = functionFechaF;
    
    vm.showConfirm = showConfirm;
    vm.cancelar = cancelar;
    vm.DisabledCancelar = true;
    vm.IdResponsable = sessionStorage.getItem("user"); 
    vm.imagen = "";
    vm.fechaI = new Date();
    vm.fechaF = new Date();
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
    vm.Lugar = "";
    vm.Estado = "",
    vm.Descripcion = "";
    vm.FechaI = "";
    vm.FechaF = "";
    
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

    
    function functionLugar(){
      if(vm.Lugar.length > 0){
        vm.mensajeLugar ="";
      }
 }

    function functionEstado(){
         if(vm.Estado != '0'){
           vm.mensajeEstado ="";
         }
    }

    function functionDescripcion(){
      if(vm.Descripcion.length > 0){
        vm.mensajeDescripcion ="";
      }
 }
   

    function functionFechaI(){
         if(vm.fechaI < new Date()){
            vm.mensajeFechaI ="";
         }
    }

    function functionFechaF(){
      if(vm.fechaF < new Date()){
         vm.mensajeFechaF ="";
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
          
          
        
          if(vm.fechaI <= new Date()){
            vm.mensajeFechaI = "La fecha debe ser mayor a la fecha actual";
            return;
          }

          if(vm.fechaF <= new Date()){
            vm.mensajeFechaF = "La fecha debe ser mayor a la fecha actual";
            return;
          }

          if(vm.Lugar == undefined  || vm.Lugar == ''){
            vm.mensajeLugar = "Debes ingresar un dato válido para este campo";
             return;
       }

          if(vm.Estado == undefined  || vm.Estado == '0'){
               vm.mensajeEstado = "Debes seleccionar una opción";
                return;
          }


          if(vm.Descripcion == undefined  || vm.Descripcion == ''){
               vm.mensajeDescripcion = "Debes ingresar un dato válido para este campo";
                return;
          }


          


         

      var mes = vm.fechaI.getMonth()+1; 
      var mes = vm.fechaF.getMonth()+1; 
      var requestJson = {
                "id" : vm.Id,
                "nombre" : vm.nombre,
                "idResponsable": vm.IdResponsable ,
                "lugar" : vm.Lugar,
                "estado" : vm.Estado,
                "descripcion" : vm.Descripcion,
                "fechaI" : "" ,
                "fechaF" : "" ,
               
                 "imagen" : vm.thumbnail.dataUrl                
                }
         jQuery(window).spin();       
         registarEventoServices.registrarEvento(requestJson).then(function(data){
         jQuery(window).spin();
         vm.thumbnail.dataUrl = getBase64Image(document.getElementById("img"));
         if(data.resultado.codigoRespuesta == "201") {     
              $mdDialog.show(
              $mdDialog.alert()
              .parent(angular.element(document.querySelector('#dialogContainer')))
              .clickOutsideToClose(true)
              .title('Registrar Evento')
              .textContent('Se registró el Evento exitósamente, identificador del Evento: ' +data.resultado.id)
              .ariaLabel('Se registró el Evento exitósamente.')
              .ok('Cerrar')                     
            );
                  
              vm.Id = "",
              vm.nombre = "",
              vm.IdResponsable  = "",
              vm.Lugar = "",
              vm.Estado = "",
              vm.Descripcion = "",
              vm.FechaI = "",
              vm.FechaF = "",
              
              vm.thumbnail.dataUrl = "";
              vm.thumbnail = {
              dataUrl: ''
            };               

            }else if(data.resultado.codigoRespuesta == "202" ){
                   $mdDialog.show(
                   $mdDialog.alert()
                   .parent(angular.element(document.querySelector('#dialogContainer')))
                   .clickOutsideToClose(true)
                   .title('Registrar Evento')
                   .textContent('Evento no registrado.')
                   .ariaLabel('Evento no registrado.')
                   .ok('Cerrar')                     
                  );
            }else if(data.resultado.codigoRespuesta == "203"){
                   $mdDialog.show(
                   $mdDialog.alert()
                   .parent(angular.element(document.querySelector('#dialogContainer')))
                   .clickOutsideToClose(true)
                   .title('Registrar Evento')
                   .textContent('El Evento ya se encuentra registrado.')
                   .ariaLabel('El Evento ya se enuentra registrado.')
                   .ok('Cerrar')                     
                  );
            }else if(data.resultado.codigoRespuesta == "500"){
              $mdDialog.show(
              $mdDialog.alert()
              .parent(angular.element(document.querySelector('#dialogContainer')))
              .clickOutsideToClose(true)
              .title('Registrar Evento')
              .textContent('Ocurrió un error tratando de registrar el evento.')
              .ariaLabel('El evento ya se enuentra registrada.')
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
      
      
      if(vm.fechaI <= new Date()){
        vm.mensajeFechaI = "La fecha debe ser menor a la fecha actual";
        return;
      }
      
      if(vm.fechaF <= new Date()){
         vm.mensajeFechaF = "La fecha debe ser menor a la fecha actual";
         return;
       }

       if(vm.Lugar == undefined  || vm.Lugar == ''){
        vm.mensajeLugar = "Debes ingresar un dato válido para este campo";
         return;
   }


          if(vm.Estado == undefined  || vm.Estado == '0'){
               vm.mensajeEstado = "Debes seleccionar una opción";
                return;
          }


          if(vm.Descripcion == undefined  || vm.Descripcion == ''){
               vm.mensajeDescripcion = "Debes ingresar un dato válido para este campo";
                return;
          }



       var mes = vm.fechaI.getMonth()+1; 
       var mes = vm.fechaF.getMonth()+1; 
      var requestJson = {
                "id" : vm.Id,
                "nombre" : vm.nombre,
                "idResponsable": vm.IdResponsable ,
                "lugar" : vm.Lugar,
                "estado" : vm.Estado,
                "descripcion" : vm.Descripcion,
                "fechaI" : vm.fechaI ,
                "fechaF" : vm.fechaF ,
                
                "imagen" : vm.thumbnail.dataUrl                   
                }         

      
          jQuery(window).spin();       
          registarEventoServices.actualizarEvento(requestJson).then(function(data){
          jQuery(window).spin();
          vm.thumbnail.dataUrl = getBase64Image(document.getElementById("img"));
          if(data.resultado == "200") {     
                   $mdDialog.show(
                   $mdDialog.alert()
                   .parent(angular.element(document.querySelector('#dialogContainer')))
                   .clickOutsideToClose(true)
                   .title('Actualizar Evento')
                   .textContent('Se actualizó el Evento exitosamente.')
                   .ariaLabel('Se actualizó el Evento exitosamente.')
                   .ok('Cerrar')                     
                  );
                vm.Id2 = "";
                vm.Id = "";
                vm.nombre = "";                   
                vm.Lugar = "";
                vm.Estado = "";
                vm.Descripcion = "";
                vm.FechaI = "";
                vm.FechaF = "";
                
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
                   .textContent('Evento no actualizado.')
                   .ariaLabel('Evento no actualizado.')
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
         registarEventoServices.consultarEventoServices(vm.Id2).then(function(data){
         jQuery(window).spin();
         if(data.resultado.nombre != null && data.resultado.nombre != "" ) { 
                 $mdDialog.show(
                   $mdDialog.alert()
                   .parent(angular.element(document.querySelector('#dialogContainer')))
                   .clickOutsideToClose(true)
                   .title('Consultar Evento')
                   .textContent('Evento consultada.')
                   .ariaLabel('Evento consultada.')
                   .ok('Cerrar')                     
                  );
                vm.Id = vm.Id2;
                vm.nombre = data.resultado.nombre;
                vm.IdResponsable  = data.resultado.idResponsable;
                vm.Lugar = data.resultado.lugar;
                vm.Estado = data.resultado.estado;
                vm.Descripcion = data.resultado.descripcion;
                vm.FechaI = new Date(data.resultado.fechaI);
                vm.FechaF = new Date(data.resultado.fechaF);
                
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
                   .title('Consultar Evento')
                   .textContent('Evento no consultada')
                   .ariaLabel('Verifique el id de la Evento.')
                   .ok('Cerrar')                     
                  );

            }            
         });
    } 



    function eliminar(){
         jQuery(window).spin();
         registarEventoServices.eliminarEvento(vm.Id).then(function(data){
          jQuery(window).spin();
           vm.thumbnail.dataUrl = getBase64Image(document.getElementById("img"));
            if(data.resultado == "200") { 
                 $mdDialog.show(
                   $mdDialog.alert()
                   .parent(angular.element(document.querySelector('#dialogContainer')))
                   .clickOutsideToClose(true)
                   .title('Eliminar Evento')
                   .textContent('Evento eliminado exitósamente.')
                   .ariaLabel('Evento eliminado exitósamente.')
                   .ok('Cerrar')                     
                  );
                
                vm.Id = "";
                vm.nombre = "",                   
                vm.Lugar = "",
                vm.Estado = "",
                vm.Descripcion = "",
                vm.FechaI = "",
                vm.FechaF = "",
                

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
