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

    $stateProvider.state(indexState);
    $stateProvider.state(loginState);
    $stateProvider.state(userRegistrationState);
});


app.controller('BootCtrl', bootCtrlConstructor);
bootCtrlConstructor.$inject = ['$scope', '$injector'];

function bootCtrlConstructor($scope, $injector){
    var $state = $injector.get('$state');
    var $rootScope = $injector.get('$rootScope');
    var StateHandler = $injector.get('StateHandler');
    var SessionService = $injector.get('SessionService');

    $scope.iteClicked = function () {

    }
    
    $scope.sessionService = SessionService;
    $scope.sidePanelArray = [];
    if(SessionService.getSignedInUser() == undefined){
        $scope.sidePanelArray = [
            {
                outlinedTex : "Login"
            },
            {
                outlinedTex : "Register"
            }
        ];
    } else {
        $scope.sidePanelArray = [
            {
                outlinedTex : SessionService.getSignedInUser().getFullName()
            },
            {
                outlinedTex : "Logout"
            }
        ];
    }

    


    $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams){
            StateHandler.setPreviousState(fromState);
            StateHandler.setCurrentState(toState);
        });

    $scope.getCurrentState = function () {
        return StateHandler.getCurrentState();
    };

    $state.go('index');

    $scope.onLogoffClicked = function (index) {
        console.log("IAM clicked at "+ index)
    }




}