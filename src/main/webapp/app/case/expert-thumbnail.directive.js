(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .directive('expertThumbnail', expertThumbnail);

    function expertThumbnail($translate, $locale, tmhDynamicLocale) {
        var directive = {
            restrict: 'E',
            scope:  {
                expert: '='
            },
            template:  '<div class="panel panel-default drsl-expert-thumbnail"> ' +
                            '<div class="panel-body"> ' +
                                '<a href="#" ng-click="$event.preventDefault()" class="thumbnail"> ' +
                                    '<img style="border-radius: 50%" ng-src="{{expert.picture}}" /> ' +
                                '</a> ' +
                                '<div> ' +
                                    '<span class="glyphicon" ng-class="{\'glyphicon-star\': (expert.stars >= (star/1)), \'glyphicon-star-empty\': (expert.stars < (star/1))}" ng-repeat="star in [1, 2, 3, 4, 5]"></span> ' +

                                '</div> ' +
                                '<div class="drsl-thumbnail-badge-wrapper"> ' +
                                    '<div ng-show="expert.badges && expert.badges.indexOf(\'fast\') !== -1"> ' +
                                        '<span uib-tooltip="{{\'case.professional.badges.badge1\' | translate}}"><i class="fa fa-flash"></i></span> ' +
                                    '</div> ' +
                                    '<div ng-show="expert.badges && expert.badges.indexOf(\'efficient\') !== -1"> ' +
                                        '<span uib-tooltip="{{\'case.professional.badges.badge2\' | translate}}"><i class="fa fa-fire"></i></span> ' +
                                    '</div> ' +
                                    '<div ng-show="expert.badges && expert.badges.indexOf(\'expert\') !== -1"> ' +
                                        '<span tooltip-placement="left" uib-tooltip="{{\'case.professional.badges.badge3\' | translate}}"><i class="fa fa-rocket"></i></span> ' +
                                    '</div> ' +
                                '</div> ' +
                            '</div> ' +
                        '</div> '
        };

        return directive;
    }
})();
