'use strict';

describe('Directive: alertWindow', function () {

  // load the directive's module
  beforeEach(module('womai517App'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<alert-window></alert-window>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the alertWindow directive');
  }));
});
