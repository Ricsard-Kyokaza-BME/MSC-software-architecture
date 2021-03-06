var app = angular.module('HotelReservation');

app.controller('HotelAdminCtrl', userLoginCtrlConstructor);
userLoginCtrlConstructor.$inject = ['$injector'];

function userLoginCtrlConstructor($injector){
    var $http = $injector.get('$http');
    var SessionService = $injector.get('SessionService');
    var $state = $injector.get('$state');
    var StateHandler = $injector.get('StateHandler');
    var Hotel = $injector.get('Hotel');
    var Room = $injector.get('Room');

    var vm = this;

    vm.myHotels = [];

    $http.get('/hotel/own')
        .success(function(data) {
            vm.myHotels.push.apply(vm.myHotels, data.results);
        })
        .error(function(err) {
            console.log(err);
        });


    vm.onHotelClicked = function (item) {
        $state.go('hotelsDetails', {hotelId: item._id});
    };

    vm.onHotelEditClicked = function (id) {
        $state.go('hotelsEdit', {hotelId: id});
    };

    vm.createNewHotel = function () {
        $state.go('hotelsCreate');
    };

    vm.deleteHotel = function (id) {
        $http.delete('/hotel/' + id)
            .success(function(data) {
                _.delete(vm.myHotels, function (element) {
                    return element._id == data.id;
                })
            })
            .error(function(err) {
                console.log(err);
            });
    }
}
