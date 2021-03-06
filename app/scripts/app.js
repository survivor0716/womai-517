'use strict';

/**
 * @ngdoc overview
 * @name 我买517吃货节老拉新项目
 * @description
 * # womai517App
 *
 * Main module of the application.
 */
angular
  .module('womai517App', [
    'ngAnimate',
    'ngCookies',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ], convertTransformRequest)
  .config(function ($logProvider, $routeProvider) {
    $logProvider.debugEnabled(true);

    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/rule', {
        templateUrl: 'views/rule.html',
        controller: 'RuleCtrl',
        controllerAs: 'rule'
      })
      .when('/passport', {
        templateUrl: 'views/passport.html',
        controller: 'PassportCtrl',
        controllerAs: 'passport'
      })
      .when('/bind-phone', {
        templateUrl: 'views/bind-phone.html',
        controller: 'BindPhoneCtrl',
        controllerAs: 'bindPhone'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

function convertTransformRequest($httpProvider) {
  // Use x-www-form-urlencoded Content-Type
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

  /**
   * The workhorse; converts an object to x-www-form-urlencoded serialization.
   * @param {Object} obj
   * @return {String}
   */
  var param = function (obj) {
    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

    for (name in obj) {
      value = obj[name];

      if (value instanceof Array) {
        for (i = 0; i < value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if (value instanceof Object) {
        for (subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if (value !== undefined && value !== null) {
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
      }
    }

    return query.length ? query.substr(0, query.length - 1) : query;
  };

  // Override $http service's default transformRequest
  $httpProvider.defaults.transformRequest = [function (data) {
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];
}
