(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .config(pagerConfig);

    pagerConfig.$inject = ['uibPagerConfig', 'paginationConstants'];

    function pagerConfig(uibPagerConfig, paginationConstants) {
        uibPagerConfig.itemsPerPage = paginationConstants.itemsPerPage;
        uibPagerConfig.sharedItemsPerPage = paginationConstants.sharedItemsPerPage;
        uibPagerConfig.expertItemsPerPage = paginationConstants.expertItemsPerPage;
        uibPagerConfig.previousText = '«';
        uibPagerConfig.nextText = '»';
    }
})();
