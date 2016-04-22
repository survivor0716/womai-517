'use strict';

/**
 * @ngdoc function
 * @name womai517App.controller:PassportCtrl
 * @description
 * # PassportCtrl
 * Controller of the womai517App
 */
angular.module('womai517App')
  .controller('PassportCtrl', function ($scope, $log, $window) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.settings.addBindPhoneCss = false;

    $scope.user.phone = '18500000001';
    $scope.user.regDate = '2016/4/20';
    $scope.user.unbind = false;

    $scope.share = function () {
      $log.debug('Share button click');
      $window.alert('Share button click');
    };

    $scope.download = function () {
      $log.debug('Download button click');
      $window.alert('Download button click');
    };
  });
