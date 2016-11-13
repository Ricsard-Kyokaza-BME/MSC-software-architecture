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

    vm.cancelCreate = function () {
        $state.go(StateHandler.getPreviousStateName());
    }
}
