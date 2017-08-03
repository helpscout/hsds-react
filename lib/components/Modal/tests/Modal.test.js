'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ = require('..');

var _2 = _interopRequireDefault(_);

var _Keys = require('../../../constants/Keys');

var _Keys2 = _interopRequireDefault(_Keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var trigger = _react2.default.createElement(
  'a',
  { className: 'trigger' },
  'Trigger'
);

var simulateKeyPress = function simulateKeyPress(keyCode) {
  var event = new Event('keyup');
  event.keyCode = keyCode;

  document.dispatchEvent(event);
};

describe('Trigger', function () {
  test('Can render', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { isOpen: true, trigger: trigger }));
    var el = wrapper.find('.trigger');

    expect(el.exists()).toBeTruthy();
    expect(el.text()).toBe('Trigger');

    wrapper.unmount();
  });

  test('Automatically receives click event', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { isOpen: true, trigger: trigger }));
    var el = wrapper.find('.trigger');

    expect(el.prop('onClick')).toBeInstanceOf(Function);

    wrapper.unmount();
  });
});

describe('Key events', function () {
  test('Closes modal when ESCAPE is pressed', function (done) {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { isOpen: true, trigger: trigger }));
    var portal = document.body.childNodes[0];
    var modal = portal.getElementsByClassName('c-Modal')[0];
    var preCloseNodeCount = document.body.childNodes.length;

    expect(modal).toBeTruthy();

    simulateKeyPress(_Keys2.default.ESCAPE);

    setTimeout(function () {
      expect(document.body.childNodes.length).toBeLessThan(preCloseNodeCount);
      expect(document.getElementsByClassName('c-Modal').length).toBe(0);
      done();
    }, 500);

    wrapper.unmount();
  });
});

describe('Portal', function () {
  test('Does not render Modal next to trigger', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { isOpen: true, trigger: trigger }));
    var modal = wrapper.find('.c-Modal');

    expect(modal.exists()).toBeFalsy();

    wrapper.unmount();
  });

  test('Renders at the body', function () {
    var preMountNodeCount = document.body.childNodes.length;
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { isOpen: true, trigger: trigger }));
    var portal = document.body.childNodes[0];
    var modal = portal.getElementsByClassName('c-Modal')[0];

    expect(document.body.childNodes.length).toBe(preMountNodeCount + 1);
    expect(modal).toBeTruthy();
    expect(modal.classList).toContain('c-Modal');

    wrapper.unmount();
  });

  test('Does not render by default', function (done) {
    setTimeout(function () {
      var preMountNodeCount = document.body.childNodes.length;
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { trigger: trigger }));
      var portal = document.body.childNodes[0];

      expect(document.body.childNodes.length).toBe(preMountNodeCount);
      expect(portal).not.toBeTruthy();

      wrapper.unmount();

      done();
    }, 500);
  });
});