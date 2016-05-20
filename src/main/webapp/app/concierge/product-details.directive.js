(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .directive('productDetails', productDetails);

    function productDetails($translate, $locale, tmhDynamicLocale) {
        var directive = {
            restrict: 'E',
            scope:  {
                product: '=',
                complete: '='
            },
            template:   '<div class="well drsl-product-details-wrapper" ng-show="canShowProductDetails()">' +
                            '<h4>{{product.selectedValue}}</h4>' +
                            '<div><uib-accordion close-others="true"><uib-accordion-group ng-repeat="rootType in getAllIncidentTypes()" is-open="rootType.open">' +
                            '<uib-accordion-heading>{{rootType.description}}<br /><span class="drsl-product-header-selection" ng-show="rootType.selectedValue">{{rootType.selectedValue}}</span><i class="pull-right glyphicon" ng-class="{\'glyphicon-ok-sign\': rootType.selectedValue}"></i></uib-accordion-heading>' +
                                '<div class="drsl-product-detail-input" ' +
                                     'ng-repeat="incidentType in rootType.types">' +
                                    '<button ng-hide="incidentType.type" type="button" ' +
                                            'class="btn" ' +
                                            'ng-class="{\'btn-success\': (incidentType.label == rootType.selectedValue)}" ' +
                                            'ng-click="setIncidentTypeValue(rootType, incidentType)">' +
                                        '{{incidentType.label}}' +
                                    '</button>' +
                                    '<div ng-show="incidentType.type && incidentType.type === \'field\'">' +
                                        '<form ng-submit="setIncidentTypeValue(rootType, incidentType)"><input type="text" class="form-control" ng-model="incidentType.label">' +
                                        '<button type="submit" ' +
                                                'class="btn btn-primary" ' +
                                                '>' +
                                            'add' +
                                        '</button></form>' +
                                    '</div>' +
                                '</div>' +
                            '</uib-accordion-group></uib-accordion></div>' +
                        '</div>'
            ,
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, element, attrs) {
            /**
             *
             */
            scope.toggleComplete = function () {
                if (scope.product.incidentTypeSelections.length > 0) {
                    scope.complete = !scope.complete;
                }
            };

            /**
             * Returns an IncidentType object to further refine the product details.
             * @returns {*}
             */
            scope.getIncidentTypes = function () {
                var incidentTypes = [],
                    incidentType;

                if (!scope.complete) {
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
                }

                return incidentType;
            };

            scope.getAllIncidentTypes = function () {
                var incidentTypes = [];

                // Grab the incidentType array for the selected product
                if (scope.product.selectedValue) {
                    incidentTypes = scope.product.values.filter(function (o) {
                        return o.value === scope.product.selectedValue
                    })[0].incidentTypes;
                }

                return incidentTypes;
            };

            /**
             * Removes a given IncidentType object from the incidentTypeSelections array.
             * @param type an IncidentType object
             */
            scope.removeIncidentType = function (type) {
                var incidentTypesLength = scope.product.incidentTypeSelections.length,
                    index = scope.product.incidentTypeSelections.indexOf(type);

                // Enable further editing
                scope.complete = false;

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

            scope.setIncidentTypeValue = function (type, value){
                if (value.type && value.type === 'field'){
                    type.selectedValue = 'v. ' +value.label;
                } else {
                    type.selectedValue = (type.selectedValue === value.label)? '':value.label;
                }

                type.open = false;

            }


        }
    }
})();
