var app = angular.module('HotelReservation');

app.controller('HotelCreateCtrl', userLoginCtrlConstructor);
userLoginCtrlConstructor.$inject = ['$injector'];

function userLoginCtrlConstructor($injector){
    var $http = $injector.get('$http');
    var $state = $injector.get('$state');
    var StateHandler = $injector.get('StateHandler');
    var Hotel = $injector.get('Hotel');
    var Room = $injector.get('Room');


    var vm = this;
    vm.hotel = new Hotel();
    vm.roomsToAdd = [];
    vm.room = new Room();
    vm.images = [];

    vm.createHotel = function () {
        $http.post('/hotel', hotel)
            .success(function(data) {
                console.log(data);
                $state.go(StateHandler.getPreviousStateName());
            })
            .error(function(err) {
                console.log(err);
            });
    };

    vm.addRoom = function () {

    };

    vm.checkRoomForm = function () {
      if(vm.room.type){

      }
    };

    vm.uploadImages = function () {
      console.log(vm.images);
    };

    vm.deleteImage = function (image) {
        vm.images.splice(vm.images.indexOf(image), 1);
    };

    vm.cancelCreate = function () {
        $state.go(StateHandler.getPreviousStateName());
    }
}
