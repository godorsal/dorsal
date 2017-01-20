'use strict';

describe('Controller Tests', function() {

    describe('JobroleExpertScore Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockJobroleExpertScore, MockExpertAccount, MockJobRole;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockJobroleExpertScore = jasmine.createSpy('MockJobroleExpertScore');
            MockExpertAccount = jasmine.createSpy('MockExpertAccount');
            MockJobRole = jasmine.createSpy('MockJobRole');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'JobroleExpertScore': MockJobroleExpertScore,
                'ExpertAccount': MockExpertAccount,
                'JobRole': MockJobRole
            };
            createController = function() {
                $injector.get('$controller')("JobroleExpertScoreDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'dorsalApp:jobroleExpertScoreUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
