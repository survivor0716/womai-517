'use strict';

describe('Controller: PassportCtrl', function () {

  // load the controller's module
  beforeEach(module('womai517App'));

  var PassportCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PassportCtrl = $controller('PassportCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PassportCtrl.awesomeThings.length).toBe(3);
  });
});
