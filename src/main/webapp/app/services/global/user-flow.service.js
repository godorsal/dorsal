(function () {
    'use strict';

    angular
    .module('dorsalApp')
    .factory('DrslUserFlowService', DrslUserFlowService);

    DrslUserFlowService.$inject = ['$state', '$rootScope', '$timeout', '$translate', 'Principal', 'ExpertAccount', 'Supportcase', 'toastr', 'Payment', '_', 'Groupaccess'];

    function DrslUserFlowService($state, $rootScope, $timeout, $translate, Principal, ExpertAccount, Supportcase, toastr, Payment, _, Groupaccess) {
        var service = {};
        var value = "; " + document.cookie;
        var parts = value.split("; " + "authenticationToken" + "=");
        if (parts.length == 2) {
            var cookieToken = '"' + parts.pop().split(";").shift() + '"';
            if(!localStorage.getItem('jhi-authenticationToken')){
                    localStorage.setItem('jhi-authenticationToken', cookieToken);
                    location.reload();
            }
        }
        // var cookies = document.cookie.split(";");
        // cookies.forEach(function (cookie) {
        //     console.log(cookie.split("=")[0], "authenticationToken");
        //     if(cookie.split("=")[0] == "authenticationToken"){
        //         console.log("SUTHH");
        //     }
        // })


        // console.log(output.authenticationToken);
        // var cookieToken = '"' + output.authenticationToken + '"';
        //
        // if(!localStorage.getItem('jhi-authenticationToken')){
        //     console.log("No Tken");
        //     if(cookieToken){
        //         console.log("Setting Cookie Token");
        //         localStorage.setItem('jhi-authenticationToken', cookieToken);
        //         location.reload();
        //     }
        // }


        // Used to determine if we can manage flows through the $stateChangeStart event
        service.stateChangeDetected = false;

        // User defaults, used to initialize the services user object, and clear it on 'clearUserData' call
        service.userDefaults = {
            isFirstView: true,
            isAuthenticated: false,
            hasFirstAndLastName: false,
            isExpert: false,
            hasCases: false,
            hasCC: false,
            account: null,
            expert: null
        };

        // The service's in-memory user object, gets cleared by 'clearUserData' call or on browser refresh
        service.user = angular.extend({}, service.userDefaults);

        /**
        * Listen for $stateChangeStart events and redirect the user if necessary.
        */
        $rootScope.$on('$stateChangeStart', function(event, toState) {
            service.stateChangeDetected = true;
            service.redirectUser({event: event, toState: toState});
        });

        /**
        * Listen for new cases, so we can update the hasCases boolean
        */
        $rootScope.$on('dorsalApp:supportcaseUpdate', function() {
            service.user.hasCases = true;
        });

        /**
        * Listen for user account updates, so we can update the account data
        */
        $rootScope.$on('userAccountUpdated', function() {
            Principal.identity().then(function (account) {
                // Update the in-memory account data
                service.user.account = account;
                service.user.hasFirstAndLastName = (service.user.account.firstName && service.user.account.lastName) ? true : false;
            });
        });

        /**
        * Handle User Flow and redirect if necessary.
        * This function is the first to called on all of our main pages and also after a user login.
        * @param {string} [type] type An optional string type (eg 'login')
        */
        service.handleUserFlow = function (type) {
            // If we already have a user in memory, don't bother to do the queries
            if (service.user.isAuthenticated && service.user.account && type !== 'login'){
                // Pass the flow to the handoff function
                console.log("USER FLOW HANDOFF TYPE", type);
                service.userFlowHandoff(type);
            } else {
                // Check the identity of the user
                Principal.identity().then(function (account) {
                    // Store the account info and isAuthenticated state
                    service.user.account = account;
                    service.user.isAuthenticated = Principal.isAuthenticated();

                    // Continue if we have an authenticated user with an account
                    if (service.user.isAuthenticated && service.user.account) {
                        // Set a convenience boolean, which will tell us if the user has a first/last name in the system
                        service.user.hasFirstAndLastName = (service.user.account.firstName && service.user.account.lastName) ? true : false;

                        // Query the expert account to see if the user is an expert
                        ExpertAccount.query({user: service.user.account},
                            function (data) {
                                if (data.length) {
                                    service.user.expert = data[0];
                                    service.user.isExpert = true;
                                } else {
                                    service.user.isExpert = false;
                                }

                                // Query the support cases to see if the user has associated cases
                                Supportcase.query({size: 1}, function (data) {
                                    service.user.hasCases = (data.length > 0)? true: false;
                                    // Pass the flow to the handoff function
                                    console.log("USER FLOW HANDOFF TYPE", type);
                                    service.userFlowHandoff(type);
                                });
                            }
                        );
                    }
                });
            }
        };

        /**
        * Passes the user flow to the correct redirect function.
        * @param {string} type An optional string type (eg 'login')
        */
        service.userFlowHandoff = function (type) {
            // When coming from login redirect the user differently
            if (type === 'login') {
                service.redirectUserAfterLogin();
            } else {
                // Only call the redirectUser if we're already doing so with the $stateChangeStart
                // event listener
                if (!service.stateChangeDetected) {
                    service.redirectUser();
                }
            }
        };

        /**
        * Redirects the user after login, if necessary.
        */
        service.redirectUserAfterLogin = function () {
            var toState = null;
            console.log("REDIRECT AFTER LOGIN");
            // Reset isFirstView after login
            service.user.isFirstView = true;

            // Expert redirect logic
            if (service.user.isExpert) {
                if (!service.user.hasFirstAndLastName) {
                    toState = 'settings';
                } else {
                    toState = 'case';
                }
                // User redirect logic
            } else {
                // Only redirect the user if they're not already on the concierge page
                if ($state.current.name !== 'concierge') {
                    if (service.user.hasFirstAndLastName) {
                        if (service.user.hasCases) {
                            toState = 'case';
                        } else {
                            toState = 'concierge';
                        }
                    } else {
                        toState = 'settings';
                    }
                }
            }

            service.goToState(toState);
        };

        /**
        * Redirects the user after page/state load or during the $stateChangeStart event.
        * @param {Object} data An optional object containing useful $stateChangeStart event data
        */
        service.redirectUser = function (data) {
            var toState = null,
            stateName = (data && data.toState) ? data.toState.name : $state.current.name;

            // Handle redirects based on the current stateName or toState if coming from the $stateChangeStart event
            switch (stateName) {
                case 'home':
                break;
                case 'concierge':
                // Send experts to the case page (they should never land on the concierge page)
                if (service.user.isExpert) {
                    // toState = 'case';
                }
                break;
                case 'case':
                // Send non-experts with no cases back to the concierge page
                if (!service.user.isExpert && !service.user.hasCases) {
                    toState = 'concierge';
                }
                break;
                case 'settings':
                break;
            }

            // Continue if we have a newly authenticated user without a first/last name
            if (service.user.isAuthenticated && !service.user.hasFirstAndLastName) {
                // If on or going to settings, show missing details message
                if (stateName === 'settings') {
                    toastr.success($translate.instant('global.messages.info.missingDetails'), {
                        timeOut: 5000,
                        toastClass: 'toast drsl-user-flow-toast'
                    });
                    // If elsewhere show the messing details message with a click here message to go to settings
                } else if (service.user.isFirstView) {
                    toastr.success($translate.instant('global.messages.info.missingDetailsWithLink'), {
                        timeOut: 0,
                        toastClass: 'toast drsl-user-flow-toast',
                        onTap: function () {
                            $state.go('settings');
                        }
                    });
                }

            }

            // Set isFirstView to false, so we know that the authenticated user has been through this before.
            service.user.isFirstView = false;

            // Continue if we're redirecting the user
            if (toState) {
                // Prevent default if we came from the $stateChangeStart event
                if (data && data.event) {
                    data.event.preventDefault();
                }

                // Redirect the user to the new state
                service.goToState(toState);
            }
        };

        service.checkPaymentInformation = function () {
            Payment.query(function (result) {
                if(result[0]){
                    service.user.hasCC = true;
                } else {
                    Groupaccess.query(function (result) {
                        if(result[0] && result[0].authorizeduser.email === service.user.account.email){
                            service.user.hasCC = true;
                            if(confirmation){
                                $rootScope.$emit('paymentAuthSuccess');
                                $state.go('case');
                            }
                        } else {
                            service.user.hasCC = false;
                        }
                    })
                }
            });
        }



        /**
        * Go to (redirect to) the state with the provided name.
        * @param {string} toState The name of state to go to.
        */
        service.goToState = function (toState) {
            // Only continue if we have a state to go to.
            if (toState) {
                // Wrapped in a timeout to avoid issues with state transitions
                $timeout(function () {
                    $state.go(toState);
                })
            }
        };

        /**
        * Clears the service's user data by resetting to defaults.
        */
        service.clearUserData = function () {
            service.user = angular.extend({}, service.userDefaults);
            document.cookie = "authenticationToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        };

        return service;
    }
})();
