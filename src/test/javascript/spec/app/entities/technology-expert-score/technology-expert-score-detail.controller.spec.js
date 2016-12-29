'use strict';

describe('Controller Tests', function() {

    describe('TechnologyExpertScore Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockTechnologyExpertScore, MockExpertAccount, MockTechnology;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockTechnologyExpertScore = jasmine.createSpy('MockTechnologyExpertScore');
            MockExpertAccount = jasmine.createSpy('MockExpertAccount');
            MockTechnology = jasmine.createSpy('MockTechnology');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'TechnologyExpertScore': MockTechnologyExpertScore,
                'ExpertAccount': MockExpertAccount,
                'Technology': MockTechnology
            };
            createController = function() {
                $injector.get('$controller')("TechnologyExpertScoreDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'dorsalApp:technologyExpertScoreUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
