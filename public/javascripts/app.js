var app = angular.module('HotelReservation', ['ui.router', 'ui.bootstrap', 'ngFileUpload', 'ngMaterial']);
app.config(function($stateProvider, $mdIconProvider, $mdThemingProvider) {
    $mdIconProvider.fontSet('md', 'material-icons');
    $mdThemingProvider
        .theme('default')
        .dark()
        // .backgroundPalette('grey', {
        //     'default': '800',
        //     'hue-1': '400', // use shade 100 for the <code>md-hue-1</code> class
        //     'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
        //     'hue-3': 'A100'
        // })
        .primaryPalette('teal')
        .accentPalette('green');

    var indexState = {
        name: 'index',
        url: '/',
        templateUrl: '/views/index.html'
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

    var hotelCreate = {
        name: 'hotelsCreate',
        url: '/hotels/create',
        templateUrl: "/features/hotelAdministration/hotels-create.html",
        controller: 'HotelCreateCtrl as hotelCreate'
    };

    $stateProvider.state(indexState);
    $stateProvider.state(loginState);
    $stateProvider.state(userRegistrationState);
    $stateProvider.state(hotelAdministration);
    $stateProvider.state(hotelCreate);
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