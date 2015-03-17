//
// services module
//
// Author cloud@txthinking.com
//

'use strict';

var ss = angular.module('ss', [
]);

ss.factory('dbS', ['callS',
    function(callS){
        var read = function(){
            if(!localStorage.data){
                return [];
            }
            return angular.fromJson(localStorage.data);
        }
        var write = function(obj){
            var j = angular.toJson(obj);
            localStorage.data = j;
            callS.call();
        }
        var readMessage = function(){
            if(!localStorage.message){
                return [];
            }
            return angular.fromJson(localStorage.message);
        }
        var readServer = function(){
            if(!localStorage.server){
                var s = {
                    server0: {
                        server: 'freedom.txthinking.com:9000',
                        used: true
                    },
                    server1: {
                        server: '',
                        used: false
                    }
                };
                return s;
            }
            return angular.fromJson(localStorage.server);
        }
        var writeServer = function(obj){
            var j = angular.toJson(obj);
            localStorage.server = j;
        }
        return {
            read : read,
            write : write,
            readMessage : readMessage,
            readServer : readServer,
            writeServer : writeServer
        };
    }
]);

ss.factory('callS', [
    function(){
        var call = function(){
            chrome.extension.getBackgroundPage().init();
            chrome.extension.getBackgroundPage().send();
        }
        var changeServer = function(){
            chrome.extension.getBackgroundPage().changeServer();
        }
        return {
            call : call,
            changeServer : changeServer
        };
    }
]);
