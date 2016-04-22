'use strict';

/**
 * @ngdoc function
 * @name womai517App.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the womai517App
 */
angular.module('womai517App')
  .controller('LoginCtrl', function ($scope, $log, $window, $http, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.settings.addBindPhoneCss = false;

    $scope.getCode = function () {
      $log.debug('invoke getCode interface');
      $window.alert('invoke getCode interface');
    };

    $scope.register = function () {
      $log.debug('invoke register interface');
      $window.alert('invoke register interface');
      $location.path('/passport');
    };
  });
