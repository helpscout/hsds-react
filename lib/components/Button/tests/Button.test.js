'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ClassNames', function () {
  test('Accepts custom className', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      { className: 'foo bar baz' },
      'Click Me'
    ));
    var classNames = wrapper.prop('className');

    expect(classNames).toContain('c-Button');
    expect(classNames).toContain('foo');
    expect(classNames).toContain('bar');
    expect(classNames).toContain('baz');
  });
});

describe('Types', function () {
  test('Adds the respective classNames', function () {
    var primary = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      { primary: true },
      'Primary'
    ));
    var plain = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      { plain: true },
      'Plain'
    ));

    expect(primary.prop('className')).toContain('c-Button--primary');
    expect(plain.prop('className')).toContain('c-Button--link');
  });

  test('Creates a button with type="submit"', function () {
    var button = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      { submit: true },
      'Submit'
    ));

    expect(button.prop('type')).toBe('submit');
  });
});

describe('Sizes', function () {
  test('Adds the respective classNames', function () {
    var lg = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      { size: 'lg' },
      'Large'
    ));
    var md = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      { size: 'md' },
      'Medium'
    ));
    var sm = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      { size: 'sm' },
      'Small'
    ));

    expect(lg.prop('className')).toContain('c-Button--lg');
    expect(md.prop('className')).toContain('c-Button--md');
    expect(sm.prop('className')).toContain('c-Button--sm');
  });
});

describe('States', function () {
  test('Adds the respective classNames', function () {
    var success = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      { state: 'success' },
      'Success'
    ));
    var error = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      { state: 'error' },
      'Error'
    ));
    var warning = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      { state: 'warning' },
      'Warning'
    ));

    expect(success.prop('className')).toContain('is-success');
    expect(error.prop('className')).toContain('is-error');
    expect(warning.prop('className')).toContain('is-warning');
  });

  test('Disables the button', function () {
    var callback = jest.fn();
    var disabledButton = (0, _enzyme.mount)(_react2.default.createElement(
      _2.default,
      { disabled: true, onClick: callback },
      'Disabled'
    ));
    disabledButton.simulate('click');

    expect(disabledButton.prop('disabled')).toBe(true);
    expect(callback).not.toBeCalled();
  });
});