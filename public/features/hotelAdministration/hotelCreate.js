var app = angular.module('HotelReservation');

app.controller('HotelCreateCtrl', userLoginCtrlConstructor);
userLoginCtrlConstructor.$inject = ['$scope', '$injector'];

function userLoginCtrlConstructor($scope, $injector){
    var $http = $injector.get('$http');
    var $state = $injector.get('$state');
    var StateHandler = $injector.get('StateHandler');
    var $mdToast = $injector.get('$mdToast');
    var Hotel = $injector.get('Hotel');
    var Room = $injector.get('Room');
    var Upload = $injector.get('Upload');

    var vm = this;

    vm.hotel = new Hotel();
    vm.room = new Room();
    vm.roomsToAdd = [];
    vm.images = [];

    vm.createHotel = function () {
        vm.hotel.rooms = _.map(vm.roomsToAdd, function (element) {
           return element.transformToSend();
        });
        $http.post('/hotel', vm.hotel)
            .success(function(data) {
                $mdToast.show($mdToast.simple().content('Hotel created successfully'));
                vm.uploadImages(data._id);
            })
            .error(function(err) {
                $mdToast.show($mdToast.simple().content('Failed to create hotel'));
                console.log(err);
            });
    };

    vm.createRoom = function () {
        vm.room.type == '' ? $scope.createHotelForm.type.$invalid = true : $scope.createHotelForm.type.$invalid = false;
        vm.room.description == '' ? $scope.createHotelForm.description.$invalid = true : $scope.createHotelForm.description.$invalid = false;
        vm.room.capacity == 0 ? $scope.createHotelForm.capacity.$invalid = true : $scope.createHotelForm.capacity.$invalid = false;
        vm.room.quantity == 0 ? $scope.createHotelForm.quantity.$invalid = true : $scope.createHotelForm.quantity.$invalid = false;
        if(vm.room.type != '' && vm.room.description != '' && vm.room.capacity != 0 && vm.room.quantity != 0) {
            vm.roomsToAdd.push(angular.copy(vm.room));
            vm.room = new Room();
        }
    };

    vm.uploadImages = function (hotelID) {
        console.log(vm.images);
        Upload.upload({
            url: '/hotel/' + hotelID + '/image',
            method: 'POST',
            arrayKey: '',
            data: { images: vm.images }
        }).then(function (resp) {
            $mdToast.show($mdToast.simple().content('Images uploaded successfully'));
            $state.go(StateHandler.getPreviousStateName());
            vm.uploadProgress = undefined;
        }, function (resp) {
            $mdToast.show($mdToast.simple().content('Failed to image upload'));
            console.log('Error status: ' + resp.status);
            vm.uploadProgress = undefined;
        }, function (evt) {
            vm.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
        });
    };

    vm.deleteImage = function (image) {
        vm.images.splice(vm.images.indexOf(image), 1);
    };

    vm.deleteRoom = function (room) {
        vm.roomsToAdd.splice(vm.roomsToAdd.indexOf(room), 1);
    };

    vm.cancelCreate = function () {
        $state.go(StateHandler.getPreviousStateName());
    }
}
