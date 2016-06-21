'use strict';

describe('Controller Tests', function() {

    describe('Technologypropertyvalue Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockTechnologypropertyvalue, MockTechnology, MockTechnologyproperty;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockTechnologypropertyvalue = jasmine.createSpy('MockTechnologypropertyvalue');
            MockTechnology = jasmine.createSpy('MockTechnology');
            MockTechnologyproperty = jasmine.createSpy('MockTechnologyproperty');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Technologypropertyvalue': MockTechnologypropertyvalue,
                'Technology': MockTechnology,
                'Technologyproperty': MockTechnologyproperty
            };
            createController = function() {
                $injector.get('$controller')("TechnologypropertyvalueDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'dorsalApp:technologypropertyvalueUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
