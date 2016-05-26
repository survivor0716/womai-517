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
    //if($scope.isInApp()) {
      $scope.getToken();
    //}

    $scope.settings.bodyClass = 'bind_phone';

    $scope.submitLogin = function () {
      $log.debug('invoke submitLogin interface');
      var params = {
        username: $scope.inputLoginPhone,
        password: $scope.inputLoginPassword,
        promotionId: $scope.user.promotionId
      };
      $log.debug(params);
      $http.post('http://517passport.womai.test.paymew.com/login', params)
        .then(function (response) {
          if (typeof response.data == 'object') {
            var data = response.data;
            $log.debug('login: ', data);
            if (!data.errCode) {
              var user = data.data;
              $scope.user.username = $scope.inputLoginPhone;
              $scope.user.current = user.old;
              $scope.user.token = user.token;
              $scope.user.sso = user.sso;
              $window.localStorage.passport517token = $scope.user.token;
              $location.path('/passport');
            } else {
              //$window.alert(data.errMsg);
              $scope.settings.openAlertPanel(data.errMsg);
            }
          } else {
            $window.alert('网络异常，请重新尝试');
          }
        }, function (response) {
          $window.alert('网络异常，请重新尝试');
        });
    };
  });
