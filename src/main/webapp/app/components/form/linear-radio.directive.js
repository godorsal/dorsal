(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .directive('linearRadio', linearRadio);

    function linearRadio($translate, $locale, tmhDynamicLocale) {
        var directive = {
            restrict: 'E',
            scope:  {
                targetData: '=',
                radioData: '=',
                startLimit: '=',

            },
            link: function($scope, element, attrs) {
                $scope.showAll = function(a) {
                    $scope.startLimit = 1000;
                    console.log($scope.startLimit);
                }
                $scope.showLess = function(a) {
                    $scope.startLimit = 4;
                    console.log($scope.startLimit);
                }
            },
            template:   '<div class="drsl-linear-radio">' +
                            '<div class="drsl-radio-desc" tooltip-placement="left" uib-tooltip="{{radioData.tooltip | translate}}" translate="{{radioData.label}}"></div>' +
                            '<div class="drsl-radio-wrapper">' +
                                '<div class="drsl-radio-set">' +
                                    '<div class="drsl-radio-item" ng-repeat="radio in radioData.values | limitTo: startLimit track by $index">' +
                                        '<div ng-if="$index === 4">' +
                                                '<div class="glyphicon glyphicon-chevron-left" ng-click="showLess()"ng-if="radioData.label === \'concierge.caseDetails.product.main\' && startLimit > 4"></div>' +
                                        '</div>' +
                                        '<div ng-if="!radioData.multiSelect && $index !== 4"><input name="{{radioData.id}}" id="incidentRadio_{{$id}}" type="radio" ng-model="$parent.$parent.targetData" value="{{radio.value}}"><label for="incidentRadio_{{$id}}">{{radio.label | translate}}<br><span></span></label></div>' + '<div ng-if="radio.value === \'Scheduled\' && radioData.selectedValue === \'Scheduled\'">' + '<div class="form-group">' + '<select class="form-control" id="sel1">' + '<option>1 day</option>' + '<option>2 days</option>' + '<option>3 days</option>' + '</select>' + '</div>' + '</div>' + '<div>' +
                                        '<div ng-if="radio.value === \'Other\' && radioData.selectedValue === \'Other\' && radio.label === \'concierge.caseDetails.product.other\'">' + 'Yes' + '</div>' +
                                        '<div ng-if="radioData.multiSelect"><input name="{{radioData.id + \'_\' + radio.id}}" id="{{radioData.id + \'_\' + radio.id}}" type="checkbox" ng-model="$parent.targetData" value="{{radio.value}}"><label for="{{radioData.id + \'_\' + radio.id}}">{{radio.label | translate}}<br><span></span></label></div>' +
                                    '</div>' +
                                '</div>'
                                + '<div class="glyphicon glyphicon-chevron-right" ng-click="showAll()"ng-if="radioData.label === \'concierge.caseDetails.product.main\'"></div>' +
                                '</div>' +
                                '<hr />' +
                            '</div>' +
                        '</div>' +
                        '<div ng-if="radioData.type === \'complex\'"><product-details product="radioData"></product-details></div>'
        };

        return directive;
    }
})();
