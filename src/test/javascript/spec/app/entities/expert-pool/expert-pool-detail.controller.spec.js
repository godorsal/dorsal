'use strict';

describe('Controller Tests', function() {

    describe('ExpertPool Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockExpertPool, MockExpertPoolToExpert, MockExpertAccount;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockExpertPool = jasmine.createSpy('MockExpertPool');
            MockExpertPoolToExpert = jasmine.createSpy('MockExpertPoolToExpert');
            MockExpertAccount = jasmine.createSpy('MockExpertAccount');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'ExpertPool': MockExpertPool,
                'ExpertPoolToExpert': MockExpertPoolToExpert,
                'ExpertAccount': MockExpertAccount
            };
            createController = function() {
                $injector.get('$controller')("ExpertPoolDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'dorsalApp:expertPoolUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
