angular.module('mimasApp')
.controller('solicitudAdopcionController', solicitudAdopcionController);

function solicitudAdopcionController($scope, $mdDialog, $timeout,$interval, solicituAdopcionService) {
     var vm = this;
    listarSolicitud();
 
     function listarSolicitud(){
    //   jQuery(window).spin();
      solicituAdopcionService.listarSolicitud().then(function(data){
        //  jQuery(window).spin();
         if(data.resultado[0].codRespuesta == "200") { 
             vm.listaSolicitud = data.resultado[0].listaSolicitud;
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

}