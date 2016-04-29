'use strict';

/**
 * @ngdoc directive
 * @name womai517App.directive:alertWindow
 * @description
 * # alertWindow
 */
angular.module('womai517App')
  .directive('alertWindow', function () {
    return {
      template: '<div class="box">' +
      '<i class="icon"><img src="images/icon_close.png" alt="" ng-click="closeAlertPanel()"></i>' +
      '<ul class="input-group">' +
      '<li>' +
      '<img src="images/cayman.gif" alt="">' +
      '<div>' +
      '<p>{{alertMsg}}</p>' +
      '</div>' +
      '</li>' +
      '</ul>' +
      '</div>',
      restrict: 'EA',
      link    : function postLink(scope, element, attrs) {
        scope.settings.isShowAlertPanel = false;
        scope.settings.openAlertPanel = function (msg) {
          scope.settings.isShowAlertPanel = true;
          scope.alertMsg = msg;
        };
        scope.closeAlertPanel = function () {
          scope.settings.isShowAlertPanel = false;
        };
      }
    };
  });
