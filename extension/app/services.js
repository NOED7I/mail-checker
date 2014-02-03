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
        return {
            read : read,
            write : write
        };
    }
]);

ss.factory('callS', [
    function(){
        var call = function(){
            chrome.extension.getBackgroundPage().init();
            chrome.extension.getBackgroundPage().send();
        }
        return {
            call : call
        };
    }
]);
