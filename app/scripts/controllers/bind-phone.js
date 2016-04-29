'use strict';

/**
 * @ngdoc function
 * @name womai517App.controller:BindPhoneCtrl
 * @description
 * # BindPhoneCtrl
 * Controller of the womai517App
 */
angular.module('womai517App')
  .controller('BindPhoneCtrl', function ($scope, $log, $window, $http, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.settings.bodyClass = 'bind_phone';
    $scope.disableBindCodeBtn = false;
    $scope.bindCodeBtnText = '获取验证码';

    $scope.getBindCode = function () {
      if($scope.disableBindCodeBtn) return;
      $log.debug('invoke getBindCode interface');
      var reg = /^1[3|4|5|8][0-9]\d{4,8}$/;
      if (!reg.test($scope.inputBindPhone)) {
        $window.alert('请输入正确的手机号码');
        return;
      }
      var params = {
        phone: $scope.inputBindPhone,
        token: $scope.user.token
      };
      $http.post('http://517passport.womai.test.paymew.com/bindCode', params)
        .then(function (response) {
          if (typeof response.data == 'object') {
            var data = response.data;
            $log.debug('sendCode: ', data);
            if (!data.errCode) {
              $window.alert('已发送验证码');
              $scope.settings.disableBindCodeBtn = true;
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
          $scope.settings.disableBindCodeBtn = false;
        }
        $scope.settings.bindCodeBtnText = text;
      }, 1000, i);
    };

    $scope.submitBind = function () {
      $log.debug('invoke submitBind interface');
      var params = {
        phone: $scope.inputRegPhone,
        code: $scope.inputRegCode,
        token: $scope.user.token
      };
      $http.post('http://517passport.womai.test.paymew.com/bindPhone', params)
        .then(function (response) {
          if (typeof response.data == 'object') {
            var data = response.data;
            $log.debug('fastReg: ', data);
            if (!data.errCode) {
              $window.alert(data.errMsg);
              $scope.user.username = $scope.inputRegPhone;
              $location.path('/passport');
            }
          } else {

          }
        }, function (response) {

        });
    };
  });
