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
                            '<span>{{aCode}}</span>' +
                            '<span>{{theRest}}</span>' +
                        '</div>' +
                        '<div ng-show="contact.skype">' +
                            '<i class="fa fa-skype" tooltip-placement="left" uib-tooltip="{{\'case.professional.contact.skype\' | translate}}"></i> ' +
                            '{{contact.skype}}' +
                        '</div>' +
                        '<div ng-show="chatRoom">' +
                            '<i class="fa fa-comments-o" tooltip-placement="left" uib-tooltip="{{\'case.professional.contact.chat\' | translate}}"></i> ' +
                            '<a ng-href="{{chatRoom.link}}" target="_blank">{{chatRoom.id}}</a>' +
                        '</div>' +
                        '<div ng-show="showOther">' +
                            '<i class="fa fa-arrow-right" tooltip-placement="left" uib-tooltip="{{\'case.professional.contact.other\' | translate}}"></i> ' +
                            '<a ng-href="{{otherLink}}" target="_blank">{{otherTitle}}</a>' +
                        '</div>' +
                    '</div>'
            ,
            link: linkFunc
        };

        return directive;

        function linkFunc(scope) {
            scope.$watch('contact', function(contact){
                if (contact) {
                    scope.aCode = contact.phone.substring(0, 3);
                    scope.theRest = contact.phone.substring(3, contact.phone.length);
                    var othercommunication = contact.othercommunication.split(',');
                    scope.otherLink = othercommunication[0];
                    scope.otherTitle = othercommunication[1];
                    scope.showOther = scope.otherTitle != 'undefined' && scope.otherLink != 'undefined' && othercommunication.length > 1;
                }
            })
        }

    }
})();
