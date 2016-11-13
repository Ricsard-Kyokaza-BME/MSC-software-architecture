var app = angular.module('HotelReservation');
app.factory( "Hotel", function() {
    /**
     * Constructor
     * @param {string} id
     * @param {string} name
     * @param {string} owner
     * @param {string} location
     * @param {number} luxuryLevel
     * @param {[Review]} reviews
     * @param {[Room]} rooms
     * @constructor
     */
    function Hotel( id, name, owner, location, luxuryLevel, reviews, rooms ) {
        if(id != undefined) {
            this.id = id;
            this.name = name;
            this.owner = owner;
            this.location = location;
            this.luxuryLevel = luxuryLevel;
            this.reviews = reviews;
            this.rooms = rooms;
        } else {
            this.id = '';
            this.name = '';
            this.owner = '';
            this.location = '';
            this.luxuryLevel = 0;
            this.reviews = [];
            this.rooms = [];
        }
    }

    /**
     * Prototypical functions
     * @type {{transformToSend: Function}}
     */
    Hotel.prototype = {
        //Delete the id before we send for add
        transformToSend: function() {
            var tmp = angular.copy(this);
            delete tmp.id;
            return tmp;
        }
    };

    return( Hotel );
});
