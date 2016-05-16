(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .directive('productDetails', productDetails);

    function productDetails($translate, $locale, tmhDynamicLocale) {
        var directive = {
            restrict: 'E',
            scope:  {
                product: '='
            },
            template:   '<div class="well drsl-product-details-wrapper" ng-show="canShowProductDetails()">' +
                            '<h4>{{product.selectedValue}}</h4>' +
                            '<div class="drsl-product-detail-selections"' +
                                 'ng-repeat="selectedincidentType in product.incidentTypeSelections">' +
                                '<button type="button"' +
                                        'class="btn btn-success"' +
                                        'ng-click="removeIncidentType(selectedincidentType)">' +
                                    '<span ng-show="selectedincidentType.type && selectedincidentType.type === \'field\'">v. </span>' +
                                    '{{selectedincidentType.label}}' +
                                    '<span class="badge">x</span>' +
                                '</button>' +
                            '</div>' +
                            '<div class="well" ng-show="getIncidentTypes()">' +
                                '<h4>{{getIncidentTypes().description}}</h4>' +
                                '<div class="drsl-product-detail-input"' +
                                     'ng-repeat="incidentType in getIncidentTypes().types">' +
                                    '<button ng-hide="incidentType.type" type="button"' +
                                            'class="btn btn-primary"' +
                                            'ng-click="product.incidentTypeSelections.push(incidentType)">' +
                                        '{{incidentType.label}}' +
                                    '</button>' +
                                    '<div ng-show="incidentType.type && incidentType.type === \'field\'">' +
                                        '<input type="text" class="form-control" ng-model="incidentType.label">' +
                                        '<button type="button"' +
                                                'class="btn btn-primary"' +
                                                'ng-click="product.incidentTypeSelections.push(incidentType)">' +
                                            'add' +
                                        '</button>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>'
            ,
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, element, attrs) {

            /**
             * Returns an IncidentType object to further refine the product details.
             * @returns {*}
             */
            scope.getIncidentTypes = function () {
                var incidentTypes = [],
                    incidentType;

                // Grab the incidentType array for the selected product
                if (scope.product.selectedValue) {
                    incidentTypes = scope.product.values.filter(function (o) {
                        return o.value === scope.product.selectedValue
                    });
                }

                // Pull the next *incomplete* IncidentType for this product
                if (incidentTypes.length) {
                    incidentType = incidentTypes[0].incidentTypes[scope.product.incidentTypeSelections.length];
                }

                return incidentType;
            };

            /**
             * Removes a given IncidentType object from the incidentTypeSelections array.
             * @param type an IncidentType object
             */
            scope.removeIncidentType = function (type) {
                var incidentTypesLength = scope.product.incidentTypeSelections.length,
                    index = scope.product.incidentTypeSelections.indexOf(type);

                // Remove any incidentTypeSelections after the index of the provided IncidentType object
                if (index !== -1) {
                    scope.product.incidentTypeSelections.splice(index, incidentTypesLength);
                }
            };

            /**
             * Returns true if we can show the product details for currently selected product.
             * @returns {boolean}
             */
            scope.canShowProductDetails = function () {
                var canShow = false,
                    hasIncidentTypes;

                // Continue if we have selected a product
                if (scope.product.selectedValue) {
                    canShow = true;

                    // Check to see if the currently selected product has incidentTypes
                    hasIncidentTypes = scope.product.values.filter(function (o) {
                            return o.value === scope.product.selectedValue;
                        })[0].incidentTypes.length > 0;
                }

                return canShow && hasIncidentTypes;
            };
        }
    }
})();
