'use strict';

/**
 * @ngdoc function
 * @name angularJsExampleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularJsExampleApp
 */
angular.module('angularJsExampleApp')
  .controller('AngularCtrl', ['$scope', '$http', 'rx', function($scope, $http, rx) {
    $scope.search = '';
    $scope.results = [];

    var search = function(term) {

      var deferred = $http({
        url: "http://en.wikipedia.org/w/api.php?&callback=JSON_CALLBACK",
        method: "jsonp",
        params: {
          action: "opensearch",
          search: term,
          format: "json"
        }
      });

      return rx.Observable
        .fromPromise(deferred)
        .retry(10) // Retry 10 times then give up
        .map(function(response){
          return response.data[1];
        });
    };

    $scope
      .$toObservable('search')
      .map(function(data){
        console.log('newValue: ' + data.newValue);
        return data.newValue;
      })
      .debounce(1000)
      .map(function(x) {
        console.log('debounce:' + x);
        return x;
      })
      .distinctUntilChanged()
      .map(function(x) {
        console.log('distinctUntilChanged:' + x);
        return x;
      })
      .select(search)
      .switchLatest()
      .subscribe(function(val){
        $scope.$apply(function() {
          $scope.results = val;
        });
        //$scope.results = val;
      });
  }]);
