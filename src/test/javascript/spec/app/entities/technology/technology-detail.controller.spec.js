'use strict';

describe('Controller Tests', function() {

    describe('Technology Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockTechnology, MockTechnologypropertyvalue;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockTechnology = jasmine.createSpy('MockTechnology');
            MockTechnologypropertyvalue = jasmine.createSpy('MockTechnologypropertyvalue');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Technology': MockTechnology,
                'Technologypropertyvalue': MockTechnologypropertyvalue
            };
            createController = function() {
                $injector.get('$controller')("TechnologyDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'dorsalApp:technologyUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
