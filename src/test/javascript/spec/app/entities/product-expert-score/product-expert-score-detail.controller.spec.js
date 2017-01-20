'use strict';

describe('Controller Tests', function() {

    describe('ProductExpertScore Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockProductExpertScore, MockExpertAccount, MockProduct;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockProductExpertScore = jasmine.createSpy('MockProductExpertScore');
            MockExpertAccount = jasmine.createSpy('MockExpertAccount');
            MockProduct = jasmine.createSpy('MockProduct');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'ProductExpertScore': MockProductExpertScore,
                'ExpertAccount': MockExpertAccount,
                'Product': MockProduct
            };
            createController = function() {
                $injector.get('$controller')("ProductExpertScoreDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'dorsalApp:productExpertScoreUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
