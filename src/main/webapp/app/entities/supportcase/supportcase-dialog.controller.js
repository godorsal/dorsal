(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('SupportcaseDialogController', SupportcaseDialogController);

    SupportcaseDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Supportcase', 'Casetechnologyproperty', 'Caseupdate', 'Rating', 'Attachement', 'User', 'Technology', 'Status', 'Issue'];

    function SupportcaseDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Supportcase, Casetechnologyproperty, Caseupdate, Rating, Attachement, User, Technology, Status, Issue) {
        var vm = this;
        vm.supportcase = entity;
        vm.casetechnologyproperties = Casetechnologyproperty.query();
        vm.caseupdates = Caseupdate.query();
        vm.ratings = Rating.query();
        vm.attachements = Attachement.query();
        vm.users = User.query();
        vm.technologies = Technology.query();
        vm.statuses = Status.query();
        vm.issues = Issue.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('dorsalApp:supportcaseUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.supportcase.id !== null) {
                Supportcase.update(vm.supportcase, onSaveSuccess, onSaveError);
            } else {
                Supportcase.save(vm.supportcase, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.datecreated = false;
        vm.datePickerOpenStatus.datelastupdate = false;

        vm.openCalendar = function(date) {
            vm.datePickerOpenStatus[date] = true;
        };
    }
})();
