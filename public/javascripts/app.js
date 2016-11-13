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
        onEnter: ['$stateParams', '$state', '$mdDialog', function($stateParams, $state, $mdDialog) {
            $mdDialog.show({
                clickOutsideToClose: true,
                templateUrl: '/views/login.html',
                controller: 'UserLoginController as userLogin',
                onComplete: function () {
                    $state.go('index');
                }
            });
        }]
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