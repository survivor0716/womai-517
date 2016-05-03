'use strict';

/**
 * @ngdoc service
 * @name womai517CouponApp.wxshare
 * @description
 * # wxshare
 * Factory in the womai517CouponApp.
 */
angular.module('womai517App')
  .factory('wxshare', function ($log, $window, $http, $q, $location) {
    // Service logic
    // ...
    var secretCode = null;

    // Public API here
    return {
      saveSecretCode: function (code) {
        secretCode = code;
      },
      isAccessable: function () {
        //return secretCode == 'dxy2014';
        return true;
      },
      getShareData: function () {
        $window.alert($location.url());
        return $http.post('http://m.womai.com/517Coupon/getShare', {url: $location.url()})
          .then(function (response) {
            if (typeof response.data === 'object') {
              var data = response.data;
              $log.debug('shareData: ', data);
              return data.errCode == 0 ? $q.resolve(data.data) : $q.reject(data.errMsg);
              //return data.data;
            } else {
              return $q.reject(JSON.stringify(response.data));
            }
          }, function (response) {
            return $q.reject(response.data.errMsg);
          });
      },
      invokeWXShare: function (data) {
        //微信分享
        //wx.config({
        //  appId    : _wxConfigArray.appId,
        //  timestamp: parseInt(_wxConfigArray.timestamp),
        //  nonceStr : _wxConfigArray.nonceStr,
        //  signature: _wxConfigArray.signature,
        //  jsApiList: [
        //    // 所有要调用的 API 都要加到这个列表中
        //    "onMenuShareTimeline",
        //    "onMenuShareAppMessage"
        //  ]
        //});

        wx.error(function (res) {
          for (var i in res) {
            alert(i + "||" + res[i]);
          }
        });

        var params = '?old=' + encodeURIComponent(data.current) + 'p=' + data.promotionId;

        var shareData = {
          title : '517元免费吃？黄渤在吃货界又搞了个大新闻！', // 分享标题
          desc  : '这才是吃货界最新炫富方式！517元霸王餐，有种说不出的欣喜～', // 分享描述
          link  : 'http://m.womai.com/517Passport/web/#/' + params, // 分享链接
          imgUrl: 'http://womai2016.cdn.paymew.com/Icon/icon_womai_517Passport.png'  // 分享图标
        };

        wx.ready(function () {
          // 在这里调用 API
          wx.onMenuShareTimeline({
            title  : shareData.desc, // 分享标题
            link   : shareData.link, // 分享链接
            imgUrl : shareData.imgUrl, // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
              // alert("share success");
            },
            cancel : function () {
              // 用户取消分享后执行的回调函数
              // alert("share canceled");
            }
          });

          wx.onMenuShareAppMessage({
            title  : shareData.title, // 分享标题
            link   : shareData.link, // 分享链接
            desc   : shareData.desc, // 分享描述
            imgUrl : shareData.imgUrl, // 分享图标
            type   : '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
              // 用户确认分享后执行的回调函数
              // alert("share success");
            },
            cancel : function () {
              // 用户取消分享后执行的回调函数
              // alert("shareF canceled");
            }
          });
        });
      }
    };
  });
