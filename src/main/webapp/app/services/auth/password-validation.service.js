(function () {
    'use strict';

    angular
    .module('dorsalApp')
    .factory('PasswordValidationService', PasswordValidationService);

    PasswordValidationService.$inject = ['$resource'];

    function PasswordValidationService() {
        var service = {};
        service.passwordValidity = [];
        service.checkPassword = function(form) {
            var password = form.password.$$lastCommittedViewValue;
            if(form.login){
                var login = form.login.$$lastCommittedViewValue;
            }

            service.passwordValidity = [];

            if((/([a-z])\1/i).test(password)){
                form.password.$setValidity("noRepeatingCharacters", false);
            } else {
                form.password.$setValidity("noRepeatingCharacters", true);
            }
            if(password === login){
                form.password.$setValidity("notEqualToUsername", false);
            } else {
                form.password.$setValidity("notEqualToUsername", true);
            }
            if(!fullPasswordValidity(form, service.passwordValidity)){

            if((/[a-z]/g).test(password)){
                service.passwordValidity.push("Lowercase");
                form.password.$setValidity("noLowercase", true);
            } else {
                if(!fullPasswordValidity(form, service.passwordValidity)){
                    form.password.$setValidity("noLowercase", false);
                }
            }
            if((/[A-Z]/g).test(password)){
                service.passwordValidity.push("Uppercase");
                form.password.$setValidity("noUppercase", true);
            } else {
                if(!fullPasswordValidity(form, service.passwordValidity)){
                    form.password.$setValidity("noUppercase", false);
                }
            }

            if((/[0-9]/g).test(password)){
                service.passwordValidity.push("Number");
                form.password.$setValidity("noNumber", true);
            } else {
                if(!fullPasswordValidity(form, service.passwordValidity)){
                    form.password.$setValidity("noNumber", false);
                }
            }
            if((/!|\+|#|\$|%|\^|&|\*|:|\?|-|_|=|\~|\@/g).test(password)){
                service.passwordValidity.push("Special");
                form.password.$setValidity("noSpecial", true);
            } else {
                if(!fullPasswordValidity(form, service.passwordValidity)){
                    form.password.$setValidity("noSpecial", false);
                }
            }
            fullPasswordValidity(form, service.passwordValidity);
        }

        }
        service.checkConfirmPassword = function (form) {
            var password = form.password.$$lastCommittedViewValue;
            var confirmPassword = form.confirmPassword.$$lastCommittedViewValue;

            if(confirmPassword === password){
                form.confirmPassword.$setValidity("samePassword", true);
            } else {
                form.confirmPassword.$setValidity("samePassword", false);
            }
        }
        function fullPasswordValidity(form, passwordValidity) {
            if(service.passwordValidity.length >= 3){
                form.password.$setValidity("noLowercase", true);
                form.password.$setValidity("noUppercase", true);
                form.password.$setValidity("noNumber", true);
                form.password.$setValidity("noSpecial", true);
                return true;
            }
        }
        return service;
    }
})();
