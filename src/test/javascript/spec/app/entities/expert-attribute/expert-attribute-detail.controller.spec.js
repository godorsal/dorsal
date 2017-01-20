'use strict';

describe('Controller Tests', function() {

    describe('ExpertAttribute Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockExpertAttribute, MockExpertAttributeToExpert;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockExpertAttribute = jasmine.createSpy('MockExpertAttribute');
            MockExpertAttributeToExpert = jasmine.createSpy('MockExpertAttributeToExpert');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'ExpertAttribute': MockExpertAttribute,
                'ExpertAttributeToExpert': MockExpertAttributeToExpert
            };
            createController = function() {
                $injector.get('$controller')("ExpertAttributeDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'dorsalApp:expertAttributeUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
