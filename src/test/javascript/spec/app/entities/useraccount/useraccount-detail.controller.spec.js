'use strict';

describe('Controller Tests', function() {

    describe('Useraccount Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockUseraccount, MockUser, MockExpertAccount;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockUseraccount = jasmine.createSpy('MockUseraccount');
            MockUser = jasmine.createSpy('MockUser');
            MockExpertAccount = jasmine.createSpy('MockExpertAccount');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Useraccount': MockUseraccount,
                'User': MockUser,
                'ExpertAccount': MockExpertAccount
            };
            createController = function() {
                $injector.get('$controller')("UseraccountDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'dorsalApp:useraccountUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
