var app = angular.module('HotelReservation');

app.service('SessionService', sessionServiceConstructor);
sessionServiceConstructor.$inject = ['$injector'];

function sessionServiceConstructor($injector){
    var User = $injector.get('User');
    var $http = $injector.get('$http');
    var $state = $injector.get('$state');
    var $mdToast = $injector.get('$mdToast');

    var service = {};

    /**
     * Put the @user to the session storage
     * @param {String} user
     */
    service.put = function(user) {
        sessionStorage.user = JSON.stringify(user);
    };

    /**
     * Get the signed in user from the session storage
     * @returns {User|*}
     */
    service.getSignedInUser = function() {
        if(sessionStorage.user){
            var data = JSON.parse(sessionStorage.user);
            return new User(data._id, data.firstName, data.lastName, data.username, data.password, data.role, data.hotels);
        }
        return undefined;
    };

    /**
     * Get the userId of the signed in user
     * @returns {*|string}
     */
    service.getSignedInUserId = function() {
        return service.getSignedInUser().userId;
    };

    /**
     * Remove the user key from session storage
     */
    service.removeSignedInUser = function() {
        delete sessionStorage.user;
    };

    /**
     * Logout the user and remove from session storage
     * then go to index state
     */
    service.logout = function() {
        $http.get('/logout')
            .success(function () {
                service.removeSignedInUser();
                $mdToast.show($mdToast.simple().content('Successfully logged out'));
                $state.go('index');
            });
    };

    if(service.getSignedInUser()) {
        $http.get('checkSession')
            .then(function successCallback(response) {
                }, function errorCallback(response) {
                    if(response.status == 401) service.logout();
            });
    }

    return service;
}