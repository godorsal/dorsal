'use strict';

describe('Controller Tests', function() {

    describe('Updatetype Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockUpdatetype, MockCaseupdate;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockUpdatetype = jasmine.createSpy('MockUpdatetype');
            MockCaseupdate = jasmine.createSpy('MockCaseupdate');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Updatetype': MockUpdatetype,
                'Caseupdate': MockCaseupdate
            };
            createController = function() {
                $injector.get('$controller')("UpdatetypeDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'dorsalApp:updatetypeUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
