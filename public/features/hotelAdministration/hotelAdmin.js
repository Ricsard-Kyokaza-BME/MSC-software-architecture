var app = angular.module('HotelReservation');

app.controller('HotelAdminCtrl', userLoginCtrlConstructor);
userLoginCtrlConstructor.$inject = ['$injector'];

function userLoginCtrlConstructor($injector){
    var $http = $injector.get('$http');
    var SessionService = $injector.get('SessionService');
    var $state = $injector.get('$state');
    var StateHandler = $injector.get('StateHandler');


    var vm = this;

    vm.myHotels = [];

    $http.get('/hotel/own')
        .success(function(data) {
            console.log(data);
            vm.myHotels = data.result;
        })
        .error(function(err) {
            console.log(err);
        })

}
