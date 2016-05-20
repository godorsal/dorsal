(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .directive('caseDetails', caseDetails);

    function caseDetails($translate, $locale, tmhDynamicLocale) {
        var directive = {
            restrict: 'E',
            scope:  {
                case: '='
            },
            template:'<div class="panel panel-default drsl-panel"> ' +
                        '<div class="panel-heading"> ' +
                            '<h3 class="panel-title">Current Case</h3> ' +
                        '</div> ' +
                        '<div class="panel-body"> ' +
                            '<div class="row"> ' +
                                '<div class="col-md-6"> ' +
                                    '<div class="panel panel-default drsl-sub-panel"> ' +
                                        '<div class="panel-body"> ' +
                                            '<span>User:</span>{{case.details.user}} ' +
                                        '</div> ' +
                                    '</div> ' +
                                    '<div class="panel panel-default drsl-sub-panel"> ' +
                                        '<div class="panel-body"> ' +
                                            '<span>Status:</span> {{case.details.status}} ' +
                                        '</div> ' +
                                    '</div> ' +
                                '</div> ' +
                                '<div class="col-md-6"> ' +
                                    '<div class="panel panel-default drsl-sub-panel"> ' +
                                        '<div class="panel-body"> ' +
                                            '<span>Case ID:</span> {{case.details.id}} ' +
                                        '</div> ' +
                                    '</div> ' +
                                    '<div class="panel panel-default drsl-sub-panel"> ' +
                                        '<div class="panel-body"> ' +
                                            '<span>Last Update:</span> {{case.details.lastUpdate | date}} ' +
                                        '</div> ' +
                                    '</div> ' +
                                '</div> ' +
                                '<div class="col-md-12"> ' +
                                    '<div class="panel panel-default drsl-sub-panel"> ' +
                                        '<div class="panel-body"> ' +
                                            '<span>Chat room:</span> <a ng-href="{{case.details.chatRoom.link}}" target="_blank">{{case.details.chatRoom.id}}</a> ' +
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
