(function() {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['$rootScope', 'Principal', 'Auth', 'JhiLanguageService', '$translate', 'Payment',
    'Groupaccess', 'User', 'Focus', 'Register', 'toastr', 'ExpertAccount', 'Issue', 'Technology', '_', '$state',
    'DrslUserFlowService', 'ManageUser', 'ExpertAttribute', 'ExpertAttributeToExpert', 'JobroleExpertScore', 'ProductExpertScore', 'SpecialityExpertScore', 'SkillExpertScore', 'TechnologyExpertScore', 'Useraccount', 'ExpertPoolToExpert'];

    function SettingsController($rootScope, Principal, Auth, JhiLanguageService, $translate, Payment, Groupaccess, User, focus, Register, toastr, ExpertAccount, Issue, Technology, _, $state, DrslUserFlowService, ManageUser, ExpertAttribute, ExpertAttributeToExpert, JobroleExpertScore, ProductExpertScore, SpecialityExpertScore, SkillExpertScore, TechnologyExpertScore, Useraccount, ExpertPoolToExpert) {

        // Handle user flow redirects and messaging
        DrslUserFlowService.handleUserFlow();

        // Set the view model and view model properties/methods
        var vm = this;
        vm.error = null;
        vm.save = save;
        vm.settingsAccount = null;
        vm.creditCard = null;
        vm.success = null;
        vm.authorizedUsers = [];
        vm.invitedUsers = [];
        vm.invitedUsersToRemove = [];
        vm.activatedUsersToRemove = [];
        vm.userAttributes = [];
        vm.isAlreadyAuthorized = false;
        vm.authorizedUser = '';
        vm.number = 0;
        vm.isExpert = false;
        vm.issues = Issue.query();
        vm.technologies = Technology.query();
        vm.hideTitleElipsis = hideTitleElipsis;
        vm.showTitleElipsis = showTitleElipsis;
        vm.hideLinkElipsis = hideLinkElipsis;
        vm.showLinkElipsis = showLinkElipsis;
        // vm methods
        vm.init = init;
        vm.save = save;
        vm.addCard = addCard;
        vm.getAuthorizedUsers = getAuthorizedUsers;
        vm.numberTab = numberTab;
        vm.addAuthorizedUser = addAuthorizedUser;
        vm.removeAuthorizedUsers = removeAuthorizedUsers;
        vm.removeInvitedUsers = removeInvitedUsers;
        vm.updateUser = updateUser;
        vm.checkInvalid = checkInvalid;
        vm.editingAttributes = false;
        vm.saveAttributes = saveAttributes;
        vm.saveUserAttributes = saveUserAttributes;
        vm.deleteAttribute = deleteAttribute;
        vm.deleteUserAttribute = deleteUserAttribute;

        ExpertAttributeToExpert.query(function (res) {
            vm.expertAttributes = res;
            calculateAttributes()
        })
        function calculateAttributes() {
            ExpertAttribute.query(function (res) {
                vm.presentAttributes = res;
                vm.expertAttributes.forEach(function (attribute1, index1) {
                    vm.presentAttributes.forEach(function (attribute2, index2) {
                        if(attribute1.expertattribute.id === attribute2.id){
                            vm.presentAttributes.splice(index2, 1);
                        }
                    })
                })
            })
        }
        function calculateUserAttributes() {
            ExpertAttribute.query(function (res) {
                vm.presentAttributes = res;
                vm.userAttributes.forEach(function (attribute1, index1) {
                    vm.presentAttributes.forEach(function (attribute2, index2) {
                        if(attribute1 === attribute2.name){
                            vm.presentAttributes.splice(index2, 1);
                        }
                    })
                })
            })
        }

        function saveAttributes() {
            if(vm.atbInputString){
                var inputArray = vm.atbInputString.split(',');
                vm.atbInputString = '';
                inputArray.forEach(function (atb) {
                    ExpertAttribute.save({name: atb, description: ''}, attributeSaved)
                })
            } else if (vm.addAttribute) {
                ExpertAttributeToExpert.save({expertattribute: JSON.parse(vm.addAttribute)}, addToArray);
            }
        }
        function saveUserAttributes() {
            if(vm.addAttribute){
                vm.userAttributes.push(vm.addAttribute)
                vm.presentAttributes.forEach(function (attribute, index) {
                    if(attribute.name === vm.addAttribute){
                        vm.presentAttributes.splice(index, 1)
                    }
                })
                vm.currentUserAccount.companyname = vm.userAttributes.join(',');
                vm.addAttribute = "";
                vm.updatingUser = true;
            }
        }
        function attributeSaved(res) {
            ExpertAttributeToExpert.save({expertattribute: res}, addToArray);
        }
        function addToArray(res) {
            vm.expertAttributes.push(res)
            vm.presentAttributes.forEach(function (attribute, index) {
                if(attribute.name === res.expertattribute.name){
                    vm.presentAttributes.splice(index, 1)
                }
            })
        }
        function deleteAttribute(index) {
            vm.presentAttributes.push(vm.expertAttributes[index].expertattribute)
            ExpertAttributeToExpert.delete({id: vm.expertAttributes[index].id}, vm.expertAttributes.splice(index, 1));
        }
        function deleteUserAttribute(index) {
            vm.presentAttributes.push({name:vm.userAttributes[index]})
            vm.userAttributes.splice(index, 1)
            vm.currentUserAccount.companyname = vm.userAttributes.join(',');
            vm.updatingUser = true;
        }
        /**
        * Initialize the controller's data.
        */
        function init() {
            // Update the vm with authorized and invited users.
            getAuthorizedUsers();

            // Query the expert account and pull data where needed for the vm
            ExpertAccount.query(function (data) {
                if (data[0]) {
                    vm.currentExpert = data[0];

                    var othercommunication = vm.currentExpert.othercommunication.split(',');
                    vm.otherLink = othercommunication[0];
                    vm.otherTitle = othercommunication[1];
                    if(vm.otherTitle){
                        vm.shownTitle = vm.otherTitle.substring(0, 19) + "...";
                    } else {
                        vm.shownTitle = "";
                    }
                    if(vm.otherLink){
                        vm.shownLink = vm.otherLink.substring(0, 19) + "...";
                    } else {
                        vm.shownLink = "";
                    }
                    if (vm.currentExpert.numberOfCases > 0) {
                        vm.displayedExpertScore = Math.round(vm.currentExpert.expertScore / vm.currentExpert.numberOfCases);
                    } else {
                        vm.displayedExpertScore = 0;
                    }
                    JobroleExpertScore.query(function (res) {
                        vm.currentExpert.jobroles = res;
                        jobroleCalculation();
                    });
                    ProductExpertScore.query(function (res) {
                        vm.currentExpert.products = res;
                        productCalculation();
                    });
                    SpecialityExpertScore.query(function (res) {
                        vm.currentExpert.specialties = res;
                        specialtiesCalculation();
                    });
                    SkillExpertScore.query(function (res) {
                        vm.currentExpert.skills = res;
                        skillsCalculation();
                    });
                    TechnologyExpertScore.query(function (res) {
                        vm.currentExpert.technology = res;
                        technologyCalculation();
                    });
                    ExpertPoolToExpert.query(function (res) {
                        vm.currentExpert.groups = [];
                        res.forEach(function (connection) {
                            if(connection.expertaccount.id === vm.currentExpert.id){
                                vm.currentExpert.groups.push(connection);
                            }
                        })
                    })
                } else {
                    Useraccount.query(function (res) {
                        vm.currentUserAccount = res[0];
                        if(vm.currentUserAccount.companyname.length){
                            vm.userAttributes = vm.currentUserAccount.companyname.split(',');
                            calculateUserAttributes();
                        } else {
                            vm.userAttributes = [];
                        }
                    })
                }
            });

            // Query Payment (credit card info) and pull data where needed for the vm
            Payment.query(function (result) {
                _.find(result, function (ccdata) {
                    if (ccdata.user.login === vm.settingsAccount.login) {
                        var data = ccdata.ccdata.split('##');
                        vm.creditCard = {
                            name: data[0],
                            number: {
                                one: parseInt(data[1].match(/.{1,4}/g)[0]),
                                two: parseInt(data[1].match(/.{1,4}/g)[1]),
                                three: parseInt(data[1].match(/.{1,4}/g)[2]),
                                four: parseInt(data[1].match(/.{1,4}/g)[3])
                            },
                            month: data[2],
                            year: data[3],
                            cvv: parseInt(data[4]),
                            id: ccdata.id,
                            user: ccdata.user
                        }
                    }
                })
            });

            // Grab the current user and preserve a copy in the vm's settingsAccount property
            Principal.identity().then(function (account) {
                vm.settingsAccount = copyAccount(account);
            });
        }

        function jobroleCalculation() {
            vm.currentExpert.jobrolesScore = 0;
            vm.currentExpert.jobroles.forEach(function (role) {
                vm.currentExpert.jobrolesScore =  vm.currentExpert.jobrolesScore + role.score;
                vm.jobrolesComplete = vm.currentExpert.jobrolesScore > vm.currentExpert.jobroles.length;
            })
        }
        function productCalculation() {
            vm.currentExpert.productsScore = 0;
            vm.currentExpert.products.forEach(function (role) {
                vm.currentExpert.productsScore =  vm.currentExpert.productsScore + role.score;
                vm.productsComplete = vm.currentExpert.productsScore > vm.currentExpert.products.length;
            })
        }
        function specialtiesCalculation() {
            vm.currentExpert.specialtiesScore = 0;
            vm.currentExpert.specialties.forEach(function (role) {
                vm.currentExpert.specialtiesScore =  vm.currentExpert.specialtiesScore + role.score;
                vm.specialtiesComplete = vm.currentExpert.specialtiesScore > vm.currentExpert.specialties.length;
            })
        }
        function skillsCalculation() {
            vm.currentExpert.skillsScore = 0;
            vm.currentExpert.skills.forEach(function (role) {
                vm.currentExpert.skillsScore =  vm.currentExpert.skillsScore + role.score;
                vm.skillsComplete = vm.currentExpert.skillsScore > vm.currentExpert.skills.length;
            })
        }
        function technologyCalculation() {
            vm.currentExpert.technologyScore = 0;
            vm.currentExpert.technology.forEach(function (role) {
                vm.currentExpert.technologyScore =  vm.currentExpert.technologyScore + role.score;
                vm.technologyComplete = vm.currentExpert.technologyScore > vm.currentExpert.technology.length;
            })
        }

        /**
        * Shifts focus to the next CC field as data is entered.
        * @param event
        */
        function numberTab(event) {
            if (event.target.value.length === event.target.maxLength) {
                var currentNumber = event.target.id.match(/\d+/);
                if (currentNumber && currentNumber[0] < 4) {
                    var newNumber = parseInt(currentNumber[0]) + 1;
                    focus('ccNumber' + newNumber);
                }
                event.preventDefault();
            }
        }

        /**
        * Store the "settings account" in a separate variable, and not in the shared "account" variable.
        */
        var copyAccount = function (account) {
            return {
                activated: account.activated,
                email: account.email,
                firstName: account.firstName,
                langKey: account.langKey,
                lastName: account.lastName,
                login: account.login
            };
        };

        /**
        * Handles the form submit/save for the main settings form.
        */
        function save() {
            if (vm.updatingUser && vm.updatingExpert) {
                toastr["success"]("User and Expert Info Saved");
                updateExpert();
                updateUser();
            } else if (vm.updatingUser) {
                updateUser();
            } else if (vm.updatingExpert) {
                updateExpert();
            }
        }

        /**
        * Updates the user and displays success and error messages accordingly.
        */
        function updateUser() {
            Auth.updateAccount(vm.settingsAccount).then(function () {
                vm.error = null;
                vm.success = 'OK';

                // Present a toastr message
                if (!vm.updatingExpert) {
                    toastr["success"]("User Info Saved")
                }

                // Update the vm's settingsAccount and broadcast a 'userAccountUpdated' from the $rootscope
                Principal.identity(true).then(function (account) {
                    vm.settingsAccount = copyAccount(account);
                    $rootScope.$broadcast('userAccountUpdated');
                });

                // Switch the language if necessary
                JhiLanguageService.getCurrent().then(function (current) {
                    if (vm.settingsAccount.langKey !== current) {
                        $translate.use(vm.settingsAccount.langKey);
                    }
                });
                // var newUserAccount = {
                //     user: vm.settingsAccount,
                //     companyname: vm.userAttributesString
                // }
                Useraccount.update(vm.currentUserAccount)

                // Redirect to the case page
                if (vm.isAlreadyAuthorized) {
                    $state.go('case');
                }
            }).catch(function () {
                vm.success = null;
                vm.error = 'ERROR';
                toastr["error"]("Saving Error")
            });
        }

        /**
        * Updates the expert and displays a success messages.
        */
        function updateExpert() {
            vm.currentExpert.othercommunication = vm.otherLink + ',' + vm.otherTitle;

            ExpertAccount.update(vm.currentExpert, function () {
                if (!vm.updatingUser) {
                    toastr["success"]("Expert Info Saved")
                }
            });
        }

        /**
        * Updates or saves the credit card data.
        */
        function addCard() {
            // Get the cc number
            vm.number = Object.keys(vm.creditCard.number).map(function (k) {
                return vm.creditCard.number[k]
            });

            // Display an error if their's an issue with the cc num or cvv
            if (vm.number.join('').length != 16 || vm.creditCard.cvv.toString().length != 3) {
                toastr["error"]("Saving Error");
                return;
            }

            // Create a temp cc object
            vm.tempCard = {
                name: vm.creditCard.name,
                number: vm.number.join(''),
                month: vm.creditCard.month,
                year: vm.creditCard.year,
                cvv: vm.creditCard.cvv,
                id: vm.creditCard.id,
                user: vm.creditCard.user
            };


            var arr = Object.keys(vm.tempCard).map(function (k) {
                return vm.tempCard[k]
            });

            var data = arr.slice(0, 5).join("##");

            // Create a temp payment object
            var payment = {
                id: vm.tempCard.id,
                ccdata: data,
                user: vm.tempCard.user
            };

            // Update or save the credit card data
            if (payment.id !== null) {
                Payment.update(payment, onSaveSuccess, onSaveError);
            } else {
                payment.user = vm.tempCard.user;
                Payment.save(payment, onSaveSuccess, onSaveError);
            }
        }
        function checkInvalid() {
            vm.invitedUser = vm.invitedUser.replace(/;|"|!|\+|#|\$|%|\^|&|\*|\)|\(|:|\?|\/|<|>|{|}|\[|\]|-|_|=|\~|\`|\||\\|\/|\s/g, "");
        }
        /**
        * On Payment success, update the vm with the latest payment data and display a toastr message.
        * @param payment
        */
        function onSaveSuccess(payment) {
            vm.tempCard.id = payment.id;
            vm.tempCard.user = payment.user;
            vm.error = null;
            toastr["success"]("Saving Successful")
        }

        /**
        * On Payment error, display a toastr message.
        * @param error
        */
        function onSaveError(error) {
            vm.success = null;
            toastr["error"](data.authorizeduser.email, "Saving Error")
        }

        /**
        * On user save error, display a toastr message.
        * @param error
        */
        function onUserSaveError(error) {
            toastr["error"]("Incorrect " + error.data.fieldErrors[0].field + " input")
        }

        /**
        * Saves a new user, usually during an add authorized user invite.
        * @param email
        */
        function makeUser(email) {
            // Set the invite string based on name or email
            if (vm.settingsAccount.firstName && vm.settingsAccount.lastName) {
                var inviteString = "Invite:" + vm.settingsAccount.firstName + " " + vm.settingsAccount.lastName;
            } else {
                var inviteString = "Invite:" + vm.settingsAccount.email;
            }

            var charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            var randomNewPassword = '';

            for (var i = 0; i < 5; i++) {
                var randomIndex = Math.floor(Math.random() * charSet.length);
                randomNewPassword += charSet.substring(randomIndex, randomIndex + 1);
            }

            randomNewPassword = randomNewPassword + Math.floor(Math.random() * 9);
            inviteString = inviteString + ':' + randomNewPassword;

            var newUser = {
                email: email,
                langKey: $translate.use(),
                login: email,
                password: randomNewPassword,
                lastName: inviteString.substring(0, 50)
            };

            Register.save(newUser, invitedGroup, onUserSaveError)
        }

        /**
        * Creates a new authorized group.
        * @param user
        */
        function authorizedGroup(user) {
            var group = {
                authorizeduser: user
            };

            if (user.activated) {
                Groupaccess.save(group, function (data) {
                    vm.authorizedUsers.push(data);
                    vm.invitedUser = '';
                    toastr["success"](data.authorizeduser.email, "Added Activated User")
                })
            } else {
                Groupaccess.save(group, function (data) {
                    vm.invitedUsers.push(data);
                    vm.invitedUser = '';
                })
            }
        }

        /**
        * Creates a new invited group.
        * @param newUser
        */
        function invitedGroup(newUser) {
            ManageUser.get({type: 'email', value: newUser.email}, function (user) {
                var group = {
                    authorizeduser: user
                };

                Groupaccess.save(group, function (data) {
                    vm.invitedUsers.push(data);
                    vm.invitedUser = '';
                    toastr["success"](data.authorizeduser.email, "Invited User")
                })
            })
        }
        /**
        * Checks to see if email address is valid
        * @param email
        */
        function validateEmail(email) {
            var re = /@/;
            // var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
        /**
        * Adds an authorized user.
        */
        function addAuthorizedUser() {
            var currentEmails = vm.invitedUser.split(',');
            currentEmails.forEach(function (currentEmail) {

                if(validateEmail(currentEmail) === false){
                    toastr["error"]("Invalid Email Input");
                    return
                }

                // Prevent user's from inviting themselves and display a toastr message.
                if (currentEmail === vm.settingsAccount.email) {
                    toastr["error"]("Users cannot invite themselves");
                    return
                }

                var isAlreadyInvited = _.find(vm.invitedUsers, function (invited) {
                    if (invited.authorizeduser.email == currentEmail) {
                        return true;
                    }
                });

                var isAlreadyAuthorized = _.find(vm.authorizedUsers, function (authorized) {
                    if (authorized.authorizeduser.email == currentEmail) {
                        return true;
                    }
                });

                if (!isAlreadyInvited && !isAlreadyAuthorized) {
                    ManageUser.get({type: 'email', value: currentEmail}, function (result) {
                        if (result.id) {
                            authorizedGroup(result);
                        } else {
                            makeUser(currentEmail)
                        }
                    })
                } else {
                    toastr["error"]("User is already invited")
                }
            })
        }

        /**
        * Sets both authorizedUsers and invitedUsers on the vm and well as
        * updates the isAlreadyAuthorized boolean if the user matches the account user.
        */
        function getAuthorizedUsers() {
            vm.authorizedUsers = [];
            Groupaccess.query(function (result) {
                _.find(result, function (user) {
                    if (user.authorizeduser.email === vm.settingsAccount.email) {
                        vm.isAlreadyAuthorized = true;
                    } else if (user.user.login === vm.settingsAccount.login && user.authorizeduser.activated) {
                        vm.authorizedUsers.push(user);
                    } else if (user.user.login === vm.settingsAccount.login && !user.authorizeduser.activated) {
                        vm.invitedUsers.push(user);
                    }
                })
            })
        }

        /**
        * Removes an invited user.
        * @param id
        * @param index
        */
        function removeInvitedUsers(id, index) {
            Groupaccess.delete({id: id});
            toastr["warning"]("User Removed");
            vm.invitedUsers.splice(index, 1)
        }

        /**
        * Removes an authorized user.
        * @param id
        * @param index
        */
        function removeAuthorizedUsers(id, index) {
            Groupaccess.delete({id: id});
            toastr["warning"]("User Removed");
            vm.authorizedUsers.splice(index, 1)
        }
        function hideTitleElipsis() {
            vm.shownTitle = vm.otherTitle
        }
        function showTitleElipsis() {
            vm.otherTitle = vm.shownTitle
            vm.shownTitle = vm.otherTitle.substring(0, 19) + "...";
        }
        function hideLinkElipsis() {
            vm.shownLink = vm.otherLink
        }
        function showLinkElipsis() {
            vm.otherLink = vm.shownLink
            vm.shownLink = vm.otherLink.substring(0, 19) + "...";
        }
        // Call to initialize the controller.
        vm.init();
    }
})();
