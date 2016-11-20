var app = angular.module('HotelReservation');

app.controller('HotelDetailsCtrl', hotelDetailsCtrlConstructor);
hotelDetailsCtrlConstructor.$inject = ['$scope', '$injector'];

function hotelDetailsCtrlConstructor($scope, $injector){
    var $http = $injector.get('$http');
    var SessionService = $injector.get('SessionService');
    var $state = $injector.get('$state');
    var StateHandler = $injector.get('StateHandler');
    var Hotel = $injector.get('Hotel');
    var Room = $injector.get('Room');
    var Reservation = $injector.get('Reservation');
    var $stateParams = $injector.get('$stateParams');
    var $mdToast = $injector.get('$mdToast');
    var Review = $injector.get('Review');
    var RoomType = $injector.get('RoomType');

    var vm = this;

    vm.hotel = {};
    vm.reviews = [];
    vm.revievRating = undefined;
    vm.datePicker = {startDate: new Date(), endDate: new Date()};
    vm.canAddReview = false;
    vm.reviewToSend = {};

    vm.roomsToAddArray = [];
    vm.roomAdditionOngoing = false;
    vm.RoomTypeArray = getRoomTypeArray(RoomType);
    vm.room = new Room();

    vm.modifyRoom = true;

    $http.get('/hotel/' + $stateParams.hotelId)
        .success(function(data) {
            vm.hotel = data;
        })
        .error(function(err) {
            console.log(err);
        });


    /* Reservations */

    $scope.$watch(function () {
        return vm.datePicker;
    }, function () {
        $http.post('/hotel/' + $stateParams.hotelId + '/rooms', vm.datePicker)
            .success(function(data) {
                vm.hotel.rooms = [];
                vm.hotel.rooms.push.apply(vm.hotel.rooms, data);
            })
            .error(function(err) {
                console.log(err);
            });
    }, true);

    vm.addReservation = function (roomItem) {
        var reservation = new Reservation('','',roomItem._id, vm.hotel._id, vm.datePicker.startDate, vm.datePicker.endDate);

        if(vm.validateDates(vm.datePicker.startDate, vm.datePicker.endDate)){
            $http.post('/reservation', reservation.transformToSend())
                .success(function(data) {
                    $mdToast.show($mdToast.simple().content('Reservation done!'));
                })
                .error(function(err) {
                    $mdToast.show($mdToast.simple().content('Failed to create reservation!'));
                    console.log(err);
                });
        }else {
            $mdToast.show($mdToast.simple().content('Please select a valid START and END date!'));
        }
    };

    vm.validateDates = function (startD, endD) {
        var currentDate = Date.now();
        var end;

        ((startD == undefined || endD == undefined)
        || (startD < currentDate || endD < currentDate)
        || (endD < startD)) ? end = undefined : end = true;

        return end;
    };


    /* Reviews */

    $http.get('/review/' + $stateParams.hotelId)
        .success(function(data) {
            vm.reviews.push.apply(vm.reviews, data.results);
            vm.revievRating = data.averageRating;
        })
        .error(function(err) {
            console.log(err);
        });

    vm.saveReview = function () {
        vm.canAddReviewClicked();
        var rev = new Review( '', '', vm.hotel._id, vm.reviewToSend.description, new Date(), vm.reviewToSend.rating);
        $http.post('/review', rev.transformToSend())
            .success(function(data) {
                $mdToast.show($mdToast.simple().content('Review successfully added.'));
                vm.reviews.push(data);
                vm.reviewToSend = {};
            })
            .error(function(err) {
                $mdToast.show($mdToast.simple().content('Review failed'));
                console.log(err);
            })
    };

    vm.canAddReviewClicked = function () {
        vm.canAddReview = !vm.canAddReview;
    };

    vm.deleteReview = function (revItem) {
        $http.delete('/review/' + revItem._id)
            .success(function(data) {
                _.delete(vm.reviews, function (element) {
                    return element._id == data.id;
                });
            })
            .error(function(err) {
                console.log(err);
            });
    };


    /* Details */

    vm.getStarsRange = function(count){
        var ratings = [];
        for (var i = 0; i < count; i++) {
            ratings.push(i)
        }

        return ratings;
    };


    /* Rooms */

    vm.addRoom = function () {
        vm.room.hotelId = vm.hotel._id;
        vm.roomsToAddArray.push(vm.room);
        vm.room = new Room();
    };

    vm.deleteRoom = function (item) {
        $http.delete('/room/' + vm.hotel._id + '/room/' + item._id)
            .success(function(data) {
                _.delete(vm.hotel.rooms, function (element) {
                    return element._id == data.id;
                });
            })
            .error(function(err) {
                console.log(err);
            });
    };

    vm.roomAdditionCanceled = function () {
        vm.roomsToAddArray = [];
        vm.room = new Room();
    };

    vm.roomAdditionDone = function () {
        for (var i = 0; i < vm.roomsToAddArray.length; i++){
            $http.post('/room/' + vm.hotel._id + '/room', vm.roomsToAddArray[i])
                .success(function(data) {
                    vm.hotel.rooms.push(data);
                })
                .error(function(err) {
                    console.log(err);
                });
        }

        // clear the array and room variable
        vm.roomAdditionCanceled();
    };

    function getRoomTypeArray(roomType) {
        return _.map(roomType, function (element) {
            return { text: element.replace('_', ' '), value: element };
        });
    }

}
