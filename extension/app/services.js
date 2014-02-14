//
// services module
//
// Author cloud@txthinking.com
//

'use strict';

var ss = angular.module('ss', [
]);

ss.factory('dbS', [
    function(){
        var read = function(){
            if(localStorage.data === undefined){
                return false;
            }
            return angular.fromJson(localStorage.data);
        }
        var write = function(obj){
            var j = angular.toJson(obj);
            localStorage.data = j;
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
            chrome.extension.getBackgroundPage().send();
        }
        return {
            read : read,
            write : write
        };
    }
]);
