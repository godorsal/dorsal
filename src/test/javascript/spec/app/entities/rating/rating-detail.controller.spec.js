'use strict';

describe('Controller Tests', function() {

    describe('Rating Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockRating, MockSupportcase;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockRating = jasmine.createSpy('MockRating');
            MockSupportcase = jasmine.createSpy('MockSupportcase');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Rating': MockRating,
                'Supportcase': MockSupportcase
            };
            createController = function() {
                $injector.get('$controller')("RatingDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'dorsalApp:ratingUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
