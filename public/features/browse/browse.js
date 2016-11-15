var app = angular.module('HotelReservation');

app.controller('BrowseCtrl', browseConstructor);
browseConstructor.$inject = ['$injector'];

function browseConstructor($injector){
    var $http = $injector.get('$http');
    var $state = $injector.get('$state');
    var StateHandler = $injector.get('StateHandler');
    var Hotel = $injector.get('Hotel');

    var vm = this;

    vm.hotels = [];

    $http.get('/hotel')
        .success(function(data) {
            console.log(data);
            vm.hotels.push.apply(vm.hotels, data.results);
        })
        .error(function(err) {
            console.log(err);
        });

    vm.onHotelClicked = function (item) {
        console.log(item);
        $state.go('hotelsDetails', {hotelId: item._id});
    };

}
