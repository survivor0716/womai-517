'use strict';

/**
 * @ngdoc function
 * @name womai517App.controller:UserLoginCtrl
 * @description
 * # UserLoginCtrl
 * Controller of the womai517App
 */
angular.module('womai517App')
  .controller('UserLoginCtrl', function ($scope, $log, $window, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.settings.bodyClass = 'bind_phone';

    $scope.getLoginCode = function () {
      $log.debug('invoke getLoginCode interface');
      $window.alert('invoke getLoginCode interface');
    };

    $scope.submitLogin = function () {
      $log.debug('invoke submitLogin interface');
      $window.alert('invoke submitLogin interface');
    };
  });
