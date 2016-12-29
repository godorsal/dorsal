'use strict';

describe('Controller Tests', function() {

    describe('SkillExpertScore Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockSkillExpertScore, MockExpertAccount, MockSkill;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockSkillExpertScore = jasmine.createSpy('MockSkillExpertScore');
            MockExpertAccount = jasmine.createSpy('MockExpertAccount');
            MockSkill = jasmine.createSpy('MockSkill');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'SkillExpertScore': MockSkillExpertScore,
                'ExpertAccount': MockExpertAccount,
                'Skill': MockSkill
            };
            createController = function() {
                $injector.get('$controller')("SkillExpertScoreDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'dorsalApp:skillExpertScoreUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
