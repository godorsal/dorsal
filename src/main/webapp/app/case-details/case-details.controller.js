(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('CaseDetailsController', CaseDetailsController);

    CaseDetailsController.$inject = ['$scope', '$timeout', '$uibModalInstance', 'drslCase', 'expert',
        'Casetechnologyproperty', 'Caseupdate', 'Attachment', 'Principal', 'DrslAttachFileService', '$document', '$rootScope'];

    function CaseDetailsController($scope, $timeout, $uibModalInstance, drslCase, expert, Casetechnologyproperty, Caseupdate, Attachment, Principal, DrslAttachFileService, $document, $rootScope) {

        // Set the view model and view model properties/methods
        var vm = this;
        vm.case = drslCase;
        vm.expert = expert;
        vm.isExpert = false;
        vm.summary = vm.case.summary.toString();
        vm.updates = [];
        vm.technologyProps = {};
        vm.technologyProps = [];
        vm.detailedResolutions = [];
        vm.updatemsg = '';
        vm.caseupdate = {
            user: vm.case.user,
            supportcase: vm.case,
        };
        vm.attachment = {
            name: null,
            url: null,
            dataStream: null,
            dataStreamContentType: null,
            id: null
        };

        // vm methods
        vm.init = init;
        vm.cancel = cancel;
        vm.submit = submit;

        /**
         * Initialize the controller's data.
         */
        function init() {
            // Populate the vm's estimateLogs, cleanup and sort it
            if (vm.case.estimateLog) {
                vm.estimateLogs = vm.case.estimateLog.split('##');
                vm.estimateLogs.pop();
                vm.estimateLogs = vm.estimateLogs.reverse();
            }

            // Determines if the current user is an expert and set's the vm's isExpert boolean
            getCurrentUser();

            // Broadcast a 'currentCaseSet' event down to child components
            $timeout(function () {
                $scope.$broadcast('currentCaseSet')
            }, 1);

            // Query for case updates
            Caseupdate.query(function (result) {
                // Reset/empty the vm's updates array
                vm.updates = [];

                // Reverse/sort the results and store on the vm
                result.reverse().forEach(function (update) {
                    if (update.supportcase.id === vm.case.id) {
                        if (update.updatetype.id == 2) {
                            vm.detailedResolutions.push(update);
                        }
                        vm.updates.push(update)
                    }
                })
            });

            // Query for tech properties
            Casetechnologyproperty.query(function (result) {
                // Update the vm's technologyProps array with the results
                result.forEach(function (property) {
                    if (property.supportcase.id === vm.case.id) {
                        switch (property.propertyname) {
                            case 'Version':
                                property.tagNO = 1;
                                vm.technologyProps.push(property);
                                break;
                            case 'Configuration':
                                property.tagNO = 2;
                                vm.technologyProps.push(property);
                                break;
                            case 'OS':
                                property.tagNO = 3;
                                vm.technologyProps.push(property);
                                break;
                            case 'Environment':
                                property.tagNO = 4;
                                vm.technologyProps.push(property);
                                break;
                            case 'Other':
                                property.tagNO = 5;
                                vm.technologyProps.other = property;
                                vm.technologyProps.push(property);
                                break;
                        }
                    }
                })
            });
        }

        /**
         * Determine if the current user is an expert and set's the vm's isExpert boolean
         */
        function getCurrentUser() {
            Principal.identity().then(function (account) {
                if (vm.case.expertaccount.user.email == account.email) {
                    vm.isExpert = true;
                } else {
                    vm.isExpert = false;
                }
            });
        }
        /**
         * On ESCAPE key press, close modal
         * @param e
         */
        $document.keyup(function(e) {
             if (e.keyCode == 27) {
                 cancel (e)
            }
        });
        /**
         * Handle the 'cancel' buttons click event
         * @param e
         */
        function cancel(e) {
            e.preventDefault();
            $uibModalInstance.dismiss('cancel');
        }

        /**
         * A Success Callback function passed to the Caseupdate save function.
         */
        function onSaveSuccess() {
            if (vm.attachment.name) {
                vm.attachment.supportcase = {
                    id: vm.case.id
                };
                Attachment.save(vm.attachment);
            }
        }

        /**
         * An Error Callback function passed to the Caseupdate save function.
         * @param error
         */
        function onSaveError(error) {
        }

        /**
         * Handles the main form submit and calls Caseupdate.save() if necessary
         */
        function submit() {
            var filesToUpload = DrslAttachFileService.attachFileList;
            console.log(filesToUpload);
            console.log(filesToUpload.join());
            // Set the update message
            // console.log("SERVICE: ", DrslAttachFileService.attachFileList);
            // if (DrslAttachFileService.attachment.name) {
            if (filesToUpload.length > 0) {
                console.log(DrslAttachFileService);
                // console.log("Upload File", DrslAttachFileService.attachment);
                // console.log("Upload Files", DrslAttachFileService.attachFileList);
                vm.caseupdate.updateMsg = DrslAttachFileService.attachment.name + " Was uploaded. " + vm.updatemsg;
                DrslAttachFileService.uploadAttachFileList(vm.case);
            } else {
                console.log("Just Message");
                vm.caseupdate.updateMsg = vm.updatemsg;
            }

            console.log('ATTACHMENT', vm.case);
            // Set the update type
            vm.caseupdate.updatetype = {
                id: 1
            };

            // Make a call to upload or delete any attachments that may have been added or removed
            // DrslAttachFileService.uploadAttachFileList(vm.case);
            // DrslAttachFileService.deleteAttachments(vm.case);

            // If there are change to the update message, save them.
            if (vm.caseupdate.updateMsg) {
                Caseupdate.save(vm.caseupdate, onSaveSuccess, onSaveError);
            }

            // Update the case summary
            vm.case.summary = vm.summary.toString();

            // Close the dialog
            $uibModalInstance.close({"updated": true});
        }
        
        // $rootScope.$on('attachmentCompleteWriteUpdate', function (thing, file) {
        //     vm.caseupdate.updateMsg = file.name + " Was uploaded. " + vm.updatemsg;
        //     Caseupdate.save(vm.caseupdate, onSaveSuccess, onSaveError);
        // })
        // Call to initialize the controller.
        vm.init();
    }
})();
