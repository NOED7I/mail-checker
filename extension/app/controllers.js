//
// controllers module
//
// Author Cloud@txthinking.comm
//

'use strict';

var cs = angular.module('cs', [
    'ss'
]);

cs.controller('manageC', ['$rootScope', '$scope', '$timeout', 'dbS',
    function($rootScope, $scope, $timeout, dbS) {
        $rootScope.title = "Manage - Mail Checker";
        $rootScope.onManage = "active";
        $rootScope.onAdd = "";
        $rootScope.onExample = "";
        $rootScope.onError = "";
        $rootScope.accounts = dbS.read();
        $scope.remove = function(email){
            for(var i=0; i<$rootScope.accounts.length; i++){
                if($rootScope.accounts[i].email === email){
                    $rootScope.accounts.splice(i,1);
                    break;
                }
            }
            dbS.write($rootScope.accounts);
        }
    }
]);

cs.controller('addC', ['$rootScope', '$scope', '$timeout',
    function($rootScope, $scope, $timeout) {
        $rootScope.title = "Add - Mail Checker";
        $rootScope.onManage = "";
        $rootScope.onAdd = "active";
        $rootScope.onExample = "";
        $rootScope.onError = "";

        $scope.email = "";
        $scope.password = "";
        $scope.imapServer = "";
        $scope.imapPort = "";

        $scope.button = "Add";
        $scope.add = function(){
            $scope.db = true;
            if($scope.email === ""
                || $scope.password === ""
                || $scope.imapServer === ""
                || $scope.imapPort === ""){
                $scope.button = "Something is empty.";
                $timeout(function(){
                    $scope.button = "Add";
                    $scope.db = false;
                }, 2000);
                return;
            }
            for(var i=0; i<$rootScope.accounts.length; i++){
                if($rootScope.accounts[i].email === $scope.email){
                    $rootScope.accounts.splice(i,1);
                    break;
                }
            }
            $rootScope.accounts.push({
                email: $scope.email,
                password: $scope.password,
                imapServer: $scope.imapServer,
                imapPort: $scope.imapPort
            });
            dbS.write($rootScope.accounts);
            $scope.button = "Added";
            $timeout(function(){
                $scope.email = "";
                $scope.password = "";
                $scope.imapServer = "";
                $scope.imapPort = "";
                $scope.button = "Add";
                $scope.db = false;
            }, 2000);
        }
    }
]);

cs.controller('exampleC', ['$rootScope', '$scope',
    function($rootScope, $scope) {
        $rootScope.title = "Example - Mail Checker";
        $rootScope.onManage = "";
        $rootScope.onAdd = "";
        $rootScope.onExample = "active";
        $rootScope.onError = "";
    }
]);

cs.controller('errorC', ['$rootScope', '$scope',
    function($rootScope, $scope) {
        $rootScope.title = "Error Message - Mail Checker";
        $rootScope.onManage = "";
        $rootScope.onAdd = "";
        $rootScope.onExample = "";
        $rootScope.onError = "active";
    }
]);

