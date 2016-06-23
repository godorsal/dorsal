'use strict';

describe('Controller Tests', function() {

    describe('Attachement Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockAttachement, MockSupportcase;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockAttachement = jasmine.createSpy('MockAttachement');
            MockSupportcase = jasmine.createSpy('MockSupportcase');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Attachement': MockAttachement,
                'Supportcase': MockSupportcase
            };
            createController = function() {
                $injector.get('$controller')("AttachementDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'dorsalApp:attachementUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
