var app = angular.module('HotelReservation');
app.factory( "Review", function() {
    /**
     * Constructor
     * @param {string} id
     * @param {string} owner
     * @param {string} hotelId
     * @param {string} description
     * @param {Date} date
     * @param {number} rating
     * @constructor
     */
    function Review( id, owner, hotelId, description, date, rating) {
        this.id = id || '';
        this.owner = owner || '';
        this.hotelId = hotelId || '';
        this.description = description || '';
        this.date = date || new Date();
        this.rating = rating || 0;
    }

    /**
     * Prototypical functions
     * @type {{transformToSend: Function}}
     */
    Review.prototype = {
        //Delete the id before we send for add
        transformToSend: function() {
            var tmp = angular.copy(this);
            delete tmp.id;
            return tmp;
        }
    };

    return( Review );
});
