'use strict';

/**
 * @ngdoc function
 * @name womai517App.controller:ApplicationCtrl
 * @description
 * # ApplicationCtrl
 * Controller of the womai517App
 */
angular.module('womai517App')
  .controller('ApplicationCtrl', function ($log, $window, $scope, $http, $location, $route, wxshare) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.settings = {};
    $scope.settings.activityUnlock = true;
    $scope.settings.homeBtnText = $scope.settings.activityUnlock ? '注册解锁红包' : '5月3日开启';
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

    $log.debug($location.search().p);

    //TODO：调试用秘密参数
    $log.debug($location.search().secretcode);
    wxshare.saveSecretCode($location.search().secretcode);

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
    $log.debug($scope.user);

    $scope.settings.bodyClass = '';

    $scope.share = function () {
      $bridge(function (bridge) {
        var params = '?old=' + encodeURIComponent($scope.user.current) + 'p=' + $scope.user.promotionId;
        var shareData = {
          data: {
            title         : "红包护照吃天下",
            commonImageUrl: "http://womai2016.cdn.paymew.com/Icon/icon_womai_517Passport.png",
            webUrl        : "http://m.womai.com/517Coupon/web" + params,
            commonText    : "517元免费吃？黄渤在吃货届又搞了个大新闻！",
            weiboContent  : "517元免费吃？黄渤在吃货届又搞了个大新闻！",
            copyContent   : "517元免费吃？黄渤在吃货届又搞了个大新闻！"
          }
        };
        bridge.callHandler('shareToApp', shareData, function (json) {
          $window.alert(json);
        });
      });
      $scope.settings.isShare = true;
    };

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
  });
