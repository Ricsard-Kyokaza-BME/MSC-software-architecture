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
        })
        .error(function(err) {
            console.log(err);
        });

    vm.deleteReservation = function (id) {
        $http.delete('/reservation/' + id)
            .success(function(data) {
                _.delete(vm.myReservations, function (element) {
                   return element._id == data.id;
                });
            })
            .error(function(err) {
                console.log(err);
            });
    }
}
