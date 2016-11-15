var app = angular.module('HotelReservation');

app.controller('MyReservationCtrl', myReservationCtrlConstructor);
userLoginCtrlConstructor.$inject = ['$injector'];

function myReservationCtrlConstructor($injector){
    var $http = $injector.get('$http');
    var SessionService = $injector.get('SessionService');
    var $state = $injector.get('$state');
    var StateHandler = $injector.get('StateHandler');
    var Reservation = $injector.get('Reservation');

    var vm = this;

    vm.myReservations = [];


    $http.get('/reservation')
        .success(function(data) {
            vm.myReservations.push.apply(vm.myReservations, data.results);
            // console.log(data.results);
            console.log(vm.myReservations);
        })
        .error(function(err) {
            console.log(err);
        });

}
