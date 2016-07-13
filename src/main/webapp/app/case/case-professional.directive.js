(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .directive('caseProfessional', caseProfessional);

    caseProfessional.$inject = ['CaseService'];

    function caseProfessional(CaseService) {
        var directive = {
            restrict: 'E',
            scope:  {
                expert: '=',
                chatRoom: '='
            },
            templateUrl: 'app/case/case-professional.directive.html',
            link: linkFunc
        };

        function linkFunc(scope) {
            scope.checkedForBadges = false;
            scope.expertBadges = [];

            scope.checkForBadges = function(){
                if (scope.expert) {
                    scope.checkedForBadges = true;
                    CaseService.getExpertBadges(scope.expert.id).then(function (data) {
                        scope.expertBadges = data;
                    });
                }
            };

            scope.getExpertBadges = function(){
                if (!scope.checkedForBadges){
                    scope.checkForBadges();
                }
                return scope.expertBadges;
            };
        }

        return directive;
    }
})();
