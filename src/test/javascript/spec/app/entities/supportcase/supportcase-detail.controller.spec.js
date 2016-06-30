'use strict';

describe('Controller Tests', function() {

    describe('Supportcase Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockSupportcase, MockUser, MockTechnology, MockStatus, MockIssue;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockSupportcase = jasmine.createSpy('MockSupportcase');
            MockUser = jasmine.createSpy('MockUser');
            MockTechnology = jasmine.createSpy('MockTechnology');
            MockStatus = jasmine.createSpy('MockStatus');
            MockIssue = jasmine.createSpy('MockIssue');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Supportcase': MockSupportcase,
                'User': MockUser,
                'Technology': MockTechnology,
                'Status': MockStatus,
                'Issue': MockIssue
            };
            createController = function() {
                $injector.get('$controller')("SupportcaseDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'dorsalApp:supportcaseUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
