'use strict';

/**
 * @ngdoc overview
 * @name angularJsExampleApp
 * @description
 * # angularJsExampleApp
 *
 * Main module of the application.
 */
angular
  .module('angularJsExampleApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'rx'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/angular', {
        templateUrl: 'views/angular.html',
        controller: 'AngularCtrl',
        controllerAs: 'ctrl'
      })
      .when('/time', {
        templateUrl: 'views/time_flies.html'
      })
      .when('/canvas', {
        templateUrl: 'views/canvas.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
