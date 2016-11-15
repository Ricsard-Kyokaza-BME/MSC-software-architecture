var app = angular.module('HotelReservation');

app.directive('hotelImageViewer', hotelImageViewerConstructor);
hotelImageViewerConstructor.$inject = ['$injector'];

function hotelImageViewerConstructor($injector) {
    var directiveDefinitionObject = {
        templateUrl: '/features/hotelImageViewer/hotelImageViewer.html',
        transclude: false,
        restrict: 'E',
        scope: {
            hotel: '=',
            width: '@',
            height: '@'
        },
        link: function($scope, element, attrs) {
            $scope.index = 0;

            $scope.nextImage = function () {
                if($scope.index + 1 < $scope.hotel.images.length) {
                    $scope.index++;
                } else {
                    $scope.index = 0;
                }
            };

            $scope.previousImage = function () {
                if($scope.index - 1 < 0) {
                    $scope.index = $scope.hotel.images.length - 1;
                } else {
                    $scope.index--;
                }
            };
        }
    };

    return directiveDefinitionObject;
}
