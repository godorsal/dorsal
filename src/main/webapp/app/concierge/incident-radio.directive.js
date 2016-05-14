(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .directive('incidentRadio', activeMenu);

    function activeMenu($translate, $locale, tmhDynamicLocale) {
        var directive = {
            restrict: 'E',
            scope:  {
                targetData: '=',
                radioData: '='
            },
            template:   '<div class="drsl-incident-radio">' +
                            '<div class="drsl-radio-desc">{{radioData.label}}</div>' +
                            '<div class="drsl-radio-wrapper">' +
                                '<div class="drsl-radio-set">' +
                                    '<div class="drsl-radio-item" ng-repeat="radio in radioData.values">' +
                                        '<div><label>{{radio.label}}<br/><input name="{{radioData.id}}" type="radio" ng-model="$parent.targetData" value="{{radio.value}}"></label></div>' +
                                    '</div>' +
                                '</div>' +
                                '<hr />' +
                            '</div>' +
                        '</div>'
            ,
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, element, attrs) {

        }
    }
})();
