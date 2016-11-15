var app = angular.module('HotelReservation');
app.factory( "Reservation", function(Room) {
    /**
     * Constructor
     * @param {string} id
     * @param {string} owner
     * @param {string} roomId
     * @param {string} hotelId
     * @param {Date} startDate
     * @param {Date} endDate
     * @constructor
     */
    function Reservation( id, owner, roomId, hotelId, startDate, endDate) {
        this.id = id || '';
        this.owner = owner || '';
        this.roomId = roomId || '';
        this.hotelId = hotelId || '';
        this.startDate = startDate || new Date();
        this.endDate = endDate || new Date();
    }

    /**
     * Prototypical functions
     * @type {{transformToSend: Function}}
     */
    Reservation.prototype = {
        //Delete the id before we send for add
        transformToSend: function() {
            var tmp = angular.copy(this);
            delete tmp.id;
            return tmp;
        }
    };

    return( Reservation );
});
