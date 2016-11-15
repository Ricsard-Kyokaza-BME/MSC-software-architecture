var app = angular.module('HotelReservation');

app.controller('HotelDetailsCtrl', userLoginCtrlConstructor);
userLoginCtrlConstructor.$inject = ['$injector'];

function userLoginCtrlConstructor($injector){
    var $http = $injector.get('$http');
    var SessionService = $injector.get('SessionService');
    var $state = $injector.get('$state');
    var StateHandler = $injector.get('StateHandler');
    var Hotel = $injector.get('Hotel');
    var Room = $injector.get('Room');
    var $stateParams = $injector.get('$stateParams');


    var vm = this;

    vm.hotel = {};

    $http.get('/hotel/' + $stateParams.hotelId)
        .success(function(data) {
            vm.hotel = data;
            console.log(vm.hotel);
        })
        .error(function(err) {
            console.log(err);
        });

}
