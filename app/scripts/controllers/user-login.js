'use strict';

/**
 * @ngdoc function
 * @name womai517App.controller:UserLoginCtrl
 * @description
 * # UserLoginCtrl
 * Controller of the womai517App
 */
angular.module('womai517App')
  .controller('UserLoginCtrl', function ($scope, $log, $window, $http, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.settings.bodyClass = 'bind_phone';

    $scope.submitLogin = function () {
      $log.debug('invoke submitLogin interface');
      var reg = /^1[3|4|5|8][0-9]\d{4,8}$/;
      if (!reg.test($scope.inputLoginPhone)) {
        $window.alert('请输入正确的手机号码');
        return;
      }
      var params = {
        phone: $scope.inputLoginPhone,
        password: $scope.inputLoginPassword,
        promotionId: $scope.settings.promotionId
      };
      $http.post('http://517passport-01.womai.test.paymew.com/login', params)
        .then(function (response) {
          if (typeof response.data == 'object') {
            var data = response.data;
            $log.debug('sendCode: ', data);
            if (!data.errCode) {
              $scope.user.mobileV = data.mobileV;
              $scope.user.isNewV = data.isNewV;
              $scope.user.regTime = data.regTime;
              $scope.user.regState = data.regState;
              $scope.user.cosState = data.cosState;
              $scope.user.shareState = data.shareState;
              $scope.user.token = data.token;
              $scope.user.sso = data.sso;
              $scope.user.old = data.old;
              $location.path('/passport');
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
  });
