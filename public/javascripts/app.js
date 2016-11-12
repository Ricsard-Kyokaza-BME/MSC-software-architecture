var app = angular.module('HotelReservation', ['ui.router', 'ngFileUpload', 'ngMaterial']);
app.config(function($stateProvider, $mdIconProvider, $mdThemingProvider) {
    $mdIconProvider.fontSet('md', 'material-icons');
    $mdThemingProvider.theme('default')
        .dark()
        .primaryPalette('teal')
        .accentPalette('cyan');

    var indexState = {
        name: 'index',
        url: '/',
        templateUrl: '/views/index.html'
    };

    var helloState = {
        name: 'hello',
        url: '/hello',
        template: '<h3>Hello</h3>'
    };

    var loginState = {
        name: 'login',
        url: '/login',
        templateUrl: '/views/login.html',
        controller: 'UserLoginController as userLoginController'
    };

    var userRegistrationState = {
        name: 'userRegistration',
        url: '/registration',
        templateUrl: '/views/registration.html',
        controller: 'UserRegistrationCtrl as userRegistration'
    };

    $stateProvider.state(indexState);
    $stateProvider.state(helloState);
    $stateProvider.state(loginState);
    $stateProvider.state(userRegistrationState);
});
app.controller('BootCtrl', function($scope, $state, $rootScope){
    $state.go('index');

    $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams){
            $scope.currentNavItem = toState.name;
        });
});