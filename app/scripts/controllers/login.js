'use strict';

/**
 * @ngdoc function
 * @name womai517App.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the womai517App
 */
angular.module('womai517App')
  .controller('LoginCtrl', function ($scope, $log, $window, $http, $q, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.settings.bodyClass = '';
    $scope.settings.codeBtnText = '获取验证码';

    $scope.getRegCode = function () {
      $log.debug('invoke getRegCode interface');
      $window.alert('invoke getRegCode interface');
      //$http.post('', {phone: $scope.inputRegPhone})
      //  .then(function () {
      //
      //  }, function () {
      //
      //  });
    };

    $scope.submitReg = function () {
      $log.debug('invoke submitReg interface');
      $window.alert('invoke submitReg interface');
      $location.path('/passport');
    };
  });
