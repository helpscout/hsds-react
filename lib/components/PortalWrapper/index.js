'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Portal = require('../Portal');

var _Portal2 = _interopRequireDefault(_Portal);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Animate = require('../Animate');

var _Animate2 = _interopRequireDefault(_Animate);

var _KeypressListener = require('../KeypressListener');

var _KeypressListener2 = _interopRequireDefault(_KeypressListener);

var _Keys = require('../../constants/Keys');

var _Keys2 = _interopRequireDefault(_Keys);

var _id = require('../../utilities/id');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PortalWrapper = function PortalWrapper() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (ComposedComponent) {
    var propTypes = {
      isOpen: _propTypes2.default.bool,
      timeout: _propTypes2.default.number
    };

    var defaultProps = {
      isOpen: false,
      timeout: 0
    };

    var uniqueID = (0, _id.createUniqueIDFactory)(options.id);

    var PortalWrapper = function (_Component) {
      _inherits(PortalWrapper, _Component);

      function PortalWrapper(props) {
        _classCallCheck(this, PortalWrapper);

        var _this = _possibleConstructorReturn(this, (PortalWrapper.__proto__ || Object.getPrototypeOf(PortalWrapper)).call(this));

        _this.state = Object.assign({}, props, options);
        return _this;
      }

      _createClass(PortalWrapper, [{
        key: 'openPortal',
        value: function openPortal() {
          this.setState({
            isOpen: true
          });
        }
      }, {
        key: 'closePortal',
        value: function closePortal() {
          this.setState({
            isOpen: false
          });
        }
      }, {
        key: 'render',
        value: function render() {
          var _state = this.state,
              isOpen = _state.isOpen,
              timeout = _state.timeout,
              trigger = _state.trigger;

          var openPortal = this.openPortal.bind(this);
          var closePortal = this.closePortal.bind(this);
          var id = uniqueID();

          var portalMarkup = _react2.default.createElement(
            _Animate2.default,
            { animateOnMount: false, 'in': isOpen, unmountOnExit: true },
            _react2.default.createElement(
              _Portal2.default,
              { id: id, timeout: timeout },
              _react2.default.createElement(ComposedComponent, _extends({
                openPortal: openPortal,
                closePortal: closePortal,
                portalIsOpen: isOpen
              }, this.props))
            )
          );

          var triggerMarkup = _react2.default.cloneElement(trigger, {
            onClick: openPortal
          });

          return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_KeypressListener2.default, { keyCode: _Keys2.default.ESCAPE, handler: closePortal }),
            triggerMarkup,
            portalMarkup
          );
        }
      }]);

      return PortalWrapper;
    }(_react.Component);

    PortalWrapper.propTypes = propTypes;
    PortalWrapper.defaultProps = defaultProps;

    return PortalWrapper;
  };
};

exports.default = PortalWrapper;