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
    $scope.settings.addBindPhoneCss = true;

    $scope.submitBindPhone = function () {
      $log.debug('invoke submit interface');
      $window.alert('invoke submit interface');
    };
  });
