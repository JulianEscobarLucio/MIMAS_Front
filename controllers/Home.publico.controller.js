angular.module('mimasApp')
.controller('homepublicoController', homepublicoController);

function homepublicoController($scope,$location, $mdDialog, homePublicoService) {
    var vm = this;
    vm.listaMascota=[]; 
    vm.numPages = numPages;
    listarSolicitudes();
    vm.adoptar = adoptar;
    vm.$location = $location;


    function listarSolicitudes(){
        homePublicoService.listarMascota().then(function(data){
            vm.listaMascota = data.resultado;
            vm.filteredTodos = []
            ,vm.currentPage = 1
            ,vm.numPerPage = 5
            ,vm.maxSize = 5;
        });
      }

      function numPages() {
        return Math.ceil(vm.listaMascota.length / vm.numPerPage);
      };
      
      $scope.$watch('vm.currentPage + vm.numPerPage', function() {
        var begin = ((vm.currentPage - 1) * vm.numPerPage)
        , end = begin + vm.numPerPage;
        
        vm.filteredTodos = vm.listaMascota.slice(begin, end);
      });


      function adoptar(id){
        vm.$location.path('/login-adopcion/'+id)
      }
}        


