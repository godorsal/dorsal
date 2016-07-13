'use strict';

describe('Controller Tests', function() {

    describe('Expertbadge Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockExpertbadge, MockExpertAccount, MockBadge;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockExpertbadge = jasmine.createSpy('MockExpertbadge');
            MockExpertAccount = jasmine.createSpy('MockExpertAccount');
            MockBadge = jasmine.createSpy('MockBadge');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Expertbadge': MockExpertbadge,
                'ExpertAccount': MockExpertAccount,
                'Badge': MockBadge
            };
            createController = function() {
                $injector.get('$controller')("ExpertbadgeDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'dorsalApp:expertbadgeUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
