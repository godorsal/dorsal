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
                radioData: '='
            },
            template:   '<div class="drsl-linear-radio">' +
                            '<div class="drsl-radio-desc" tooltip-placement="left" uib-tooltip="{{radioData.tooltip | translate}}" translate="{{radioData.label}}"></div>' +
                            '<div class="drsl-radio-wrapper">' +
                                '<div class="drsl-radio-set">' +
                                    '<div class="drsl-radio-item" ng-repeat="radio in radioData.values">' +
                                        '<div ng-if="!radioData.multiSelect"><input name="{{radioData.id}}" id="incidentRadio_{{$id}}" type="radio" ng-model="$parent.$parent.targetData" value="{{radio.value}}"><label for="incidentRadio_{{$id}}">{{radio.label | translate}}<br><span></span></label></div>' +
                                        '<div ng-if="radioData.multiSelect"><input name="{{radioData.id + \'_\' + radio.id}}" id="{{radioData.id + \'_\' + radio.id}}" type="checkbox" ng-model="$parent.targetData" value="{{radio.value}}"><label for="{{radioData.id + \'_\' + radio.id}}">{{radio.label | translate}}<br><span></span></label></div>' +
                                    '</div>' +
                                '</div>' +
                                '<hr />' +
                            '</div>' +
                        '</div>' +
                        '<div ng-if="radioData.type === \'complex\'"><product-details product="radioData"></product-details></div>'
        };

        return directive;
    }
})();
