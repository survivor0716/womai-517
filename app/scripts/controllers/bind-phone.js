'use strict';

/**
 * @ngdoc function
 * @name womai517App.controller:BindPhoneCtrl
 * @description
 * # BindPhoneCtrl
 * Controller of the womai517App
 */
angular.module('womai517App')
  .controller('BindPhoneCtrl', function ($scope, $log, $window) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.settings.bodyClass = 'bind_phone';

    $scope.getBindCode = function () {

    };

    $scope.submitBind = function () {
      $log.debug('invoke submitBind interface');
      $window.alert('invoke submitBind interface');
    };
  });
