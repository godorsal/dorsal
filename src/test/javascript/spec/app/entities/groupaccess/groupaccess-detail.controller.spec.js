'use strict';

describe('Controller Tests', function() {

    describe('Groupaccess Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockGroupaccess, MockUser;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockGroupaccess = jasmine.createSpy('MockGroupaccess');
            MockUser = jasmine.createSpy('MockUser');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Groupaccess': MockGroupaccess,
                'User': MockUser
            };
            createController = function() {
                $injector.get('$controller')("GroupaccessDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'dorsalApp:groupaccessUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
