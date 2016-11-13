var app = angular.module('HotelReservation');
app.controller('UserLoginController', function($http, $mdToast, $mdDialog){
    var vm = this;
    vm.user = {};
    vm.user.hotels = [];
    vm.user.role = 'guest';

    vm.registerUser = function() {
        $http.post('/registration', vm.user)
            .success(function(data) {
                $mdToast.show($mdToast.simple().content('SUCCESS'));
                $mdDialog.hide();
            })
            .error(function(err) {
                $mdToast.show($mdToast.simple().content('FAILED'));
                $mdDialog.hide();
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