'use strict';

describe('Controller Tests', function() {

    describe('Badge Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockBadge, MockExpertbadge;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockBadge = jasmine.createSpy('MockBadge');
            MockExpertbadge = jasmine.createSpy('MockExpertbadge');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Badge': MockBadge,
                'Expertbadge': MockExpertbadge
            };
            createController = function() {
                $injector.get('$controller')("BadgeDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'dorsalApp:badgeUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
