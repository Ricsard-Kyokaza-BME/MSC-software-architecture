var app = angular.module('HotelReservation');
app.factory( "Room", function(RoomType) {
    /**
     * Constructor
     * @param {string} id
     * @param {RoomType} type
     * @param {string} description
     * @param {string} hotelId
     * @param {[String]} reservations
     * @param {number} capacity
     * @param {number} quantity
     * @param {number} price
     * @constructor
     */
    function Room( id, type, description, hotelId, reservations, capacity, quantity, price ) {
        this.id = id || '';
        this.type = type || RoomType.STANDARD;
        this.description = description || '';
        this.hotelId = hotelId || '';
        this.reservations = reservations || [];
        this.capacity = capacity || 0;
        this.quantity = quantity || 0;
        this.price = price || 0;
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
