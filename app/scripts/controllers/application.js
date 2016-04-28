'use strict';

/**
 * @ngdoc function
 * @name womai517App.controller:ApplicationCtrl
 * @description
 * # ApplicationCtrl
 * Controller of the womai517App
 */
angular.module('womai517App')
  .controller('ApplicationCtrl', function ($log, $window, $scope, $http, wxshare) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.settings = {};
    $scope.user = {};
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
      $window.location.href = '';
    };

    $scope._wxConfigArray = {};
    var postUrl = 'http://m.womai.com/517Coupon/getShare';
    var url = encodeURIComponent($window.location.href);
    var params = {url: url};
    $http.post(postUrl, params)
      .then(function (rs) {
        var res = rs.data;
        if (!res.errCode) {
          $scope._wxConfigArray = res.data;
          //wx.config({
          //  debug    : false,
          //  appId    : $scope._wxConfigArray.appId,
          //  timestamp: parseInt($scope._wxConfigArray.timestamp),
          //  nonceStr : $scope._wxConfigArray.nonceStr,
          //  signature: $scope._wxConfigArray.signature,
          //  jsApiList: [
          //    // 所有要调用的 API 都要加到这个列表中
          //    "onMenuShareTimeline",
          //    "onMenuShareAppMessage"
          //  ]
          //});
          wxshare.invokeWXShare($scope._wxConfigArray);
        } else {
          alert(res.errMsg);
        }
      });
  });
