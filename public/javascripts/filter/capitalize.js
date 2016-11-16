angular.module('HotelReservation')
    .filter('capitalize', function() {
        return function(input) {
            if (input != null) return input.capitalize();
        }
    });
