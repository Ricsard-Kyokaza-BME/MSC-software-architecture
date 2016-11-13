var app = angular.module('HotelReservation');
app.factory( "User", function() {
    /**
     * Constructor
     * @param userId
     * @param firstName
     * @param lastName
     * @param username
     * @param password
     * @param role
     * @param hotels
     * @constructor
     */
    function User( userId, firstName, lastName, username, password, role, hotels ) {
        if(userId != undefined) {
            this.userId = userId;
            this.firstName = firstName;
            this.lastName = lastName;
            this.username = username;
            this.password = password;
            this.role = role;
            this.hotels = hotels;
        } else {
            this.userId = '';
            this.firstName = '';
            this.lastName = '';
            this.username = '';
            this.password = '';
            this.role = '';
            this.hotels = [];
        }
    }

    /**
     * Prototypical functions
     * @type {{transformToSend: Function, getFullName: Function}}
     */
    User.prototype = {
        //Delete the userId before we send for add
        transformToSend: function() {
            var tmp = angular.copy(this);
            delete tmp.userId;
            return tmp;
        },
        getFullName: function() {
            return this.firstName + " " + this.lastName;
        }
    };

    return( User );
});
