var app = angular.module('HotelReservation');

app.controller('HotelEditCtrl', hotelEditCtrlConstructor);
hotelEditCtrlConstructor.$inject = ['$scope', '$injector'];

function hotelEditCtrlConstructor($scope, $injector){
    var $http = $injector.get('$http');
    var $state = $injector.get('$state');
    var $stateParams = $injector.get('$stateParams');
    var StateHandler = $injector.get('StateHandler');
    var $mdToast = $injector.get('$mdToast');
    var Hotel = $injector.get('Hotel');
    var Upload = $injector.get('Upload');

    var vm = this;

    vm.type = 'edit';
    vm.hotel = new Hotel();
    vm.images = [];
    vm.place = {
        options: {
            types: '(cities, streets)',
            language: 'en',
            watchEnter: true
        },
        details: {}
    };

    $http.get('/hotel/' + $stateParams.hotelId)
        .success(function(data) {
            vm.hotel = data;
        })
        .error(function(err) {
            console.log(err);
        });

    vm.saveHotel = function () {
        $http.post('/hotel/' + $stateParams.hotelId, vm.hotel)
            .success(function(data) {
                $mdToast.show($mdToast.simple().content('Hotel updated successfully'));
                vm.uploadImages(data._id);
            })
            .error(function(err) {
                $mdToast.show($mdToast.simple().content('Failed to update hotel'));
                console.log(err);
            });
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

    vm.cancelCreate = function () {
        $state.go(StateHandler.getPreviousStateName());
    }
}
