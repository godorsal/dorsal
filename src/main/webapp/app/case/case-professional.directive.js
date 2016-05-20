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
                                '<h3 class="panel-title">Support Professional</h3> ' +
                            '</div> ' +
                            '<div class="panel-body"> ' +
                                '<div class="row"> ' +
                                    '<div class="col-md-10"> ' +
                                        '<div class="panel panel-default drsl-sub-panel"> ' +
                                            '<div class="panel-body"> ' +
                                                '<span>Expert:</span> {{expert.name}} ' +
                                            '</div> ' +
                                        '</div> ' +
                                        '<div class="panel panel-default drsl-sub-panel"> ' +
                                            '<div class="panel-body"> ' +
                                                '<div class="drsl-contact-wrapper"> ' +
                                                    '<div>Contact:</div> ' +
                                                    '<div> ' +
                                                        '<i class="fa fa-envelope" title="email"></i> {{expert.contact.email}}<br/> ' +
                                                        '<i class="fa fa-phone" title="phone"></i> {{expert.contact.phone}}<br/> ' +
                                                        '<i class="fa fa-skype" title="skype"></i> {{expert.contact.skype}} ' +
                                                    '</div> ' +
                                                '</div> ' +
                                            '</div> ' +
                                        '</div> ' +
                                        '<div class="panel panel-default drsl-sub-panel"> ' +
                                            '<div class="panel-body"> ' +
                                                '<span>Expert Score:</span> {{expert.score}} out of 100 ' +
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
