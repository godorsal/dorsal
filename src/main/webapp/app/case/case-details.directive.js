(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .directive('caseDetails', caseDetails);

    function caseDetails($translate, $locale, tmhDynamicLocale, RatingService) {
        var directive = {
            restrict: 'E',
            scope:  {
                case: '=',
                status: '=',
                history: '@',
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
                                            '<div style="display: flex; flex-flow: row; align-items: center"> ' +
                                                '<div style="flex: 2" ng-show="history || rated"><span translate="case.details.status.main">Status:</span> {{status[case.status] | translate}}</div> ' +
                                                '<div style="flex: 2" ng-hide="history || rated"><span translate="case.details.status.main">Status:</span><select class="form-control" style="display: inline-block; width: auto;" ng-model="case.status" ng-options="item.value as item.label for item in statusOptions"></select></div> ' +
                                                '<div style="flex: 1;text-align: right" ng-show="!history && !rated && case.status == \'resolved\'"><button class="btn btn-success" ng-click="rate()">rate</button></div> ' +
                                            '</div> ' +
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
                    '</div> ',
            link: linkFunc
        };

        return directive;

        function linkFunc(scope) {
            scope.rated = false;
            scope.statusOptions = [
                {
                    label: 'Unassigned',
                    value: 'unassigned'
                },
                {
                    label: 'Assigned',
                    value: 'assigned'
                },
                {
                    label: 'Working',
                    value: 'working'
                },
                {
                    label: 'Resolved',
                    value: 'resolved'
                },
                {
                    label: 'completed',
                    value: 'completed'
                }
            ];

            scope.rate = function(){
                var modalInstance = RatingService.open();

                modalInstance.result.then(function (result) {
                    scope.rated = result.rated;
                    scope.case.status = 'completed';
                });
            };
        }
    }
})();
