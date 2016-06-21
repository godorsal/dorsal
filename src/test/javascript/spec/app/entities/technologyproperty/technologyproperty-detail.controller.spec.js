'use strict';

describe('Controller Tests', function() {

    describe('Technologyproperty Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockTechnologyproperty, MockTechnologypropertyvalue;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockTechnologyproperty = jasmine.createSpy('MockTechnologyproperty');
            MockTechnologypropertyvalue = jasmine.createSpy('MockTechnologypropertyvalue');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Technologyproperty': MockTechnologyproperty,
                'Technologypropertyvalue': MockTechnologypropertyvalue
            };
            createController = function() {
                $injector.get('$controller')("TechnologypropertyDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'dorsalApp:technologypropertyUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
