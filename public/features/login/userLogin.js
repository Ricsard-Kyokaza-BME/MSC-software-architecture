var app = angular.module('HotelReservation');

app.controller('UserLoginCtrl', userLoginCtrlConstructor);
userLoginCtrlConstructor.$inject = ['$injector'];

function userLoginCtrlConstructor($injector){
    var $http = $injector.get('$http');
    var $mdToast = $injector.get('$mdToast');
    var SessionService = $injector.get('SessionService');
    var $state = $injector.get('$state');
    var StateHandler = $injector.get('StateHandler');

    var vm = this;
    vm.loginObj = {};

    vm.sendLogin = function() {
        $http.post('/login', vm.loginObj)
            .success(function(data) {
                $state.go(StateHandler.getPreviousStateName());
                SessionService.put(data.user);
                $mdToast.show($mdToast.simple()
                    .content('Successfully logged in as ' + SessionService.getSignedInUser().getFullName()));
            })
            .error(function(err) {
                $mdToast.show($mdToast.simple().content('Login failed'));
                console.log(err);
            })
    };

    vm.goToRegister = function () {
        $state.go('registration');
    };

}
