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
    'ngTouch'
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
      .otherwise({
        redirectTo: '/'
      });
  });