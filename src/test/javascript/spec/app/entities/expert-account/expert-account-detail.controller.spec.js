'use strict';

describe('Controller Tests', function() {

    describe('ExpertAccount Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockExpertAccount, MockUser, MockUseraccount, MockSupportcase, MockTechnology, MockIssue;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockExpertAccount = jasmine.createSpy('MockExpertAccount');
            MockUser = jasmine.createSpy('MockUser');
            MockUseraccount = jasmine.createSpy('MockUseraccount');
            MockSupportcase = jasmine.createSpy('MockSupportcase');
            MockTechnology = jasmine.createSpy('MockTechnology');
            MockIssue = jasmine.createSpy('MockIssue');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'ExpertAccount': MockExpertAccount,
                'User': MockUser,
                'Useraccount': MockUseraccount,
                'Supportcase': MockSupportcase,
                'Technology': MockTechnology,
                'Issue': MockIssue
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
