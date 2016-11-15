var app = angular.module('HotelReservation');
app.factory( "Hotel", function() {
    /**
     * Constructor
     * @param {string} id
     * @param {string} name
     * @param {string} owner
     * @param {string} description
     * @param {string} location
     * @param {number} luxuryLevel
     * @param {[Room]} rooms
     * @param {[string]} images
     * @constructor
     */
    function Hotel( id, name, owner, description, location, luxuryLevel, rooms, images ) {
        this.id = id || '';
        this.name = name || '';
        this.owner = owner || '';
        this.description = description || '';
        this.location = location || '';
        this.luxuryLevel = luxuryLevel || 1;
        this.rooms = rooms || [];
        this.images = images || [];
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
