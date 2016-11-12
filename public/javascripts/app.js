var app = angular.module('HotelReservation', ['ui.router', 'ui.bootstrap', 'ngFileUpload', 'ngMaterial']);
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

    var loginState = {
        name: 'login',
        url: '/login',
        templateUrl: '/views/login.html',
        controller: 'UserLoginController as userLoginController'
    };

    var userRegistrationState = {
        name: 'userRegistration',
        url: '/registration',
        onEnter: ['$stateParams', '$state', '$mdDialog', function($stateParams, $state, $mdDialog) {
            $mdDialog.show({
                clickOutsideToClose: true,
                templateUrl: "/views/registration.html",
                controller: 'UserRegistrationCtrl as userRegistration',
                onComplete: function () {
                    $state.go('index');
                }
            });
        }]
    };

    $stateProvider.state(indexState);
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