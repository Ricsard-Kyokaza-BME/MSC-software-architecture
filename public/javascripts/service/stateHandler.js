var app = angular.module('HotelReservation');

app.service('StateHandler', stateHandlerConstructor);
stateHandlerConstructor.$inject = ['$injector'];

function stateHandlerConstructor($injector){
    var currentState = undefined;
    var previousState = undefined;
    var service = {};

    service.getCurrentState = getCurrentState;
    service.setCurrentState = setCurrentState;
    service.getPreviousState = getPreviousState;
    service.setPreviousState = setPreviousState;
    service.getCurrentStateName = getCurrentStateName;
    service.getPreviousStateName = getPreviousStateName;

    function getCurrentState() {
        return currentState;
    }

    function setCurrentState(state) {
        currentState = angular.copy(state);
    }

    function getPreviousState() {
        return previousState;
    }

    function setPreviousState(state) {
        previousState = angular.copy(state);
    }

    function getCurrentStateName() {
        return currentState ? currentState.name || 'index' : 'index';
    }

    function getPreviousStateName() {
        return previousState ? previousState.name || 'index' : 'index';

    }

    return service;
}