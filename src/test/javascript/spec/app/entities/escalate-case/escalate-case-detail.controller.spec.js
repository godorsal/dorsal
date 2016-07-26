'use strict';

describe('Controller Tests', function() {

    describe('EscalateCase Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockEscalateCase, MockSupportcase, MockUser;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockEscalateCase = jasmine.createSpy('MockEscalateCase');
            MockSupportcase = jasmine.createSpy('MockSupportcase');
            MockUser = jasmine.createSpy('MockUser');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'EscalateCase': MockEscalateCase,
                'Supportcase': MockSupportcase,
                'User': MockUser
            };
            createController = function() {
                $injector.get('$controller')("EscalateCaseDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'dorsalApp:escalateCaseUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
