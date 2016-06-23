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
            '<h4>{{getSelectedProductsLabel() | translate}}</h4>' +
            '<div><uib-accordion close-others="true"><uib-accordion-group ng-repeat="rootType in getAllIncidentTypes()" is-open="rootType.open">' +
            '<uib-accordion-heading><div ng-if="rootTranslationWorks(rootType)"> {{rootType.description | translate}}</div><div ng-if="!rootTranslationWorks(rootType)">{{rootType.name}}</div><br /><span class="drsl-product-header-selection" ng-show="rootType.selectedValue">{{getLabelForTypeValue(rootType) | translate}}</span><i class="pull-right glyphicon" ng-class="{\'glyphicon-ok-sign\': rootType.selectedValue}"></i></uib-accordion-heading>' +
            '<div class="drsl-product-detail-input" ' +
            'ng-repeat="incidentType in rootType.types">' +
            '<button ng-hide="incidentType.type" type="button" ' +
            'class="btn" ' +
            'ng-class="{\'btn-success\': (incidentType.value == rootType.selectedValue)}" ' +
            'ng-click="setIncidentTypeValue(rootType, incidentType)">' +
            '<div ng-if="incidentTranslationWorks(incidentType)">{{incidentType.label | translate}}</div>' + '<div ng-if="!incidentTranslationWorks(incidentType)">{{incidentType.value}}</div>' +
            '</button>' +
            '<div ng-show="incidentType.type && incidentType.type === \'field\'">' +
            '<form ng-submit="setIncidentTypeValue(rootType, incidentType)"><input type="text" class="form-control" ng-model="incidentType.value">' +
            '<button type="submit" ' +
            'class="btn btn-primary" ' +
            'translate="concierge.caseDetails.version.add">' +
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

        function linkFunc(scope) {

            /**
            * Returns a list of all incident types for the currently selected product.
            * @returns {Array} an array of incident types for the selected product.
            */
            scope.getAllIncidentTypes = function () {
                var incidentTypes = [];

                // Grab the incidentType array for the selected product
                if (scope.product && scope.product.selectedValue) {
                    incidentTypes = scope.getSelectedProduct().incidentTypes;
                }
                // console.log(scope.product);
                return incidentTypes;
            };
            scope.rootTranslationWorks = function(rootType){
                // console.log(rootType);
                    var source = rootType.description;
                    var translation = $translate.instant(rootType.description)
                    return source !== translation;
            }
            scope.incidentTranslationWorks = function(incident){
                console.log(incident);
                    var source = incident.label;
                    var translation = $translate.instant(incident.label)
                    return source !== translation;
            }
            /**
            * Returns true if we can show the product details for currently selected product.
            * @returns {boolean} a boolean for deciding to show/hide the product details/incidents.
            */
            scope.canShowProductDetails = function () {
                var canShow = false,
                hasIncidentTypes;

                // Continue if we have selected a product
                if (scope.product && scope.product.selectedValue) {
                    canShow = true;

                    // Check to see if the currently selected product has incidentTypes
                    hasIncidentTypes = scope.getSelectedProduct().incidentTypes.length > 0;
                }

                return canShow && hasIncidentTypes;
            };

            /**
            * Sets the given incident type's value.
            * @param type
            * @param value
            */
            scope.setIncidentTypeValue = function (type, value) {
                if (value.type && value.type === 'field') {
                    type.selectedValue = (value.value) ? value.value : '';
                    value.label = (value.value) ? value.value : '';
                } else {
                    type.selectedValue = (type.selectedValue === value.value) ? '' : value.value;
                }

                type.open = false;
            };

            /**
            * Returns the currently selected product.
            * @returns {{}} the currently selected product object.
            */
            scope.getSelectedProduct = function () {
                var selectedProduct = {};

                if (scope.product && scope.product.selectedValue) {
                    selectedProduct = scope.product.values.filter(function (o) {
                        return o.value === scope.product.selectedValue
                    })[0];
                }

                return selectedProduct;
            };

            /**
            * Returns the currently selected product's label.
            * @returns {string} the currently selected product's label.
            */
            scope.getSelectedProductsLabel = function () {
                return (scope.product && scope.product.selectedValue) ? scope.getSelectedProduct().label : '';
            };

            /**
            * Returns the label for the given type's selectedValue type.
            * @param type an incident type object.
            * @returns {string} the label  for the given type's selectedValue type.
            */
            scope.getLabelForTypeValue = function (type) {
                var label = '',
                selectedType = type.types.filter(function (o) {
                    return o.value === type.selectedValue
                })[0];

                // For version, add a prefix to the label
                if (selectedType && selectedType.type === 'field') {
                    label = $translate.instant('concierge.caseDetails.version.prefix') + ' ' + selectedType.label;
                } else if (selectedType) {
                    label = selectedType.label;
                }

                return label;
            };
        }
    }
})();
