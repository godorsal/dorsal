'use strict';

describe('Controller Tests', function() {

    describe('ExpertAccount Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockExpertAccount, MockUser, MockExpertbadge;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockExpertAccount = jasmine.createSpy('MockExpertAccount');
            MockUser = jasmine.createSpy('MockUser');
            MockExpertbadge = jasmine.createSpy('MockExpertbadge');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'ExpertAccount': MockExpertAccount,
                'User': MockUser,
                'Expertbadge': MockExpertbadge
            };
            createController = function() {
                $injector.get('$controller')("ExpertAccountDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'dorsalApp:expertAccountUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
