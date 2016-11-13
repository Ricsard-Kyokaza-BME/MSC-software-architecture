var app = angular.module('HotelReservation');

app.controller('UserRegistrationCtrl', userRegistrationCtrlConstructor);
userRegistrationCtrlConstructor.$inject = ['$injector'];

function userRegistrationCtrlConstructor($injector){
    var $http = $injector.get('$http');
    var $mdToast = $injector.get('$mdToast');
    var $mdDialog = $injector.get('$mdDialog');
    var $state = $injector.get('$state');
    var StateHandler = $injector.get('StateHandler');

    var vm = this;
    vm.user = {};
    vm.user.hotels = [];
    vm.user.role = 'guest';

    vm.registerUser = function() {
        $http.post('/registration', vm.user)
            .success(function(data) {
                $mdToast.show($mdToast.simple().content('SUCCESS'));
                $state.go(StateHandler.getPreviousStateName());
            })
            .error(function(err) {
                $mdToast.show($mdToast.simple().content('FAILED'));
                console.log(err);
            });
    };


    //Password validation
    var password = document.getElementById("password");
    var confirm_password = document.getElementById("password2");

    function validatePassword(){
        if(password.value != confirm_password.value) {
            confirm_password.setCustomValidity('Password mismatch');
        } else {
            confirm_password.setCustomValidity('');
        }
    }

    password.onchange = validatePassword;
    confirm_password.onkeyup = validatePassword;
}