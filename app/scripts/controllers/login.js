'use strict';

/**
 * @ngdoc function
 * @name womai517App.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the womai517App
 */
angular.module('womai517App')
  .controller('LoginCtrl', function ($scope, $log, $window, $http, $q, $location, $interval) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.settings.bodyClass = '';
    $scope.settings.regCodeBtnText = '获取验证码';
    $scope.settings.disableRegCodeBtn = false;

    $scope.getRegCode = function () {
      $log.debug('invoke getRegCode interface');
      var reg = /^1[3|4|5|8][0-9]\d{4,8}$/;
      if (!reg.test($scope.inputRegPhone)) {
        $window.alert('请输入正确的手机号码');
        return;
      }
      $http.post('http://517passport.womai.test.paymew.com/sendCode', {phone: $scope.inputRegPhone})
        .then(function (response) {
          if (typeof response.data == 'object') {
            var data = response.data;
            $log.debug('sendCode: ', data);
            if (!data.errCode) {
              $window.alert('已发送验证码');
              $scope.settings.disableRegCodeBtn = true;
              $scope.countdown();
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

    $scope.countdown = function () {
      var i = 30, text;
      $interval(function () {
        i--;
        if (i !== 0) {
          text = i + '秒后重试';
        } else {
          text = '获取验证码';
          $scope.settings.disableRegCodeBtn = false;
        }
        $scope.settings.regCodeBtnText = text;
      }, 1000, i);
    };

    $scope.submitReg = function () {
      $log.debug('invoke submitReg interface');
      var params = {
        phone: $scope.inputRegPhone,
        code: $scope.inputRegCode,
        old: $scope.user.old,
        promotionId: $scope.user.promotionId
      };
      $http.post('http://517passport.womai.test.paymew.com/fastReg', params)
        .then(function (response) {
          if (typeof response.data == 'object') {
            var data = response.data;
            $log.debug('fastReg: ', data);
            if (!data.errCode) {
              var user = data.data;
              $scope.user.username = $scope.inputRegPhone;
              $scope.user.current = user.old;
              $scope.user.token = user.token;
              $scope.user.sso = user.sso;
              $location.path('/passport');
            }
          } else {

          }
        }, function (response) {

        });
    };
  });
