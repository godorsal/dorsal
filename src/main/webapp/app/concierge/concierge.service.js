(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .factory('ConciergeService', ConciergeService);

    ConciergeService.$inject = ['$resource', '$q', '_', 'Technology', 'Technologyproperty', 'Technologypropertyvalue', 'Issue'];

    function ConciergeService($resource, $q, _, Technology, Technologyproperty, Technologypropertyvalue, Issue) {
        var service = {};

        service.getEntityData = function () {
            var deferred = $q.defer(),
                tech = Technology.query().$promise,
                techProperty = Technologyproperty.query().$promise,
                techPropertyValue = Technologypropertyvalue.query().$promise,
                issues = Issue.query().$promise;

            // Combine multiple requests into one
            $q.all([tech, techProperty, techPropertyValue, issues]).then(function (data) {
                deferred.resolve(processEntityData(data));
            });

            return deferred.promise;
        };

        return service;

        function processEntityData(entityData) {
            var techData = entityData[0],
                propData = entityData[1],
                propValData = entityData[2],
                issueData = entityData[3],
                techItem, byTech,
                propItem, propItemCode, byProp,
                types, propVal,
                issueItem,
                i, k, j;
            // Iterate over available technology
            for (i = 0; i < techData.length; i++) {
                techItem = techData[i];
                // Filter prop value data by the current technology
                byTech = _.filter(propValData, {'technology': techItem});

                // Add an empty incidentTypes array prop to the current technology object
                techItem.incidentTypes = [];
                // techItem.code = techItem.name.replace(/\s/g, '_').toLowerCase();
                techItem.label = 'concierge.caseDetails.product.' + techItem.code;
                techItem.value = techItem.name;

                // Iterate over each Technology Property type (eg. Version, Environment, Cluster Type etc.)
                for (k = 0; k < propData.length; k++) {
                    propItem = propData[k];
                    propItemCode = propItem.name.replace(/\s/g, '_').toLowerCase();

                    // Further filter by the current Technology Property Type
                    byProp = _.filter(byTech, {'technologyproperty': propItem});

                    // Continue if the filtering resulted in items
                    if (byProp.length) {
                        types = [];

                        if (propItemCode === 'version' || propItemCode === 'other') {
                            types.push({
                                id: propItemCode,
                                value: '',
                                type: 'field',
                                label: ''
                            });
                        } else {
                            types.unshift({
                                id: '',
                                value: '',
                                type: 'field',
                                label: ''
                            });
                        }

                        // Iterate over Technology Property Value belonging to the current type
                        for (j = 0; j < byProp.length; j++) {
                            propVal = byProp[j];
                            propVal.code = propVal.value.replace(/\/|\s/gi, '_').toLowerCase();

                            // Push a new object containing the values to the types array
                            types.push({
                                id: propVal.id,
                                value: propVal.value,
                                code: propVal.code,
                                label: 'concierge.caseDetails.incidentTypes.values.' + propVal.code
                            });
                        }

                        // Push the the current type to the Technology object's incidentTypes array
                        techItem.incidentTypes.push({
                            id: propItem.id,
                            name: propItem.name,
                            code: propItemCode,
                            description: 'concierge.caseDetails.incidentTypes.' + propItemCode,
                            types: types,
                            selectedValue: ''
                        });
                    }
                }
            }

            // Iterate over issue data
            for (i = 0; i < issueData.length; i++) {
                issueItem = issueData[i];
                issueItem.code = issueItem.name.replace(/\s/g, '_').toLowerCase();
                issueItem.label = 'concierge.caseDetails.problem.' + issueItem.code;
                issueItem.value = issueItem.name;
            }

            return {
                "summary": "",
                radios: [
                    {
                        "id": "problem",
                        "values": issueData,
                        "selectedValue": ""
                    },
                    {
                        "id": "product",
                        "tooltip": "concierge.caseDetails.product.tooltip",
                        "type": "complex",
                        "values": techData,
                        "selectedValue": ""
                    }
                ]
            };
        }
    }
})();
