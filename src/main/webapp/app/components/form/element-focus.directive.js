(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .directive('elementFocus', focus);

    function focus (ElementFocusService) {
        var directive = {
            restrict: 'A',
            link: linkFunc
        };

        return directive;

        function linkFunc (scope, elem, attr) {
            elem.on(attr.elementFocus, function() {
                ElementFocusService(attr.elementFocusId);
            });

            scope.$on('$destroy', function() {
                element.off(attr.elementFocus);
            });
        }
    }
})();
