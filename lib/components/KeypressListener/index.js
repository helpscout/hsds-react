'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _other = require('../../utilities/other');

var _events = require('@shopify/javascript-utilities/events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // See:
// https://github.com/Shopify/polaris/blob/master/src/components/KeypressListener/KeypressListener.tsx

var propTypes = {
  keyCode: _propTypes2.default.number,
  handler: _propTypes2.default.func
};

var defaultProp = {
  handler: _other.noop
};

var KeypressListener = function (_Component) {
  _inherits(KeypressListener, _Component);

  function KeypressListener() {
    _classCallCheck(this, KeypressListener);

    var _this = _possibleConstructorReturn(this, (KeypressListener.__proto__ || Object.getPrototypeOf(KeypressListener)).call(this));

    _this.handleKeyEvent = _this.handleKeyEvent.bind(_this);
    return _this;
  }

  _createClass(KeypressListener, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var node = document;
      (0, _events.addEventListener)(node, 'keyup', this.handleKeyEvent);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var node = document;
      (0, _events.removeEventListener)(node, 'keyup', this.handleKeyEvent);
    }
  }, {
    key: 'handleKeyEvent',
    value: function handleKeyEvent(event) {
      var _props = this.props,
          keyCode = _props.keyCode,
          handler = _props.handler;


      if (event.keyCode === keyCode) {
        handler(event);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return KeypressListener;
}(_react.Component);

KeypressListener.propTypes = propTypes;
KeypressListener.defaultProp = defaultProp;

exports.default = KeypressListener;