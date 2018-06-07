angular.module('mimasApp')
.controller('estadoSolicitudApadrinamientoController', estadoSolicitudApadrinamientoController);

function estadoSolicitudApadrinamientoController($scope,$location, $mdDialog, $timeout,$interval, estadoSolicitudApadrinamientoService,$routeParams) {
    var vm = this;
    var archivoBase64='';
    var extenciones = new Array("pdf")
    vm.extencionesPermitidas=' Extenciones permitidas: pdf. ';
    vm.mensajeAdjunto = '';
    var fileReader;
    vm.estado = "";
    vm.consultar = consultar;
    vm.actualizar = actualizar;
    vm.descargarPDF = descargarPDF;
    vm.idSolicitud = $routeParams.idSolicitud;
    vm.archivo = '' ;
    vm.$location = $location;
    vm.atras = atras;
    vm.rol = sessionStorage.getItem("rol");
    vm.bienvenidaUsuario =", "+ sessionStorage.getItem("nombre");
    consultar();
  
    $scope.fileChanged = function(files){
        //Read File
        var selectedFile = files;
        if (selectedFile.length > 0) {
            var extension = selectedFile.name.split(".")[1]; 
            if(extencionesContains(extension)){
                var fileToLoad = selectedFile;
                fileReader = new FileReader();
                var base64;
                fileReader.onload = function(fileLoadedEvent) {
                    base64 = fileLoadedEvent.target.result;
                    console.log(base64);
                };
                 fileReader.readAsDataURL(fileToLoad);
                 console.log(fileReader.result);
                 vm.mensajeAdjunto = '';
            }else{
                vm.mensajeAdjunto = 'La extención del archivo no es permitida.';
                document.getElementById("file").value = "";
            }
        }
      }
      
      function extencionesContains(obj) {
        var i = extenciones.length;
        while (i--) {
           if (extenciones[i] === obj) {
               return true;
           }
        }
        return false;
    }
        
    

    function descargarPDF(){
        var dlnk = document.getElementById('dwnldLnk');
        dlnk.href = vm.archivo;    
        dlnk.click();
    }


    function consultar(){
        debugger;
           jQuery(window).spin();
         estadoSolicitudApadrinamientoService.consultarSolicitud(vm.idSolicitud).then(function(data){
            jQuery(window).spin();
            if(data.resultado.codigoRespuesta == "200") { 
                vm.mensajeMascota ='';
                vm.mensajeNombreAdjunto = '';
                vm.mensajeAdjunto = '';  
                vm.usuario = data.resultado.usuario;
                vm.mascota = data.resultado.idMascota;
                vm.nombreAdjunto = data.resultado.nombreAdjunto;
                vm.estado = data.resultado.estadoSolicitud;
                vm.archivo =  data.resultado.adjunto ;
             
                vm.Id = ""; 
                vm.idDisabled = true;
                vm.DisabledActualizar = false;
                vm.DisabledEnviar = true;
                vm.DisabledConsultar = true; 
            }else {
                  $mdDialog.show(
                   $mdDialog.alert()
                   .parent(angular.element(document.querySelector('#dialogContainer')))
                   .clickOutsideToClose(true)
                   .title('Consultar solicitud')
                   .textContent('Solicitud no consultada.')
                   .ariaLabel('Verifique el id de la solicitud.')
                   .ok('Cerrar')                     
                  );

            }            
         });
    }
    
     function actualizar(){
         var requestJson ={
                'idApadrinamiento' : vm.idSolicitud ,
                'usuario' : vm.usuario,
                'idMascota' : vm.mascota,
                'nombreAdjunto' : vm.nombreAdjunto,
                'estadoSolicitud' : vm.estado,
                'adjunto' :vm.archivo
         };
         jQuery(window).spin();
         estadoSolicitudApadrinamientoService.actualizarSolicitud(requestJson).then(function(data){
            jQuery(window).spin();
            if(data.resultado == "200") {     
                   $mdDialog.show(
                     $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#dialogContainer')))
                        .clickOutsideToClose(true)
                        .title('Solicitud de apadrinamiento')
                        .textContent('Se actualizó la solicitud exitósamente.')
                        .ariaLabel('Se actualizó la solicitud exitósamente.')
                        .ok('Cerrar')                     
                    );
                    
                   vm.mascota = '';
                   vm.nombreAdjunto = '';
                   vm.adjunto = '';
                   vm.Id = ""; 
                   vm.idDisabled = false;
                   vm.DisabledActualizar = true;
                   vm.DisabledEnviar = false;
                   vm.DisabledConsultar = false; 
                  

              }else if(data.resultado == "201"){
                     $mdDialog.show(
                     $mdDialog.alert()
                     .parent(angular.element(document.querySelector('#dialogContainer')))
                     .clickOutsideToClose(true)
                     .title('Solicitud de apadrinamiento')
                     .textContent('La identificación de la solicitud no existe, la solicitud no fue actualizada.')
                     .ariaLabel('No se actualizó la solicitud.')
                     .ok('Cerrar')                     
                    );

                    vm.mascota = "";
                    vm.nombreAdjunto = "";
                    document.getElementById("file").value = "";
              }         
           });

    }

    function atras(){;
        vm.$location.path('/solicitud-apadrinamiento')
    }
}