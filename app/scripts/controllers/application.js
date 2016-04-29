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
    $log.debug($location.search().p);
    $scope.user = {
      username   : '',
      regTime    : '',
      mobileV    : false,
      isNewV     : true,
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
        $("#btnShare").on('click', function () {
          var shareData = {
            data: {
              title         : "吃货召集令",
              commonImageUrl: "http://womai2016.cdn.cocos2d-js.cn/Icon/icon_womai_517Coupon.png",
              webUrl        : "http://m.womai.com/517Coupon/web",
              commonText    : "全球美食狂欢节，吃在我买网 ！百万优惠券免费领，是吃货你就来！",
              weiboContent  : "全球美食狂欢节，吃在我买网 ！百万优惠券免费领，是吃货你就来！",
              copyContent   : "全球美食狂欢节，吃在我买网 ！百万优惠券免费领，是吃货你就来！"
            }
          };
          bridge.callHandler('shareToApp', shareData, function (json) {
            $window.alert(json);
          });

        });
      });
    };

    $scope.download = function () {
      var QId;
      switch($scope.user.promotionId) {
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
          alert(res.errMsg);
        }
      });
  });
