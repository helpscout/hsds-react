'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _animationStyles;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Transition = require('react-transition-group/Transition');

var _Transition2 = _interopRequireDefault(_Transition);

var _classNames = require('../../utilities/classNames');

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var propTypes = {
  animateOnMount: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  duration: _propTypes2.default.number,
  in: _propTypes2.default.bool,
  sequence: _propTypes2.default.string,
  wait: _propTypes2.default.number
};

var defaultProps = {
  animateOnMount: true,
  duration: 200,
  wait: 0
};

var animationStyles = (_animationStyles = {}, _defineProperty(_animationStyles, _Transition.ENTERING, 'is-mounting'), _defineProperty(_animationStyles, _Transition.ENTERED, 'has-mounted'), _defineProperty(_animationStyles, _Transition.EXITING, 'is-unmounting'), _defineProperty(_animationStyles, _Transition.EXITED, 'has-unmounted'), _animationStyles);

var Animate = function (_Component) {
  _inherits(Animate, _Component);

  function Animate() {
    _classCallCheck(this, Animate);

    var _this = _possibleConstructorReturn(this, (Animate.__proto__ || Object.getPrototypeOf(Animate)).call(this));

    _this.state = {
      in: false
    };
    return _this;
  }

  _createClass(Animate, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.animateOnMount || this.props.in === true) {
        this.setState({
          in: true
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.animateOnMount) {
        this.setState({
          in: false
        });
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.in !== undefined) {
        this.setState({
          in: nextProps.in
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var transitionIn = this.state.in;

      var className = props.className,
          duration = props.duration,
          sequence = props.sequence,
          wait = props.wait,
          rest = _objectWithoutProperties(props, ['className', 'duration', 'sequence', 'wait']);

      var childStyle = function childStyle(child) {
        return Object.assign({}, child.props.style, {
          transitionDuration: duration + 'ms'
        });
      };

      var sequenceClassNames = sequence ? sequence.split(' ').map(function (s) {
        return 'is-' + s;
      }).join(' ') : null;

      var childClassName = function childClassName(child, transitionStatus) {
        return (0, _classNames2.default)('animate', className, sequenceClassNames, transitionStatus && animationStyles[transitionStatus], child.props.className);
      };

      var timeout = {
        enter: wait,
        exit: wait
      };

      return _react2.default.createElement(
        _Transition2.default,
        _extends({}, rest, {
          className: 'animate',
          'in': transitionIn,
          timeout: timeout
        }),
        function (status) {
          return _react2.default.cloneElement(props.children, {
            className: childClassName(props.children, status),
            style: childStyle(props.children)
          });
        }
      );
    }
  }]);

  return Animate;
}(_react.Component);

Animate.propTypes = propTypes;
Animate.defaultProps = defaultProps;

exports.default = Animate;