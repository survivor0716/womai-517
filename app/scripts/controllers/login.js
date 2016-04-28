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
      $http.post('http://517passport-01.womai.test.cocos2d-js.cn/sendCode', {phone: $scope.inputRegPhone})
        .then(function (response) {
          if(typeof response.data == 'object') {
            var data = response.data;
            if(!data.errCode) {
              $window.alert('已发送验证码');
            } else {
              $window.alert(data.errMsg);
            }
          } else {
            $window.alert('网络异常，请重新尝试');
          }
        }, function (response) {
          $window.alert('网络异常，请重试');
        });
    };

    $scope.submitReg = function () {
      $log.debug('invoke submitReg interface');
      $window.alert('invoke submitReg interface');
      $location.path('/passport');
    };
  });
