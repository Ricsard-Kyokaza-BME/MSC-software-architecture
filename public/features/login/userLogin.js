var app = angular.module('HotelReservation');

app.controller('UserLoginCtrl', userLoginCtrlConstructor);
userLoginCtrlConstructor.$inject = ['$injector'];

function userLoginCtrlConstructor($injector){
    var $http = $injector.get('$http');
    var SessionService = $injector.get('SessionService');
    var $state = $injector.get('$state');
    var StateHandler = $injector.get('StateHandler');


    var vm = this;

    vm.loginObj = {};

    vm.sendLogin = function() {
        console.log("LOGIN");
        console.log(vm.loginObj);

        $http.post('/login', vm.loginObj)
            .success(function(data) {
                console.log(data);
                $state.go(StateHandler.getPreviousStateName());
                SessionService.put(data.user);
            })
            .error(function(err) {
                console.log(err);
            })
    };

    vm.goToRegister = function () {
        $state.go('registration');
    };

}
