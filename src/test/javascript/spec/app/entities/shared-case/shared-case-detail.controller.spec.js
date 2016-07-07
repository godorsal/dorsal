'use strict';

describe('Controller Tests', function() {

    describe('SharedCase Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockSharedCase, MockSupportcase, MockUser;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockSharedCase = jasmine.createSpy('MockSharedCase');
            MockSupportcase = jasmine.createSpy('MockSupportcase');
            MockUser = jasmine.createSpy('MockUser');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'SharedCase': MockSharedCase,
                'Supportcase': MockSupportcase,
                'User': MockUser
            };
            createController = function() {
                $injector.get('$controller')("SharedCaseDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'dorsalApp:sharedCaseUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
