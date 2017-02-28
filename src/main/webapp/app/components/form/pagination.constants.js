(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .constant('paginationConstants', {
            'itemsPerPage': 20,
            'sharedItemsPerPage': 20,
            'expertItemsPerPage': 5

        });
})();
