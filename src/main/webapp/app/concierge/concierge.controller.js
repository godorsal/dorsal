(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ConciergeController', ConciergeController);

    ConciergeController.$inject = ['$rootScope', '$scope', '$state', 'LoginService', 'Principal', 'ConciergeService', '$translate', '$http', 'Supportcase', 'Casetechnologyproperty', 'toastr', 'AttachmentModalService', 'DateUtils', 'CaseService', 'DrslNewCaseService', 'DrslMetadata', 'ExpertAccount', 'DrslUserFlowService', 'SupportCaseReport'];

    function ConciergeController($rootScope, $scope, $state, LoginService, Principal, ConciergeService, $translate, $http, Supportcase, Casetechnologyproperty, toastr, AttachmentModalService, DateUtils, CaseService, DrslNewCaseService, DrslMetadata, ExpertAccount, DrslUserFlowService, SupportCaseReport) {

        DrslUserFlowService.handleUserFlow();

        // Set the view model and view model properties/methods
        var vm = this;
        vm.technologyProperties = {};
        vm.technology = {};
        vm.issue = {};
        vm.isSaving = false;
        vm.isAuthenticated = Principal.isAuthenticated;
        vm.product = null;
        vm.errorMissingTech = $translate.instant('concierge.errors.missing.tech');
        vm.errorMissingIssue = $translate.instant('concierge.errors.missing.issue');
        vm.errorMissingDescription = $translate.instant('concierge.errors.missing.description');
        vm.errorMissingAll = $translate.instant('concierge.errors.missing.all');
        vm.DrslMetadata = DrslMetadata;
        vm.caseDetails = {
            summary: '',
            description: '',
            radios: []
        };
        vm.datePopup = {
            opened: false
        };
        vm.defaultDate = new Date();
        vm.defaultDate.setDate(vm.defaultDate.getDate() + 7);
        vm.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1,
            showWeeks: false
        };
        vm.DrslUserFlowService = DrslUserFlowService;

        // vm methods
        vm.init = init;
        vm.submitForm = submitForm;
        vm.createCase = createCase;
        vm.openDatePopup = openDatePopup;

        /**
         * Creates (saves/updates) the case.
         * Called after the form is submitted and the user is authenticated.
         */
        function createCase() {
            // Exit/Return if we already know we have errors
            if (hasErrors()) {
                checkError();
                return;
            }

            var brandNewCase = {};
            brandNewCase.technology = vm.technology;
            brandNewCase.issue = vm.issue;
            brandNewCase.status = {code: "case_created_assigned_to-Expert", id: 1, name: "CREATED"};
            brandNewCase.id = null;
            brandNewCase.expectedresult = null;
            brandNewCase.chaturl = null;
            brandNewCase.user = {};
            brandNewCase.etacompletion = "4 hours";
            brandNewCase.statusmsg = 'Case Created';
            brandNewCase.expectedCompletionDate = DateUtils.convertDateTimeFromServer(vm.defaultDate);
            brandNewCase.summary = vm.caseDetails.summary;
            vm.isSaving = true;

            if (brandNewCase.id !== null) {
                Supportcase.update(brandNewCase, onSaveSuccess, onSaveError);
            } else {
                Supportcase.save(brandNewCase, onSaveSuccess, onSaveError);
            }
        }

        /**
         * The success callback for saving/updating a case.
         * @param result
         */
        var onSaveSuccess = function (result) {
            DrslNewCaseService.setNewCaseId(result.id);

            // Loop through each tech property and save via an api call
            for (var key in vm.technologyProperties) {
                if (vm.technologyProperties.hasOwnProperty(key)) {
                    var brandNewProperty = {};
                    brandNewProperty.technology = vm.technology;
                    brandNewProperty.supportcase = {};
                    brandNewProperty.supportcase.id = result.id;
                    brandNewProperty.propertyname = key;
                    brandNewProperty.propertyvalue = vm.technologyProperties[key];

                    Casetechnologyproperty.save(brandNewProperty);
                }
            }

            // Reset view model properties
            vm.technologyProperties = null;
            vm.technology = null;
            vm.issue = null;
            vm.isSaving = false;

            // emit a 'dorsalApp:supportcaseUpdate' so the app can be aware of the change
            $scope.$emit('dorsalApp:supportcaseUpdate', result);

            // redirect to the case page
            $state.go('case')
        };

        /**
         * The error callback for saving/updating a case.
         */
        var onSaveError = function () {
            vm.isSaving = false;
            checkError()
        };

        /**
         * Checks to see if the user has provided all of the required bits of data.
         * Called before data is sent to the back-end
         * @returns {boolean}
         */
        function hasErrors() {
            return (Object.keys(vm.technology).length === 0 ||
            Object.keys(vm.issue).length === 0 ||
            vm.caseDetails.summary.length === 0);
        }

        /**
         * Check to see why we may have gotten an error from the back-end.
         * Display a toastr message if we were able to determine the missing data.
         */
        function checkError() {
            var messages = [];

            // If we don't have any of the required data, display a summary error message.
            if (Object.keys(vm.technology).length === 0 && Object.keys(vm.issue).length === 0 && vm.caseDetails.summary.length === 0) {
                messages.push(vm.errorMissingAll);
            } else {
                // No Issue message
                if (Object.keys(vm.issue).length === 0) {
                    messages.push(vm.errorMissingIssue);
                }

                // No Tech message
                if (Object.keys(vm.technology).length === 0) {
                    messages.push(vm.errorMissingTech);
                }

                // No Summary message
                if (vm.caseDetails.summary.length === 0) {
                    messages.push(vm.errorMissingDescription);
                }
            }

            // If we have any messages display them in a toastr message
            if (messages.length) {
                toastr.warning(messages.join('<br/>'), {timeOut: 5000});
            }
        }

        /**
         * Initialize the controller's data.
         */
        function init() {
            // Make a call to get the initial data.
            ConciergeService.getEntityData().then(function (data) {
                vm.caseDetails = data;

                // Store a shortcut reference to the product object
                vm.product = vm.caseDetails.radios.filter(function (o) {
                    return o.id === 'product';
                })[0];
            });
        }

        /**
         * Submits the form, or opens the login dialog if the user isn't logged in.
         */
        function submitForm() {
            if (!vm.isAuthenticated()) {
                LoginService.open();
                $rootScope.$on('authenticationSuccess', function () {
                    Principal.identity().then(function () {
                        vm.createCase();
                    })
                })
            } else {
                Principal.identity().then(function () {
                    vm.createCase();
                })
            }
        }

        /**
         * Sets the vm.datePopup.opened boolean, which toggles the date popup display.
         */
        function openDatePopup() {
            vm.datePopup.opened = true;
        }

        // Call to initialize the controller.
        vm.init();
    }
})();
