    angular.module('mimasApp')
    .controller('mascotaController', mascotaController);

    function mascotaController($scope, $mdDialog,registarMascotaServices, $timeout) {
        var vm = this;
        vm.Fechai = "";
        vm.Fechaf = "";
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
        vm.mensajeUsuario = "";
        vm.mensajeFechai = "";
        vm.mensajeFechaf = "";
        vm.mensajeLugar = "";
        vm.mensajeDescripcion = "";
        vm.mensajeEstado = "";
        vm.functionId2 = functionId2;
        vm.functionNombre = functionNombre;
        vm.functionUsuario = functionUsuario;        
        vm.functionLugar = functionLugar;
        vm.functionDescripcion= functionDescripcion;        
        vm.functionEstado = functionEstado;
        vm.showConfirm = showConfirm;
        vm.cancelar = cancelar;
        vm.DisabledCancelar = true;
        vm.Usuario = localStorage.getItem("user"); 
        vm.imagen = "";
        vm.Fechai = new Date();
        vm.Fechaf = new Date();

   


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
      
      debugger;
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
        
        vm.Id2 = "";
        vm.Nombre = "";
        vm.Usuario  = "";
        vm.Fechai = "";
        vm.Fechaf = "";
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


 
      function functionId2(){
             if(vm.Id2.length > 0){
               vm.mensajeId2 ="";
             }
        }

        


        function functionNombre(){
             if(vm.Nombre.length > 0){
               vm.mensajeNombre ="";
             }
        }

        
        function functionUsuario(){
             if(vm.Usuario.length > 0){
               vm.mensajeUsuario ="";
             }
        }

        function functionFechai(){
          if(vm.Fechai < new Date()){
             vm.mensajeFechai ="";
          }
     }
      
     function functionFechaf(){
      if(vm.Fechaf < new Date()){
         vm.mensajeFechaf ="";
      }
 }

        
 function functionLugar(){
  if(vm.Lugar.length > 0){
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
              
              
              
              
              if(vm.Fechai >= new Date()){
                vm.mensajeFechai = "La fecha debe ser menor a la fecha actual";
                return;
              }

              if(vm.Fechaf >= new Date()){
                vm.mensajeFechaf = "La fecha debe ser menor a la fecha actual";
                return;
              }

              if(vm.Lugar == undefined  || vm.Lugar  == ''){
                vm.mensajeLugar = "Debes ingresar un dato válido para este campo";
                return;
              }

              if(vm.Descripcion == undefined  || vm.Descripcion  == ''){
                vm.mensajeDescripcion = "Debes ingresar un dato válido para este campo";
                return;
              }
                 
        
              if(vm.Estado == undefined  || vm.Estado == '0'){
                   vm.mensajeEstado = "Debes seleccionar una opción";
                    return;
              }


                

          var mes = vm.Fechai.getMonth()+1;  
          var requestJson = {
                    "id" : vm.Id,
                    "nombre" : vm.Nombre,
                    "usuario": vm.Usuario ,
                    "fechai" : "",
                    "fechaf" : "",
                    "lugar" : vm.Lugar,                 
                    "descripcion" : vm.Descripcion,
                    "estado" : vm.Estado,
                    "imagen" : vm.thumbnail.dataUrl                
                    }
             console.log(JSON.stringify(requestJson));
             jQuery(window).spin();       
             registarMascotaServices.registrarEvento(requestJson).then(function(data){
              jQuery(window).spin();
              vm.thumbnail.dataUrl = getBase64Image(document.getElementById("img"));
                if(data.resultado[0].codRespuesta == "200") {     
                       $mdDialog.show(
                       $mdDialog.alert()
                       .parent(angular.element(document.querySelector('#dialogContainer')))
                       .clickOutsideToClose(true)
                       .title('Registrar Evento')
                       .textContent('Se registró la evento exitósamente.')
                       .ariaLabel('Se registró la evento exitósamente.')
                       .ok('Cerrar')                     
                      );
                      
                     vm.Id = "",
                     vm.Nombre = "",
                     vm.Usuario  = "",
                     vm.Fechai = "",
                     vm.Fechaf = "",
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
                       .textContent('el Evento ya se encuentra registrado.')
                       .ariaLabel('el Evento ya se enuentra registrado.')
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
          
          if(vm.Nombre == undefined  || vm.Nombre  == ''){
            vm.mensajeNombre = "Debes ingresar un dato válido para este campo";
            return;
          }
          
          
          if(vm.Usuario == undefined  || vm.Usuario  == ''){
            vm.mensajeUsuario = "Debes ingresar un dato válido para este campo";
            return;
          }
          
                   
          
          if(vm.Fechai >= new Date()){
             vm.mensajeFechai= "La fecha debe ser menor a la fecha ";
             return;
           }

           if(vm.Fechaf >= new Date()){
            vm.mensajeFechaf = "La fecha debe ser menor a la fecha ";
            return;
          }

          if(vm.Lugar == undefined  || vm.Lugar  == ''){
            vm.mensajeLugar = "Debes ingresar un dato válido para este campo";
            return;
          }
          
          if(vm.Descripcion == undefined  || vm.Descripcion  == ''){
            vm.mensajeDescripcion = "Debes ingresar un dato válido para este campo";
            return;
          }

                 
              


              if(vm.Estado == undefined  || vm.Estado == '0'){
                   vm.mensajeEstado = "Debes seleccionar una opción";
                    return;
              }


              
  
           var mes = vm.fechaN.getMonth()+1; 
          var requestJson = {
                    "id" : vm.Id,
                    "nombre" : vm.Nombre,
                    "usuario": vm.Usuario ,
                    "fechai" : vm.Fechai ,
                    "fechaf" : vm.Fechaf ,
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
                       .textContent('Se actualizóel evento exitósamente.')
                       .ariaLabel('Se actualizó el evento exitósamente.')
                       .ok('Cerrar')                     
                      );
                    vm.Id2 = "";
                    vm.Id = "";
                    vm.Nombre = "";                   
                    vm.Fechai = "";
                    vm.Fechaf = "";
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
            if(vm.Id2 == undefined  || vm.Id2  == ''){
                   vm.mensajeId2 = "Debes ingresar un id para consultar";
                   return;
             }
       

           var requestJson = {
                     "id" : vm.Id2,
                     
                     "nombre" : vm.Nombre,
                     "usuario": vm.Usuario ,
                     "fechai" : vm.Fechai ,
                     "fechaf" : vm.Fechaf ,
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
                    vm.Id = vm.Id2;
                    vm.Nombre = data.resultado[0].nombre,
                    vm.Usuario  = data.resultado[0].idResponsable,
                    vm.Fechai = new Date(data.resultado[0].fechai),
                    vm.Fechaf = new Date(data.resultado[0].fechaf),
                    vm.Lugar = data.resultado[0].genero,                
                    vm.Descripcion = data.resultado[0].tamano,
                    vm.Estado = data.resultado[0].estado,
                   
                    vm.thumbnail.dataUrl =  data.resultado[0].imagen,

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
                       .textContent('Evento no consultado.')
                       .ariaLabel('Verifique el identificador del evento.')
                       .ok('Cerrar')                     
                      );

                }            
             });
        } 



        function eliminar(){
         

        
           var requestJson = {
                     "id" : vm.Id,
                    "nombre" : vm.Nombre,
                    "usuario": vm.Usuario ,
                    "fechai" : vm.Fechai,
                    "fechaf" : vm.Fechaf,
                    "lugar" : vm.Lugar,                
                    "descripcion" : vm.Descripcion,
                    "estado" : vm.Estado,
                    
                    "imagen" : vm.imagen                                         
                    }
             jQuery(window).spin();
             registarEventoServices.eliminarEvento(requestJson).then(function(data){
               jQuery(window).spin();
               vm.thumbnail.dataUrl = getBase64Image(document.getElementById("img"));
                if(data.resultado[0].codRespuesta == "200") { 
                     $mdDialog.show(
                       $mdDialog.alert()
                       .parent(angular.element(document.querySelector('#dialogContainer')))
                       .clickOutsideToClose(true)
                       .title('Eliminar evento')
                       .textContent('evento eliminado exitósamente.')
                       .ariaLabel('evento eliminado exitósamente.')
                       .ok('Cerrar')                     
                      );
                    
                    vm.Id = "";
                    vm.Nombre = "",                   
                    vm.Fechai = "",
                    vm.Fechaf = "",
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
                       .ariaLabel('Evento no eliminado')
                       .ok('Cerrar')                     
                      );

                }            
             });
        }    

}        
    