'use strict';

describe('Controller Tests', function() {

    describe('SpecialityExpertScore Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockSpecialityExpertScore, MockExpertAccount, MockSpeciality;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockSpecialityExpertScore = jasmine.createSpy('MockSpecialityExpertScore');
            MockExpertAccount = jasmine.createSpy('MockExpertAccount');
            MockSpeciality = jasmine.createSpy('MockSpeciality');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'SpecialityExpertScore': MockSpecialityExpertScore,
                'ExpertAccount': MockExpertAccount,
                'Speciality': MockSpeciality
            };
            createController = function() {
                $injector.get('$controller')("SpecialityExpertScoreDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'dorsalApp:specialityExpertScoreUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
