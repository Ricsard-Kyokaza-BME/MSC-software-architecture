var app = angular.module('HotelReservation');

app.controller('HotelCreateCtrl', userLoginCtrlConstructor);
userLoginCtrlConstructor.$inject = ['$scope', '$injector'];

function userLoginCtrlConstructor($scope, $injector){
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

    vm.createRoom = function () {
        vm.room.type=='' ? $scope.createHotelForm.type.$invalid = true : $scope.createHotelForm.type.$invalid = false;
        vm.room.description=='' ? $scope.createHotelForm.description.$invalid = true : $scope.createHotelForm.description.$invalid = false;
        vm.room.capacity==0 ? $scope.createHotelForm.capacity.$invalid = true : $scope.createHotelForm.capacity.$invalid = false;
        vm.room.quantity==0 ? $scope.createHotelForm.quantity.$invalid = true : $scope.createHotelForm.quantity.$invalid = false;
        if(vm.room.type!='' && vm.room.description!='' && vm.room.capacity!=0 && vm.room.quantity!=0){
            vm.roomsToAdd.push(angular.copy(vm.room));
            vm.room = new Room();
        }else{

        }
    };

    vm.uploadImages = function () {
      console.log(vm.images);
    };

    vm.cancelCreate = function () {
        $state.go(StateHandler.getPreviousStateName());
    }
}
