'use strict';

/**
 * @ngdoc function
 * @name womai517App.controller:ApplicationCtrl
 * @description
 * # ApplicationCtrl
 * Controller of the womai517App
 */
angular.module('womai517App')
  .controller('ApplicationCtrl', function ($log, $window, $scope, $http, $location, wxshare) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.settings = {};
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
      promotionId: $location.search().promotionId || 212928
    };

    $scope.settings.bodyClass = '';
    $scope.settings.oldUser = $location.search().old || '';
    $scope.settings.promotionId = $location.search().promotionId || 212928;

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

    var postUrl = 'http://517passport-01.womai.test.paymew.com/getShare';
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
          wxshare.invokeWXShare(_wxConfigArray, $scope.user);
        } else {
          alert(res.errMsg);
        }
      });
  });
