'use strict';

describe('Controller Tests', function() {

    describe('Casetechnologyproperty Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockCasetechnologyproperty, MockSupportcase, MockTechnology;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockCasetechnologyproperty = jasmine.createSpy('MockCasetechnologyproperty');
            MockSupportcase = jasmine.createSpy('MockSupportcase');
            MockTechnology = jasmine.createSpy('MockTechnology');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Casetechnologyproperty': MockCasetechnologyproperty,
                'Supportcase': MockSupportcase,
                'Technology': MockTechnology
            };
            createController = function() {
                $injector.get('$controller')("CasetechnologypropertyDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'dorsalApp:casetechnologypropertyUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
