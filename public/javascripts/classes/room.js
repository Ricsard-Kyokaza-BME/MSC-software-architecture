var app = angular.module('HotelReservation');
app.factory( "Room", function() {
    /**
     * Constructor
     * @param {string} id
     * @param {string} type
     * @param {string} description
     * @param {string} hotelId
     * @param {number} quantity
     * @param {number} capacity
     * @constructor
     */
    function Room( id, type, description, hotelId, quantity, capacity ) {
        if(id != undefined) {
            this.id = id;
            this.type = type;
            this.description = description;
            this.hotelId = hotelId;
            this.quantity = quantity;
            this.capacity = capacity;
        } else {
            this.id = '';
            this.type = '';
            this.description = '';
            this.hotelId = '';
            this.quantity = 0;
            this.capacity = 0;
        }
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
