var app = angular.module('HotelReservation');
app.factory( "Room", function() {
    /**
     * Constructor
     * @param {string} id
     * @param {string} type
     * @param {string} description
     * @param {string} hotelId
     * @param {[String]} reservations
     * @param {number} capacity
     * @constructor
     */
    function Room( id, type, description, hotelId, reservations, capacity ) {
        this.id = id || '';
        this.type = type || '';
        this.description = description || '';
        this.hotelId = hotelId || '';
        this.reservations = reservations || [];
        this.capacity = capacity || 0;
    }

    /**
     * Prototypical functions
     * @type {{transformToSend: Function}}
     */
    Room.prototype = {
        //Delete the id before we send for add
        transformToSend: function() {
            var tmp = angular.copy(this);
            delete tmp.id;
            return tmp;
        }
    };

    return( Room );
});
