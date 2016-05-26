'use strict';

/**
 * @ngdoc function
 * @name womai517App.controller:ApplicationCtrl
 * @description
 * # ApplicationCtrl
 * Controller of the womai517App
 */
angular.module('womai517App')
  .controller('ApplicationCtrl', function ($log, $window, $scope, $http, $location, $route, $timeout, wxshare) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.settings = {};
    $scope.settings.activityUnlock = true;
    $scope.settings.homeBtnText = $scope.settings.activityUnlock ? '解锁福利' : '5月3日开启';
    $scope.settings.unlockActivity = function () {
      if (wxshare.isAccessable()) {
        $location.path('/login');
        return;
      }
      if ($scope.settings.activityUnlock) {
        $location.path('/login');
      } else {
        $log.debug('未到活动开启时间');
        //$window.alert('未到活动开启时间');
        $scope.settings.openAlertPanel('未到活动开启时间');
      }
    };

    $scope.settings.isInApp = $location.search().ua == 'womaiapp';

    $log.debug('param p: ', $location.search().p);
    $log.debug('param old: ', $location.search().old);

    //调试用秘密参数
    //$log.debug($location.search().secretcode);
    //wxshare.saveSecretCode($location.search().secretcode);

    $scope.user = {
      username   : '',
      regTime    : '',
      mobileV    : false,
      isNewV     : false,
      regState   : false,
      cosState   : false,
      shareState : false,
      token      : '',
      sso        : '',
      old        : $location.search().old || '',
      current    : '',
      promotionId: $location.search().p || 212928
    };
    $log.debug('user: ', $scope.user);

    $scope.settings.bodyClass = '';

    $scope.share = function () {
      var ua = $window.navigator.userAgent.toLowerCase();
      $log.debug(ua);
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        $scope.settings.isShare = true;
      }
    };
    $scope.getToken = function () {

    };
    $bridge(function (bridge) {
      $scope.share = function () {
        var ua = $window.navigator.userAgent.toLowerCase();
        $log.debug(ua);
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
          $scope.settings.isShare = true;
          return;
        }

        var params = '?old=' + encodeURIComponent($scope.user.current) + '&p=' + $scope.user.promotionId + '&rrp=323';
        var shareData = {
          data: {
            title         : "517元免费吃？黄渤在吃货界又搞了个大新闻！",
            commonImageUrl: "http://womai2016.cdn.paymew.com/Icon/icon_womai_517Passport.png",
            webUrl        : "http://20160501-promo-womai.vliang.com/dev/html/index.html" + params,
            commonText    : "这才是吃货界最新炫富方式！517元霸王餐，有种说不出的欣喜～",
            weiboContent  : "这才是吃货界最新炫富方式！517元霸王餐，有种说不出的欣喜～",
            copyContent   : "这才是吃货界最新炫富方式！517元霸王餐，有种说不出的欣喜～"
          }
        };
        bridge.callHandler('shareToApp', shareData, function (json) {
          //$window.alert(json);
          if ($scope.user.token == '') {
            return;
          }
          var params = {
            token: $scope.user.token
          };
          $http.post('http://m.womai.com/517Passport/shareCoupon', params);
        });

        $timeout(function () {
          if ($scope.user.token == '') {
            return;
          }
          var params = {
            token: $scope.user.token
          };
          $http.post('http://m.womai.com/517Passport/shareCoupon', params);
        }, 1000);
      };

      $scope.getToken = function () {
        var userData = {"data": {"userSession": "", "userId": "", "level": "", "test1": ""}};

        bridge.callHandler('userLoginInfoToApp', userData, function (json) {
          var userId = json.data.userId;
          var userSession = json.data.userSession;
          var params = {
            userId: userId,
            userSession: userSession,
            promotionId: $scope.user.promotionId
          };
          //$window.alert(JSON.stringify(params));
          $http.post('http://517passport.womai.test.paymew.com/appLogin', params)
            .then(function (response) {
              if (typeof response.data == 'object') {
                var data = response.data;
                if (!data.errCode) {
                  var user = data.data;
                  //$scope.user.username = $scope.inputRegPhone;
                  $scope.user.current = user.old;
                  $scope.user.token = user.token;
                  $scope.user.sso = user.sso;
                  $window.localStorage.passport517token = $scope.user.token;
                  $location.path('/passport');
                } else {
                  //$window.alert(JSON.stringify(data));
                }
              }
            }, function (response) {
              //$window.alert('网络异常' + JSON.stringify(response));
            });
        });
      };
    });

    $scope.download = function () {
      var QId;
      switch ($scope.user.promotionId) {
        case '212925':  //PC端
          QId = 3127;
          break;
        case '213124':  //APP端
          QId = 3128;
          break;
        case '212926':  //百度
          QId = 3129;
          break;
        case '212927':  //豆果美食
          QId = 3130;
          break;
        case '213125':  //新闻信息流
          QId = 3131;
          break;
        case '213126':  //公众号
          QId = 3132;
          break;
        case '213127':  //黄渤请你吃菜
          QId = 3133;
          break;
        case '212928':  //H5
          QId = 3134;
          break;
        default :
          QId = 212928;
      }
      $window.location.href = 'http://www.womai.com/sale/app/app.jsp?QId=' + QId;
    };

    var postUrl = 'http://m.womai.com/517Passport/getShare';
    var url = encodeURIComponent($window.location.href);
    var params = {url: url};
    $http.post(postUrl, params)
      .then(function (rs) {
        var res = rs.data;
        if (!res.errCode) {
          var _wxConfigArray = res.data;
          wx.config({
            debug    : false,
            appId    : _wxConfigArray.appId,
            timestamp: parseInt(_wxConfigArray.timestamp),
            nonceStr : _wxConfigArray.nonceStr,
            signature: _wxConfigArray.signature,
            jsApiList: [
              // 所有要调用的 API 都要加到这个列表中
              "onMenuShareTimeline",
              "onMenuShareAppMessage"
            ]
          });
          wxshare.invokeWXShare($scope.user);
        } else {
          $window.alert(res.errMsg);
        }
      });

    $scope.isInApp = function () {
      return $scope.settings.isInApp;
    };

    $scope.goToWomai = function () {
      if (!$scope.isInApp()) {
        $window.location.href = 'http://m.womai.com?ssotoken=' + $scope.user.sso + '&sourceId=' + $scope.user.promotionId;
      }
    };

    $bridge(function (bridge) {
      $scope.goToWomai = function () {
        var data = {};
        bridge.callHandler('goHomeToApp', data, function (json) {
          $window.alert(json);
        });
      };
    });
  });
