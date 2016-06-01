(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .directive('caseProfessional', caseProfessional);

    function caseProfessional($translate, $locale, tmhDynamicLocale) {
        var directive = {
            restrict: 'E',
            scope:  {
                expert: '=',
                chatRoom: '='
            },
            templateUrl: 'app/case/case-professional.directive.html'
        };

        return directive;
    }
})();
