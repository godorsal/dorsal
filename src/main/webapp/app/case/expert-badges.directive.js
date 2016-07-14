(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .directive('expertBadges', expertBadges);

    function expertBadges() {
        var directive = {
            restrict: 'E',
            scope:  {
                badges: '=',
                badgeSet: '=',
                badgeSelect: '@'
            },
            template:   '<div ng-if="badgeSelect === \'true\'">' +
                            '<span class="drsl-badge-sprites {{badge.code}}" uib-tooltip="{{\'case.professional.badges.\' + badge.code | translate}}" ng-class="{selected: badge.selected, selectable: badgeSelect}" ng-click="toggleBadgeSelection(badge)" ng-repeat="badge in badges"></span>' +
                        '</div>' +
                        '<div ng-if="badgeSelect !== \'true\'">' +
                            '<span class="drsl-badge-sprites {{badge.code}} selected" uib-tooltip="{{\'case.professional.badges.\' + badge.code | translate}}" ng-class="{selected: badge.selected, selectable: badgeSelect}" ng-hide="badge.hide" ng-repeat="badge in badges" ></span>' +
                        '</div>'
            ,
            link: linkFunc
        };

        return directive;

        function linkFunc(scope) {
            scope.toggleBadgeSelection = function(badge) {
                if (scope.badgeSelect) {
                    badge.selected = !badge.selected;
                }
            };
        }
    }
})();
