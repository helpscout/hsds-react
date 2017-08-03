'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ClassName', function () {
  test('Has default className', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { name: 'emoji' }));

    expect(wrapper.prop('className')).toContain('c-Icon');
  });

  test('Applies custom className if specified', function () {
    var className = 'channel-4';
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { name: 'emoji', className: className }));

    expect(wrapper.prop('className')).toContain(className);
  });
});

describe('Interactions', function () {
  test('Add clickable styles if applied', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { name: 'emoji', clickable: true }));

    expect(wrapper.prop('className')).toContain('is-clickable');
    expect(wrapper.prop('className')).not.toContain('is-noInteract');
  });

  test('Add ignoreClick styles if applied', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { name: 'emoji', ignoreClick: true }));

    expect(wrapper.prop('className')).not.toContain('is-clickable');
    expect(wrapper.prop('className')).toContain('is-noInteract');
  });
});

describe('Sizes', function () {
  test('Add sizing styles if applied', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { name: 'emoji', size: '24' }));

    expect(wrapper.prop('className')).toContain('is-24');
  });
});

describe('Styles', function () {
  test('Add center styles if applied', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { name: 'emoji', center: true }));

    expect(wrapper.prop('className')).toContain('is-center');
  });

  test('Add muted styles if applied', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { name: 'emoji', muted: true }));

    expect(wrapper.prop('className')).toContain('is-muted');
  });
});