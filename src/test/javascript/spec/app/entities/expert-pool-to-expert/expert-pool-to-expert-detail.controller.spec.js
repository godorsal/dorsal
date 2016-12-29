'use strict';

describe('Controller Tests', function() {

    describe('ExpertPoolToExpert Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockExpertPoolToExpert, MockExpertAccount, MockExpertPool;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockExpertPoolToExpert = jasmine.createSpy('MockExpertPoolToExpert');
            MockExpertAccount = jasmine.createSpy('MockExpertAccount');
            MockExpertPool = jasmine.createSpy('MockExpertPool');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'ExpertPoolToExpert': MockExpertPoolToExpert,
                'ExpertAccount': MockExpertAccount,
                'ExpertPool': MockExpertPool
            };
            createController = function() {
                $injector.get('$controller')("ExpertPoolToExpertDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'dorsalApp:expertPoolToExpertUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
