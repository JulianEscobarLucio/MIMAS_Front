angular
.module('mimasApp')
.controller('homeController', homeController);

function homeController($scope) {
  var vm = this;
   vm.rol = localStorage.getItem("rol");
   vm.bienvenidaUsuario = ", "+ localStorage.getItem("nombre");

} 
    
