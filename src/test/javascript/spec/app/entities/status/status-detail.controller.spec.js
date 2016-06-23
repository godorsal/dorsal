'use strict';

describe('Controller Tests', function() {

    describe('Status Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockStatus, MockSupportcase;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockStatus = jasmine.createSpy('MockStatus');
            MockSupportcase = jasmine.createSpy('MockSupportcase');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Status': MockStatus,
                'Supportcase': MockSupportcase
            };
            createController = function() {
                $injector.get('$controller')("StatusDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'dorsalApp:statusUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
