var app = angular.module('HotelReservation');
app.controller('UserRegistrationCtrl', function($http, $mdToast){
    var vm = this;
    vm.user = {};
    vm.user.hotels = [];
    vm.user.role = 'guest';

    vm.registerUser = function() {
        $http.post('/registration', vm.user)
            .success(function(data) {
                $mdToast.show($mdToast.simple().content('SUCCESS'));
                console.log(data);
            })
            .error(function(err) {
                $mdToast.show($mdToast.simple().content('FAILED'));
                console.log(err);
            })
    };

    vm.roleOnChange = function (it) {
        if(it) {
            vm.user.role = 'guest';
        } else {
            vm.user.role = 'host';
        }
    };

});