'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _events = require('@shopify/javascript-utilities/events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  event: _propTypes2.default.string,
  capture: _propTypes2.default.bool,
  passive: _propTypes2.default.bool,
  handler: _propTypes2.default.func

  // see https://github.com/oliviertassinari/react-event-listener/
};
var EventListener = function (_Component) {
  _inherits(EventListener, _Component);

  function EventListener() {
    _classCallCheck(this, EventListener);

    var _this = _possibleConstructorReturn(this, (EventListener.__proto__ || Object.getPrototypeOf(EventListener)).call(this));

    _this.attachListener = _this.attachListener.bind(_this);
    _this.detachListener = _this.detachListener.bind(_this);
    return _this;
  }

  _createClass(EventListener, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.attachListener();
    }

    /* istanbul ignore next */

  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate() {
      this.detachListener();
    }

    /* istanbul ignore next */

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.attachListener();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.detachListener();
    }
  }, {
    key: 'attachListener',
    value: function attachListener() {
      var _props = this.props,
          event = _props.event,
          handler = _props.handler,
          capture = _props.capture,
          passive = _props.passive;

      (0, _events.addEventListener)(window, event, handler, { capture: capture, passive: passive });
    }
  }, {
    key: 'detachListener',
    value: function detachListener() {
      var _props2 = this.props,
          event = _props2.event,
          handler = _props2.handler,
          capture = _props2.capture;

      (0, _events.removeEventListener)(window, event, handler, capture);
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return EventListener;
}(_react.PureComponent);

EventListener.propTypes = propTypes;

exports.default = EventListener;