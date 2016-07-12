'use strict';

describe('Controller Tests', function() {

    describe('Attachment Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockAttachment, MockSupportcase;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockAttachment = jasmine.createSpy('MockAttachment');
            MockSupportcase = jasmine.createSpy('MockSupportcase');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Attachment': MockAttachment,
                'Supportcase': MockSupportcase
            };
            createController = function() {
                $injector.get('$controller')("AttachmentDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'dorsalApp:attachmentUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
