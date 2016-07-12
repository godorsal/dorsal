(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .directive('expertBadges', expertBadges);

    angular
        .module('dorsalApp')
        .filter('filterByBadgeSet', filterByBadgeSet);

    function filterByBadgeSet() {
        return function (input, badgeSet) {
            var output = [];

            if (badgeSet) {
                output = input.filter(function (badge) {
                    return badgeSet.indexOf(badge.icon) !== -1;
                });
            }

            return output;
        };
    }

    function expertBadges() {
        var directive = {
            restrict: 'E',
            scope:  {
                badgeSet: '=',
                badgeSelect: '@'
            },
            template:   '<div ng-if="badgeSelect === \'true\'">' +
                            '<span class="drsl-badge-sprites {{badge.icon}}" uib-tooltip="{{\'case.professional.badges.\' + badge.icon | translate}}" ng-class="{selected: badge.selected, selectable: badgeSelect}" ng-click="toggleBadgeSelection(badge)" ng-repeat="badge in badges"></span>' +
                        '</div>' +
                        '<div ng-if="badgeSelect !== \'true\'">' +
                            '<span class="drsl-badge-sprites {{badge.icon}}" uib-tooltip="{{\'case.professional.badges.\' + badge.icon | translate}}" ng-class="{selected: badge.selected, selectable: badgeSelect}" ng-repeat="badge in badges | filterByBadgeSet:badgeSet" ></span>' +
                        '</div>'
            ,
            link: linkFunc
        };

        return directive;

        function linkFunc(scope) {

            scope.badges = [
                {"icon": "badge-1"},
                {"icon": "badge-2"},
                {"icon": "badge-3"},
                {"icon": "badge-4"},
                {"icon": "badge-5"},
                {"icon": "badge-6"},
                {"icon": "badge-7"}
            ];

            scope.toggleBadgeSelection = function(badge) {
                if (scope.badgeSelect) {
                    badge.selected = !badge.selected;
                }
            };
        }
    }
})();
