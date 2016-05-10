'use strict';

/**
 * @ngdoc function
 * @name womai517App.controller:PassportCtrl
 * @description
 * # PassportCtrl
 * Controller of the womai517App
 */
angular.module('womai517App')
  .controller('PassportCtrl', function ($scope, $log, $window, $location, $http, wxshare) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.settings.bodyClass = '';
    $scope.settings.isShare = false;

    $scope.getPassport = function () {
      $log.debug('invoke getPassport interface');
      var params = {
        token: $window.localStorage.passport517token || ''
      };
      $log.debug('request params: ', params);
      $http.post('http://517passport.womai.test.paymew.com/getPassport', params)
        .then(function (response) {
          if (typeof response.data == 'object') {
            var data = response.data;
            $log.debug('getPassport: ', data);
            if (!data.errCode) {
              var user = data.data;
              $scope.user.username = user.phone;
              $scope.user.current = user.old;
              $scope.user.token = user.token;
              $scope.user.sso = user.sso;
              $scope.user.mobileV = user.mobileV;
              $scope.user.isNewV = user.isNewV;
              $scope.user.regTime = user.regTime;
              $scope.user.regState = user.regState;
              $scope.user.cosState = user.cosState;
              $scope.user.shareState = user.shareState;
              $window.localStorage.passport517token = $scope.user.token;
              $log.debug('User info: ', $scope.user);
              wxshare.invokeWXShare($scope.user);
            } else {
              //$window.alert(data.errMsg);
              $scope.settings.openAlertPanel(data.errMsg);
              $location.path('/');
            }
          } else {
            $window.alert('网络异常');
          }
        }, function (response) {
          $window.alert('网络异常');
        });
    };
    $scope.getPassport();

    $scope.goToBind = function () {
      $location.path('/bind-phone');
    };

    $scope.goToCoupon = function (id) {
      var params = '?sourceId=' + $scope.user.promotionId + '&ssotoken=' + $scope.user.sso;
      switch (id) {
        case 0: //美食券
          if ($scope.user.regState) {
            $window.location.href = 'http://m.womai.com/0c77266525167.shtml' + params;
          }
          break;
        case 1: //美食券
          if ($scope.user.regState) {
            $window.location.href = 'http://m.womai.com/100c7644296525145.shtml' + params;
          }
          break;
        case 2: //生鲜券
          if ($scope.user.regState) {
            $window.location.href = 'http://m.womai.com/100c7644296525145.shtml' + params;
          }
          break;
        case 3: //进口券
          if ($scope.user.cosState) {
            $window.location.href = 'http://m.womai.com/0c7662256525160.shtml' + params;
          }
          break;
        case 4: //红酒券
          if ($scope.user.cosState) {
            $window.location.href = 'http://m.womai.com/100c769236525163.shtml' + params;
          }
          break;
        case 5: //美食券
          if ($scope.user.shareState) {
            $window.location.href = 'http://m.womai.com/200c77266525721.shtml' + params;
          }
          break;
        case 6: //生鲜券
          if ($scope.user.shareState) {
            $window.location.href = 'http://m.womai.com/200c7644296525486.shtml' + params;
          }
          break;
        case 7: //黄金纯酿
          if ($scope.user.shareState) {
            $window.location.href = 'http://m.womai.com/0p10353885.shtml' + params;
          }
          break;
      }
    };

    $scope.openShare = function () {
      $scope.settings.isShare = true;
    };

    $scope.closeShare = function () {
      $scope.settings.isShare = false;
    };
  });
