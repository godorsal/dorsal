//ToDo: move inline styles to SCSS

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
            template:   '<div style="display:flex; flex-flow: row;align-items: center;text-align: center;margin-bottom: 30px;">' +
                            '<div style="flex: 1;margin-right:10px;text-align: left;">{{radioData.label}}</div>' +
                            '<div style="position:relative;top:-5px;flex: 3;">' +
                                '<div style="position:relative;display:flex;flex-flow: row;z-index: 1;">' +
                                    '<div style="flex: 1;font-size:11px;" ng-repeat="radio in radioData.values">' +
                                        '<div><label style="margin:0;cursor: pointer;">{{radio.label}}<br/><input style="cursor: pointer;" name="{{radioData.id}}" type="radio" ng-model="$parent.targetData" value="{{radio.value}}"></label></div>' +
                                    '</div>' +
                                '</div>' +
                                '<hr style="position:absolute;top:75%;left:0;width:100%;margin: 0px;z-index: 0;" />' +
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
