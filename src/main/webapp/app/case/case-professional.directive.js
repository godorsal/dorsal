(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .directive('caseProfessional', caseProfessional);

    function caseProfessional($translate, $locale, tmhDynamicLocale) {
        var directive = {
            restrict: 'E',
            scope:  {
                expert: '='
            },
            template: '<div class="panel panel-default drsl-panel" > ' +
                            '<div class="panel-heading"> ' +
                                '<h3 class="panel-title" translate="case.professional.header">Support Professional</h3> ' +
                            '</div> ' +
                            '<div class="panel-body"> ' +
                                '<div class="row"> ' +
                                    '<div class="col-md-10"> ' +
                                        '<div class="panel panel-default drsl-sub-panel"> ' +
                                            '<div class="panel-body"> ' +
                                                '<span translate="case.professional.expert">Expert:</span> {{expert.firstName}} {{expert.lastName}} ' +
                                            '</div> ' +
                                        '</div> ' +
                                        '<div class="panel panel-default drsl-sub-panel"> ' +
                                            '<div class="panel-body"> ' +
                                                '<div class="drsl-contact-wrapper"> ' +
                                                    '<div translate="case.professional.contact.main">Contact:</div> ' +
                                                    '<div> ' +
                                                        '<div ng-show="expert.contact.email"><i class="fa fa-envelope" title="{{\'case.professional.contact.email\' | translate}}"></i> {{expert.contact.email}}</div> ' +
                                                        '<div ng-show="expert.contact.phone"><i class="fa fa-phone" title="{{\'case.professional.contact.phone\' | translate}}"></i> {{expert.contact.phone}}</div>' +
                                                        '<div ng-show="expert.contact.skype"><i class="fa fa-skype" title="{{\'case.professional.contact.skype\' | translate}}"></i> {{expert.contact.skype}}</div>' +
                                                    '</div> ' +
                                                '</div> ' +
                                            '</div> ' +
                                        '</div> ' +
                                        '<div class="panel panel-default drsl-sub-panel"> ' +
                                            '<div class="panel-body"> ' +
                                                '<span translate="case.professional.score">Expert Score:</span> {{expert.score}} out of 100 ' +
                                            '</div> ' +
                                        '</div> ' +
                                    '</div> ' +
                                    '<div class="col-md-2"> ' +
                                        '<expert-thumbnail expert="expert"></expert-thumbnail>' +
                                    '</div> ' +
                                '</div> ' +
                            '</div> ' +
                        '</div> '
        };

        return directive;
    }
})();
