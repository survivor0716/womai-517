'use strict';

/**
 * @ngdoc function
 * @name womai517App.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the womai517App
 */
angular.module('womai517App')
  .controller('LoginCtrl', function ($scope, $log, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.getCode = function () {
      $log.debug('invoke getCode interface');

    };

    $scope.mlogin = function () {
      $log.debug('invoke login interface');
    };
  });
