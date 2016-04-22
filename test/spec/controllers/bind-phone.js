'use strict';

describe('Controller: BindPhoneCtrl', function () {

  // load the controller's module
  beforeEach(module('womai517App'));

  var BindPhoneCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BindPhoneCtrl = $controller('BindPhoneCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BindPhoneCtrl.awesomeThings.length).toBe(3);
  });
});
