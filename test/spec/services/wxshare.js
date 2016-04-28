'use strict';

describe('Service: wxshare', function () {

  // load the service's module
  beforeEach(module('womai517App'));

  // instantiate service
  var wxshare;
  beforeEach(inject(function (_wxshare_) {
    wxshare = _wxshare_;
  }));

  it('should do something', function () {
    expect(!!wxshare).toBe(true);
  });

});
