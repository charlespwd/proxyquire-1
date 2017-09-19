const assert = require('assert');

describe('Module: proxyquire', () => {
  it('should not leak proxyquire into module', () => {
    const length = module.children.length;
    let proxyquire;

    // proxyquire is required once
    proxyquire = require('..').noCallThru();
    assert.equal(module.children.length, length + 1);

    // proxyquire is required a second time
    proxyquire = require('..').noCallThru();
    assert.equal(module.children.length, length + 2);

    // proxyquire is required a third time
    proxyquire = require('..').noCallThru();
    assert.equal(module.children.length, length + 3);

    // as you can see, the module is leaked into module.children.
  });

  it('should not leak mocks into proxyquire', () => {
    const proxyquire = require('..').noCallThru();

    const beforeRequireLength = module.children.length;
    proxyquire('./samples/foo', {
      './bar': {},
    });

    assert.equal(
      module.children.length,
      beforeRequireLength + 1
    );

    proxyquire('./samples/foo', {
      './bar': {},
    });

    assert.equal(
      module.children.length,
      beforeRequireLength + 2
    );

    proxyquire('./samples/foo', {
      './bar': {},
    });

    assert.equal(
      module.children.length,
      beforeRequireLength + 3
    );

    // as you can see, the module './a' gets added three times as a child
    // of '..'.
  });
});
