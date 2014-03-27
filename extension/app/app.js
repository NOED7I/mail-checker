//
// app main module
//
// Author Cloud@txthinking.com
//

'use strict';

var app = angular.module('app', [
  'ngRoute',
  'cs',
  'ds'
]);

app.config(['$routeProvider','$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider.
        when('/manage', {
            templateUrl: 'templates/manage.html',
            controller: 'manageC'
        }).
        when('/add', {
            templateUrl: 'templates/add.html',
            controller: 'addC'
        }).
        when('/example', {
            templateUrl: 'templates/example.html',
            controller: 'exampleC'
        }).
        when('/server', {
            templateUrl: 'templates/server.html',
            controller: 'serverC'
        }).
        when('/error', {
            templateUrl: 'templates/error.html',
            controller: 'errorC'
        }).
        otherwise({
            redirectTo: '/manage'
        });
        $locationProvider.html5Mode(true).hashPrefix('!');
    }
]);
