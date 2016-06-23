'use strict';

describe('Controller Tests', function() {

    describe('Referencedoc Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockReferencedoc, MockUser, MockTechnology;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockReferencedoc = jasmine.createSpy('MockReferencedoc');
            MockUser = jasmine.createSpy('MockUser');
            MockTechnology = jasmine.createSpy('MockTechnology');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Referencedoc': MockReferencedoc,
                'User': MockUser,
                'Technology': MockTechnology
            };
            createController = function() {
                $injector.get('$controller')("ReferencedocDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'dorsalApp:referencedocUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
