_.delete = function(array, criteria) {

    function removeElement(array, element){
        if(_.isObject(element)){
            array.splice(array.indexOf(_.find(array, element)), 1);
        } else {
            array.splice(array.indexOf(element), 1);
        }
    }

    if(typeof criteria === 'function'){
        _.each(angular.copy(array), function(element) {
            if(criteria(element) == true){
                removeElement(array, element);
            }
        });
    } else
    if(typeof criteria !== 'function'){
        var element = criteria;
        if(criteria !== undefined){
            removeElement(array, element);
        }
    }

};