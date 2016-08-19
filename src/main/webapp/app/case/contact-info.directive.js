(function() {
    'use strict';

    angular
    .module('dorsalApp')
    .directive('contactInfo', contactInfo);


    function contactInfo() {
        var directive = {
            restrict: 'E',
            scope:  {
                contact: '=',
                chatRoom: '='
            },
            template:   '<div class="drsl-contact-info">' +
                            '<div ng-show="contact.user.email">' +
                            '<i class="fa fa-envelope" tooltip-placement="left" uib-tooltip="{{\'case.professional.contact.email\' | translate}}" ></i> ' +
                            '{{contact.user.email}}' +
                        '</div>' +
                        '<div ng-show="contact.phone">' +
                            '<i class="fa fa-phone" tooltip-placement="left" uib-tooltip="{{\'case.professional.contact.phone\' | translate}}"></i> ' +
                            '{{contact.phone}}' +
                        '</div>' +
                        '<div ng-show="contact.skype">' +
                            '<i class="fa fa-skype" tooltip-placement="left" uib-tooltip="{{\'case.professional.contact.skype\' | translate}}"></i> ' +
                            '{{contact.skype}}' +
                        '</div>' +
                        '<div ng-show="chatRoom">' +
                            '<i class="fa fa-comments-o" tooltip-placement="left" uib-tooltip="{{\'case.professional.contact.chat\' | translate}}"></i> ' +
                            '<a ng-href="{{chatRoom.link}}" target="_blank">{{chatRoom.id}}</a>' +
                        '</div>' +
                        '<div>' +
                            '<i class="fa fa-arrow-right" tooltip-placement="left" uib-tooltip="{{\'case.professional.contact.other\' | translate}}"></i> ' +
                            '<a ng-href="{{otherTitle}}" target="_blank">{{otherLink}}</a>' +
                        '</div>' +
                    '</div>'
            ,
            link: linkFunc
        };

        return directive;

        function linkFunc(scope) {
            scope.$watch('contact', function(contact){
                if (contact) {
                    var othercommunication = contact.othercommunication.split(',');
                    scope.otherTitle = othercommunication[0];
                    scope.otherLink = othercommunication[1];
                }
            })
        }

    }
})();
