var app = angular.module('HotelReservation');

app.controller('HotelDetailsCtrl', userLoginCtrlConstructor);
userLoginCtrlConstructor.$inject = ['$injector'];

function userLoginCtrlConstructor($injector){
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


    $http.get('/hotel/' + $stateParams.hotelId)
        .success(function(data) {
            vm.hotel = data;
            console.log(vm.hotel);
        })
        .error(function(err) {
            console.log(err);
        });

    $http.get('/review/' + $stateParams.hotelId)
        .success(function(data) {
            vm.reviews.push.apply(vm.reviews, data.results);
            vm.revievRating = data.averageRating;
            console.log(vm.reviews);
            console.log(vm.revievRating);
        })
        .error(function(err) {
            console.log(err);
        });

    $http.post('/hotel/' + $stateParams.hotelId + '/rooms', vm.datePicker)
        .success(function(data) {
            vm.hotel.rooms = [];
            vm.hotel.rooms.push.apply(vm.hotel.rooms, data);
        })
        .error(function(err) {
            console.log(err);
        });



    vm.addReservation = function (roomItem) {
        // console.log(roomItem);
        // console.log(vm.datePicker);
        var reservation = new Reservation('','',roomItem._id, vm.hotel._id, vm.datePicker.startDate, vm.datePicker.endDate);

        if(vm.validateDates(vm.datePicker.startDate, vm.datePicker.endDate)){
            $http.post('/reservation', reservation.transformToSend())
                .success(function(data) {
                    $mdToast.show($mdToast.simple().content('Reservation done!'));
                    console.log(data);
                })
                .error(function(err) {
                    $mdToast.show($mdToast.simple().content('Failed to create reservation!'));
                    console.log(err);
                    $state.go('login');
                });
        }else {
            $mdToast.show($mdToast.simple().content('Please select a START date and an END date!'));
        }
    };

    vm.validateDates = function (startD, endD) {
        var currentDate = Date.now();

        if(startD == undefined || endD == undefined){
            return undefined;
        }

        if(startD < currentDate || endD < currentDate){
            return undefined;
        }

        if(endD < startD){
            return undefined;
        }

        return true;
    };

    vm.addReview = function () {
        vm.canAddReviewClicked();
    };

    vm.saveReview = function () {
        vm.canAddReviewClicked();
        var rev = new Review( '', '', vm.hotel._id, vm.reviewToSend.description, new Date(), vm.reviewToSend.rating);
        $http.post('/review', rev.transformToSend())
            .success(function(data) {
                console.log(data);
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
        console.log(revItem);
        $http.delete('/review/' + revItem._id)
            .success(function(data) {
                console.log(data);
                _.delete(vm.reviews, function (element) {
                    return element._id == data.id;
                });
            })
            .error(function(err) {
                console.log(err);
            });
    };

    vm.getStarsRange = function(count){
        var ratings = [];

        for (var i = 0; i < count; i++) {
            ratings.push(i)
        }

        return ratings;
    };

    vm.addRoom = function () {
        vm.roomsToAddArray.push(vm.room);
        vm.room = new Room();
        // console.log(vm.room);
        // console.log(vm.roomsToAddArray);
    };

    vm.roomModification = function (roomToModify) {
        console.log("Modify room");
        console.log(roomToModify);

    };

    vm.roomAdditionCanceled = function () {
        vm.roomsToAddArray = [];
        vm.room = new Room();
    };

    vm.roomAdditionDone = function () {
        console.log("DONE");
        vm.roomsToAddArray.push(vm.room);
        // post rooms array to the hotel rooms

        // clear the array and room variable
    };

    function getRoomTypeArray(roomType) {
        return _.map(roomType, function (element) {
            return { text: element.replace('_', ' '), value: element };
        });
    }
}
