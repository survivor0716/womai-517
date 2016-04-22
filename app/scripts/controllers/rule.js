'use strict';

/**
 * @ngdoc function
 * @name womai517App.controller:RuleCtrl
 * @description
 * # RuleCtrl
 * Controller of the womai517App
 */
angular.module('womai517App')
  .controller('RuleCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.settings.addBindPhoneCss = false;
  });
