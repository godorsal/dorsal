(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .directive('caseProfessional', caseProfessional);

    function caseProfessional() {
        var directive = {
            restrict: 'E',
            scope:  {
                expert: '=',
                case: '=',
                expertBadges: '=',
                chatRoom: '='
            },
            templateUrl: 'app/case/case-professional.directive.html'
        };

        return directive;
    }
})();
