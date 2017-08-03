'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var simulateEvent = function simulateEvent(eventName) {
  window.dispatchEvent(new Event(eventName));
};

describe('Events', function () {
  test('Can trigger handler callback when event is triggered', function () {
    var spy = jest.fn();
    (0, _enzyme.mount)(_react2.default.createElement(_2.default, { event: 'resize', handler: spy }));

    simulateEvent('resize');

    expect(spy).toHaveBeenCalled();
  });

  test('Can trigger handler callback when custom event is triggered', function () {
    var spy = jest.fn();
    (0, _enzyme.mount)(_react2.default.createElement(_2.default, { event: 'custom', handler: spy }));

    simulateEvent('custom');

    expect(spy).toHaveBeenCalled();
  });

  test('Does not trigger when other event is triggered', function () {
    var spy = jest.fn();
    (0, _enzyme.mount)(_react2.default.createElement(_2.default, { event: 'resize', handler: spy }));

    simulateEvent('scroll');

    expect(spy).not.toHaveBeenCalled();
  });

  test('Can trigger handler callback when event is triggered multiple times', function () {
    var spy = jest.fn();
    (0, _enzyme.mount)(_react2.default.createElement(_2.default, { event: 'resize', handler: spy }));

    simulateEvent('resize');
    simulateEvent('resize');
    simulateEvent('resize');
    simulateEvent('scroll'); // nope
    simulateEvent('resize');
    simulateEvent('resize');

    expect(spy).toHaveBeenCalledTimes(5);
  });

  test('Removes listener when unmounted', function () {
    var spy = jest.fn();
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { event: 'resize', handler: spy }));

    simulateEvent('resize');
    simulateEvent('scroll'); // nope
    simulateEvent('resize');

    wrapper.unmount();

    simulateEvent('resize'); // nope
    simulateEvent('scroll'); // nope
    simulateEvent('resize'); // nope

    expect(spy).toHaveBeenCalledTimes(2);
  });

  test('Can trigger when re-mounted', function () {
    var spy = jest.fn();
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { event: 'resize', handler: spy }));

    simulateEvent('resize');
    simulateEvent('scroll'); // nope

    wrapper.unmount();

    simulateEvent('resize');
    simulateEvent('resize');

    (0, _enzyme.mount)(_react2.default.createElement(_2.default, { event: 'resize', handler: spy }));

    simulateEvent('resize');
    simulateEvent('resize');

    expect(spy).toHaveBeenCalledTimes(3);
  });

  test('Does not auto-trigger on mount', function () {
    var spy = jest.fn();
    (0, _enzyme.mount)(_react2.default.createElement(_2.default, { event: 'resize', handler: spy }));

    expect(spy).not.toHaveBeenCalled();
  });

  test('Does not auto-trigger on unmount', function () {
    var spy = jest.fn();
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { event: 'resize', handler: spy }));

    wrapper.unmount();

    expect(spy).not.toHaveBeenCalled();
  });
});