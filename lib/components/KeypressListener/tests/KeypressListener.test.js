'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ = require('..');

var _2 = _interopRequireDefault(_);

var _Keys = require('../../../constants/Keys');

var _Keys2 = _interopRequireDefault(_Keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var simulateKeyPress = function simulateKeyPress(keyCode) {
  var event = new Event('keyup');
  event.keyCode = keyCode;

  document.dispatchEvent(event);
};

describe('Events', function () {
  test('Can trigger handler callback on keypress', function () {
    var spy = jest.fn();
    (0, _enzyme.mount)(_react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_2.default, { keyCode: _Keys2.default.ENTER, handler: spy })
    ));

    simulateKeyPress(_Keys2.default.ENTER);

    expect(spy).toHaveBeenCalled();
  });

  test('Does not trigger callback on irrelevant keyPress', function () {
    var spy = jest.fn();
    (0, _enzyme.mount)(_react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_2.default, { keyCode: _Keys2.default.ENTER, handler: spy })
    ));

    simulateKeyPress(_Keys2.default.UP_ARROW);
    simulateKeyPress(_Keys2.default.CAPS_LOCK);
    simulateKeyPress(_Keys2.default.ESCAPE);
    simulateKeyPress(_Keys2.default.SPACE);
    simulateKeyPress(_Keys2.default.KEY_1);

    expect(spy).not.toHaveBeenCalled();
  });

  test('Can trigger handler callback multiple times', function () {
    var spy = jest.fn();
    (0, _enzyme.mount)(_react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_2.default, { keyCode: _Keys2.default.ENTER, handler: spy })
    ));

    simulateKeyPress(_Keys2.default.ENTER); // 1
    simulateKeyPress(_Keys2.default.ENTER); // 2
    simulateKeyPress(_Keys2.default.ENTER); // 3
    simulateKeyPress(_Keys2.default.SPACE); // SHOULD NOT COUNT
    simulateKeyPress(_Keys2.default.ENTER); // 4
    simulateKeyPress(_Keys2.default.ENTER); // 5

    expect(spy).toHaveBeenCalledTimes(5);
  });

  test('Stops listening on unmount', function () {
    var spy = jest.fn();
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_2.default, { keyCode: _Keys2.default.ENTER, handler: spy })
    ));

    simulateKeyPress(_Keys2.default.ENTER); // 1
    simulateKeyPress(_Keys2.default.ENTER); // 2

    expect(spy).toHaveBeenCalledTimes(2);

    wrapper.unmount();

    simulateKeyPress(_Keys2.default.ENTER);
    simulateKeyPress(_Keys2.default.ENTER);

    expect(spy).toHaveBeenCalledTimes(2);
  });

  test('Does not auto-trigger on mount', function () {
    var spy = jest.fn();
    (0, _enzyme.mount)(_react2.default.createElement(_2.default, { keyCode: _Keys2.default.ENTER, handler: spy }));

    expect(spy).not.toHaveBeenCalled();
  });

  test('Does not auto-trigger on unmount', function () {
    var spy = jest.fn();
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { keyCode: _Keys2.default.ENTER, handler: spy }));

    wrapper.unmount();

    expect(spy).not.toHaveBeenCalled();
  });
});