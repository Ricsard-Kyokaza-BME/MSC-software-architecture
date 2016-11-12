var app = angular.module('HotelReservation', ['ui.router', 'ngFileUpload', 'ngMaterial']);
app.config(function($stateProvider, $mdIconProvider) {
    $mdIconProvider.fontSet('md', 'material-icons');


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

    $stateProvider.state(indexState);
    $stateProvider.state(helloState);
});
app.controller('BootCtrl', function($scope, $state, $rootScope){
    $state.go('index');

    $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams){
            $scope.currentNavItem = toState.name;
        });
});