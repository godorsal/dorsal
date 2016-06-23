'use strict';

describe('Controller Tests', function() {

    describe('Caseupdate Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockCaseupdate, MockUser, MockSupportcase, MockUpdatetype;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockCaseupdate = jasmine.createSpy('MockCaseupdate');
            MockUser = jasmine.createSpy('MockUser');
            MockSupportcase = jasmine.createSpy('MockSupportcase');
            MockUpdatetype = jasmine.createSpy('MockUpdatetype');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Caseupdate': MockCaseupdate,
                'User': MockUser,
                'Supportcase': MockSupportcase,
                'Updatetype': MockUpdatetype
            };
            createController = function() {
                $injector.get('$controller')("CaseupdateDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'dorsalApp:caseupdateUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
