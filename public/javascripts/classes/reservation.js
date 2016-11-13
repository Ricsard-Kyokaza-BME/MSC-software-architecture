var app = angular.module('HotelReservation');
app.factory( "Reservation", function() {
    /**
     * Constructor
     * @param {string} id
     * @param {string} owner
     * @param {string} room
     * @param {string} hotelId
     * @param {Date} startDate
     * @param {Date} endDate
     * @constructor
     */
    function Reservation( id, owner, room, hotelId, startDate, endDate) {
        if(id != undefined) {
            this.id = id;
            this.owner = owner;
            this.room = room;
            this.hotelId = hotelId;
            this.startDate = startDate;
            this.endDate = endDate;
        } else {
            this.id = '';
            this.owner = '';
            this.room = '';
            this.hotelId = '';
            this.startDate = new Date();
            this.endDate = new Date();
        }
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
