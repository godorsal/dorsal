(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .directive('drslEnforceMinMax', drslEnforceMinMax);

    function drslEnforceMinMax() {
        var directive = {
            restrict: 'A',
            require: "ngModel",
            scope: {
                ngModel: '='
            },
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, element, attr) {
            element.on('blur', function (event) {
                var changedVal,
                    minValue = attr.min / 1,
                    maxValue = attr.max / 1,
                    elementVal = angular.element(event.target).val() / 1;

                if (angular.isNumber(elementVal)) {
                    if (elementVal < minValue) {
                        changedVal = minValue;
                    } else if (elementVal > maxValue) {
                        changedVal = maxValue;
                    }
                } else {
                    changedVal = 0;
                }

                if (changedVal !== undefined) {
                    scope.ngModel = changedVal;
                    scope.$apply();
                }
            });
        }
    }
})();
