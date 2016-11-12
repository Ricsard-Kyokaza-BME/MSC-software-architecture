var app = angular.module('HotelReservation', ['ui.router', 'ngFileUpload', 'ngMaterial']);
app.config(function($stateProvider) {
    var indexState = {
        name: 'index',
        url: '/',
        template: '<h3>hello world!</h3>'
    };

    $stateProvider.state(indexState);
});
app.controller('BootCtrl', function($scope, $state){
    $state.go('index');
});