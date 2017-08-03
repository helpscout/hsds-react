'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('Renders at the body on mount', function () {
  var preMountNodeCount = document.body.childNodes.length;
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
    _2.default,
    null,
    _react2.default.createElement(
      'div',
      { className: 'brick' },
      'BRICK'
    )
  ));
  var portal = document.body.childNodes[0];
  var el = portal.getElementsByClassName('brick')[0];

  expect(document.body.childNodes.length).toBe(preMountNodeCount + 1);
  expect(el).toBeTruthy();
  expect(el.innerHTML).toBe('BRICK');

  wrapper.unmount();
});

test('Is removed from the body on unmount', function (done) {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
    _2.default,
    null,
    _react2.default.createElement(
      'div',
      { className: 'brick' },
      'BRICK'
    )
  ));

  wrapper.unmount();

  setTimeout(function () {
    expect(document.getElementsByClassName('brick').length).toBe(0);
    done();
  }, 10);
});

test('Can add custom className', function () {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
    _2.default,
    { className: 'champ' },
    _react2.default.createElement(
      'div',
      { className: 'brick' },
      'BRICK'
    )
  ));

  expect(document.getElementsByClassName('champ').length).toBe(1);

  wrapper.unmount();
});

test('Can add custom ID', function () {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
    _2.default,
    { id: 'champ' },
    _react2.default.createElement(
      'div',
      { className: 'brick' },
      'BRICK'
    )
  ));

  expect(document.getElementById('champ')).toBeTruthy();

  wrapper.unmount();
});