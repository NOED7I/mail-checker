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
        $rootScope.onServer = "";
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

cs.controller('addC', ['$rootScope', '$scope', '$timeout', 'dbS',
    function($rootScope, $scope, $timeout, dbS) {
        $rootScope.title = "Add - Mail Checker";
        $rootScope.onManage = "";
        $rootScope.onAdd = "active";
        $rootScope.onExample = "";
        $rootScope.onServer = "";
        $rootScope.onError = "";
        $rootScope.accounts = dbS.read();

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
        $rootScope.onServer = "";
        $rootScope.onError = "";
    }
]);

cs.controller('serverC', ['$rootScope', '$scope', '$timeout', 'dbS', 'callS',
    function($rootScope, $scope, $timeout, dbS, callS) {
        $rootScope.title = "Server - Mail Checker";
        $rootScope.onManage = "";
        $rootScope.onAdd = "";
        $rootScope.onServer = "active";
        $rootScope.onExample = "";
        $rootScope.onError = "";

        var o = dbS.readServer();
        $scope.server0 = o.server0.server;
        $scope.server1 = o.server1.server;
        if(o.server0.used){
            $scope.server0used = true;
        }
        if(o.server1.used){
            $scope.server1used = true;
        }

        $scope.writeServer1 = function(){
            var o = dbS.readServer();
            o.server1.server = $scope.server1;
            dbS.writeServer(o);
        }

        $scope.selectServer = function(s){
            var o = dbS.readServer();
            if(s === 'server0'){
                o.server0.used = true;
            }else{
                o.server0.used = false;
            }
            if(s === 'server1'){
                o.server1.used = true;
            }else{
                o.server1.used = false;
            }
            dbS.writeServer(o);
            callS.changeServer();
        }
    }
]);

cs.controller('errorC', ['$rootScope', '$scope', 'dbS',
    function($rootScope, $scope, dbS) {
        $rootScope.title = "Error Message - Mail Checker";
        $rootScope.onManage = "";
        $rootScope.onAdd = "";
        $rootScope.onExample = "";
        $rootScope.onServer = "";
        $rootScope.onError = "active";
        $scope.message = dbS.readMessage().reverse();
        $scope.ok = false;
        if($scope.message.length === 0){
            $scope.ok = true;
        }
    }
]);

