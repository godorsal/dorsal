(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .directive('caseDetails', caseDetails);

    function caseDetails($translate, $locale, tmhDynamicLocale) {
        var directive = {
            restrict: 'E',
            scope:  {
                case: '=',
                history: '@'
            },
            template:'<div class="panel panel-default drsl-panel"> ' +
                        '<div class="panel-heading"> ' +
                            '<h3 class="panel-title" translate="case.details.header" ng-hide="history">Current Case</h3> ' +
                            '<h3 class="panel-title" translate="case.history.details.header" ng-show="history">Case History</h3> ' +
                        '</div> ' +
                        '<div class="panel-body"> ' +
                            '<div class="row"> ' +
                                '<div class="col-md-6"> ' +
                                    '<div class="panel panel-default drsl-sub-panel"> ' +
                                        '<div class="panel-body"> ' +
                                            '<span translate="case.details.user">User:</span>{{case.user}} ' +
                                        '</div> ' +
                                    '</div> ' +
                                    '<div class="panel panel-default drsl-sub-panel"> ' +
                                        '<div class="panel-body"> ' +
                                            '<span translate="case.details.status.main">Status:</span> {{case.status | translate}} ' +
                                        '</div> ' +
                                    '</div> ' +
                                '</div> ' +
                                '<div class="col-md-6"> ' +
                                    '<div class="panel panel-default drsl-sub-panel"> ' +
                                        '<div class="panel-body"> ' +
                                            '<span translate="case.details.id">Case ID:</span> {{case.id}} ' +
                                        '</div> ' +
                                    '</div> ' +
                                    '<div class="panel panel-default drsl-sub-panel"> ' +
                                        '<div class="panel-body"> ' +
                                            '<span translate="case.details.lastUpdate">Last Update:</span> {{case.lastUpdated | date}} ' +
                                        '</div> ' +
                                    '</div> ' +
                                '</div> ' +
                                '<div class="col-md-12"> ' +
                                    '<div class="panel panel-default drsl-sub-panel"> ' +
                                        '<div class="panel-body"> ' +
                                            '<span translate="case.details.chatRoom">Chat room:</span> <a ng-href="{{case.chatRoom.link}}" target="_blank">{{case.chatRoom.id}}</a> ' +
                                        '</div> ' +
                                    '</div> ' +
                                '</div> ' +
                            '</div> ' +
                        '</div> ' +
                    '</div> '
        };

        return directive;
    }
})();
