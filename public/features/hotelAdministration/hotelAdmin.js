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
            console.log(data);
            vm.myHotels.push.apply(vm.myHotels, data.results);
        })
        .error(function(err) {
            console.log(err);
        });


    vm.onHotelClicked = function (item) {
        console.log(item);
    };

    vm.addHotel = function () {
        console.log("Add hotel");
        var hotel = new Hotel(undefined,
            "MyHotel_name",
            "me_owner",
            "This is the description",
            "Alma utca location",
            5,
            "",
            [new Room(
                undefined,
                "Standard type",
                "Room description",
                "",
                3,
                4
            )]
        );

        $http.post('/hotel', hotel)
            .success(function(data) {
                console.log(data);
                $state.go(StateHandler.getPreviousStateName());
            })
            .error(function(err) {
                console.log(err);
            });
    };
}
