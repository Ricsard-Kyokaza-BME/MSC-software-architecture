var app = angular.module('HotelReservation', ['ui.router', 'ui.bootstrap',
    'ngFileUpload', 'ngMaterial', 'ngAutocomplete', 'ngMap']);
app.constant('_', window._);
app.config(function($stateProvider, $mdIconProvider, $mdThemingProvider) {
    $mdIconProvider.fontSet('md', 'material-icons');
    $mdThemingProvider
        .theme('default')
        .dark()
        .primaryPalette('teal')
        .accentPalette('green');

    var indexState = {
        name: 'index',
        url: '/',
        templateUrl: '/views/index.html',
        controller: 'BrowseCtrl as browse'
    };

    var loginState = {
        name: 'login',
        url: '/login',
        templateUrl: '/features/login/login.html',
        controller: 'UserLoginCtrl as userLogin'
    };

    var userRegistrationState = {
        name: 'registration',
        url: '/registration',
        templateUrl: "/features/registration/registration.html",
        controller: 'UserRegistrationCtrl as userRegistration'
    };

    var hotelAdministration = {
        name: 'hotels',
        url: '/hotels',
        templateUrl: "/features/hotelAdministration/hotels.html",
        controller: 'HotelAdminCtrl as hotelAdminCtrl'
    };

    var hotelDetailedState = {
        name: 'hotelsDetails',
        url: '/hotel/:hotelId',
        templateUrl: "/features/hotelAdministration/hotelDetails.html",
        controller: 'HotelDetailsCtrl as hotelDetailsCtrl'
    };

    var hotelCreate = {
        name: 'hotelsCreate',
        url: '/hotels/create',
        templateUrl: "/features/hotelAdministration/hotels-create.html",
        controller: 'HotelCreateCtrl as hotelCtrl'
    };

    var hotelEdit = {
        name: 'hotelsEdit',
        url: '/hotel/:hotelId/edit',
        templateUrl: "/features/hotelAdministration/hotels-create.html",
        controller: 'HotelEditCtrl as hotelCtrl'
    };

    var myReservations = {
        name: 'myReservations',
        url: '/reservations',
        templateUrl: "/features/myReservations/myReservations.html",
        controller: 'MyReservationCtrl as myReservationCtrl'
    };

    $stateProvider.state(indexState);
    $stateProvider.state(loginState);
    $stateProvider.state(userRegistrationState);
    $stateProvider.state(hotelAdministration);
    $stateProvider.state(hotelDetailedState);
    $stateProvider.state(hotelCreate);
    $stateProvider.state(hotelEdit);
    $stateProvider.state(myReservations);
});


app.controller('BootCtrl', bootCtrlConstructor);
bootCtrlConstructor.$inject = ['$scope', '$injector'];

function bootCtrlConstructor($scope, $injector){
    var $state = $injector.get('$state');
    var $rootScope = $injector.get('$rootScope');
    var StateHandler = $injector.get('StateHandler');
    var SessionService = $injector.get('SessionService');

    $scope.SessionService = SessionService;

    $state.go('index');

    $scope.getSidePanelText = function(index) {
        switch (index) {
            case 0:
                return SessionService.getSignedInUser() ?  SessionService.getSignedInUser().getFullName() : 'Login';
                break;
            case 1:
                return SessionService.getSignedInUser() ?  'Logout' : 'Register';
                break;
        }
    };

    $scope.getSidePanelClickHandler = function(index) {
        switch (index) {
            case 0:
                return SessionService.getSignedInUser() ?  '' : $state.go('login');
                break;
            case 1:
                SessionService.getSignedInUser() ?  SessionService.logout() : $state.go('registration');
                break;
        }
    };

    $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams){
            StateHandler.setPreviousState(fromState);
            StateHandler.setCurrentState(toState);
        });

    $scope.getCurrentState = function () {
        return StateHandler.getCurrentState();
    };

}