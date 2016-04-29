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

    $scope.getPassport = function () {
      $log.debug('invoke getPassport interface');
      var params = {
        token: $scope.user.token
      };
      $log.debug(params);
      $http.post('http://517passport.womai.test.paymew.com/getPassport', params)
        .then(function (response) {
          if (typeof response.data == 'object') {
            var data = response.data;
            $log.debug('getPassport: ', data);
            if (!data.errCode) {
              var user = data.data;
              $scope.user.mobileV = user.mobileV;
              $scope.user.isNewV = user.isNewV;
              $scope.user.regTime = user.regTime;
              $scope.user.regState = user.regState;
              $scope.user.cosState = user.cosState;
              $scope.user.shareState = user.shareState;
              wxshare.invokeWXShare($scope.user);
            } else {
              $window.alert(data.errMsg);
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
      var params = '?sourceId=' + $scope.user.promotionId;
      switch (id) {
        case 1: //美食券
          if ($scope.user.regState) {
            $window.location.href = 'http://www.womai.com/index-31000-0.htm' + params;
          }
          break;
        case 2: //生鲜券
          if ($scope.user.regState) {
            $window.location.href = 'http://www.womai.com/Sort-31000-64306.htm' + params;
          }
          break;
        case 3: //进口券
          if ($scope.user.cosState) {
            $window.location.href = 'http://www.womai.com/Sort-31000-66102.htm' + params;
          }
          break;
        case 4: //红酒券
          if ($scope.user.cosState) {
            $window.location.href = 'http://jiu.womai.com/jiu/index-31000-0.htm' + params;
          }
          break;
        case 5: //美食券
          if ($scope.user.shareState) {
            $window.location.href = 'http://www.womai.com/index-31000-0.htm' + params;
          }
          break;
        case 6: //生鲜券
          if ($scope.user.shareState) {
            $window.location.href = 'http://www.womai.com/Sort-31000-64306.htm' + params;
          }
          break;
        case 7: //黄金纯酿
          if ($scope.user.shareState) {
            $window.location.href = 'http://www.womai.com/Product-0-10353885.htm' + params;
          }
          break;
      }
    };
    //$scope.share = function () {
    //  $log.debug('Share button click');
    //  $window.alert('Share button click');
    //};
    //
    //$scope.download = function () {
    //  $log.debug('Download button click');
    //  $window.alert('Download button click');
    //};
  });
