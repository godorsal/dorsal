'use strict';

describe('Controller Tests', function() {

    describe('GlobalMetadata Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockGlobalMetadata;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockGlobalMetadata = jasmine.createSpy('MockGlobalMetadata');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'GlobalMetadata': MockGlobalMetadata
            };
            createController = function() {
                $injector.get('$controller')("GlobalMetadataDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'dorsalApp:globalMetadataUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
