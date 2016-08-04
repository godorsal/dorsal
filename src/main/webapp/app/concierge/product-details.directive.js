(function() {
    'use strict';

    angular
    .module('dorsalApp')
    .directive('productDetails', productDetails);

    productDetails.$inject = ['$translate'];

    function productDetails($translate) {
        var directive = {
            restrict: 'E',
            scope:  {
                product: '=',
                technologyProperties: '='
            },
            templateUrl: 'app/concierge/product-details.directive.html',
            link: linkFunc
        };

        return directive;

        function linkFunc(scope) {
            scope.attachmentsOpen = false;

            /**
             * Stop text field clicks from closing the dropdown menu.
             * @param event
             */
            scope.textFieldClick = function(event) {
                event.stopPropagation();
            };

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
                return incidentTypes;
            };

            scope.rootTranslationWorks = function(rootType){
                var source = rootType.description;
                var translation = $translate.instant(rootType.description);
                return source !== translation;
            };

            scope.incidentTranslationWorks = function(incident){
                var source = incident.label;
                var translation = $translate.instant(incident.label);
                return source !== translation;
            };

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
                    scope.technologyProperties[type.name] = type.selectedValue;
                } else {
                    type.selectedValue = (type.selectedValue === value.value) ? '' : value.value;
                    scope.technologyProperties[type.name] = type.selectedValue;
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
                if (selectedType && selectedType.type === 'field' && selectedType.id === 'version') {
                    label = $translate.instant('concierge.caseDetails.version.prefix') + ' ' + selectedType.label;
                } else if (selectedType) {
                    if(selectedType.value.match(/[^a-zA-Z\d\-_\s\/]/)){
                        label = type.selectedValue;
                    } else {
                        label = $translate.instant(selectedType.label);
                    }
                } else {
                    label = $translate.instant(type.description);
                }

                return label;
            };

            /**
             * On 'enter/return' keypress a body click event is triggered, hiding the active dropdown menu
             * @param event
             */
            scope.handelEnter = function(event) {
                if (event.which === 13) {
                    angular.element('body').click();
                }
            }

            /**
             * Close the Attachments dropdown on click of the 'Done' button.
             */
            scope.closeAttachments = function(){
                scope.attachmentsOpen = false;
            }
        }
    }
})();
