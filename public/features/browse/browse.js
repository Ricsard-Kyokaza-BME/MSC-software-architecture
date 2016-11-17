var app = angular.module('HotelReservation');

app.controller('BrowseCtrl', browseConstructor);
browseConstructor.$inject = ['$injector'];

function browseConstructor($injector){
    var $http = $injector.get('$http');
    var $state = $injector.get('$state');
    var StateHandler = $injector.get('StateHandler');
    var Hotel = $injector.get('Hotel');
    var RoomType = $injector.get('RoomType');

    var vm = this;

    vm.hotels = [];
    vm.search = {
        personCount: 1,
        roomType: 'ANY'
    };
    vm.RoomTypeArray = getRoomTypeArray(RoomType);

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

    vm.sendSearch = function () {
        $http.post('/hotel/search', vm.search)
            .success(function(data) {
                console.log(data);
                vm.hotels.length = 0;
                vm.hotels.push.apply(vm.hotels, data.results);
            })
            .error(function(err) {
                console.log(err);
            });
    }

}
