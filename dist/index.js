module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 72);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var classNames = function classNames() {
  for (var _len = arguments.length, classes = Array(_len), _key = 0; _key < _len; _key++) {
    classes[_key] = arguments[_key];
  }

  return classes.filter(function (name) {
    return name && typeof name !== 'boolean';
  }).join(' ');
};

exports.default = classNames;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noop = noop;
function noop() {}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _animationStyles;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Transition = __webpack_require__(70);

var _Transition2 = _interopRequireDefault(_Transition);

var _classNames = __webpack_require__(2);

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

var animationStyles = (_animationStyles = {}, _defineProperty(_animationStyles, _Transition.ENTERING, 'is-mounting'), _defineProperty(_animationStyles, _Transition.ENTERED, 'is-mounted'), _defineProperty(_animationStyles, _Transition.EXITING, 'is-unmounting'), _defineProperty(_animationStyles, _Transition.EXITED, 'is-unmounted'), _animationStyles);

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
      /* istanbul ignore next */
      if (nextProps.in === undefined) return;

      this.setState({
        in: nextProps.in
      });
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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classNames = __webpack_require__(2);

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  className: _propTypes2.default.string,
  state: _propTypes2.default.string
};

var HelpText = function HelpText(props) {
  var state = props.state;


  var className = (0, _classNames2.default)('c-InputHelpText', state && 'is-' + state, props.className);

  return _react2.default.createElement(
    'div',
    { className: className },
    props.children
  );
};

HelpText.propTypes = propTypes;

exports.default = HelpText;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classNames = __webpack_require__(2);

var _classNames2 = _interopRequireDefault(_classNames);

var _Text = __webpack_require__(14);

var _Text2 = _interopRequireDefault(_Text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  className: _propTypes2.default.string,
  for: _propTypes2.default.string,
  state: _propTypes2.default.string
};

var Label = function Label(props) {
  var state = props.state;


  var className = (0, _classNames2.default)('c-Label', state && 'is-' + state, props.className);

  return _react2.default.createElement(
    'label',
    { className: className, htmlFor: props.for },
    _react2.default.createElement(
      _Text2.default,
      { faint: true },
      props.children
    )
  );
};

Label.propTypes = propTypes;

exports.default = Label;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classNames = __webpack_require__(2);

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  className: _propTypes2.default.string,
  focusable: _propTypes2.default.bool
};

var defaultProps = {
  focusable: false
};

var VisuallyHidden = function VisuallyHidden(props) {
  var focusable = props.focusable;


  var className = (0, _classNames2.default)('c-VisuallyHidden', focusable && 'is-focusable', props.className);

  var tabIndex = focusable ? 1 : null;

  return _react2.default.createElement(
    'span',
    { className: className, tabIndex: tabIndex },
    props.children
  );
};

VisuallyHidden.propTypes = propTypes;
VisuallyHidden.defaultProps = defaultProps;

exports.default = VisuallyHidden;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classNames = __webpack_require__(2);

var _classNames2 = _interopRequireDefault(_classNames);

var _other = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var propTypes = {
  className: _propTypes2.default.string,
  hover: _propTypes2.default.bool,
  href: _propTypes2.default.string,
  onBlur: _propTypes2.default.func,
  onClick: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.func]),
  onFocus: _propTypes2.default.func,
  seamless: _propTypes2.default.bool,
  selector: _propTypes2.default.string
};
var defaultProps = {
  hover: false,
  onBlur: _other.noop,
  onClick: false,
  onFocus: _other.noop,
  seamless: false,
  selector: 'div'
};

var Card = function Card(props) {
  var hover = props.hover,
      href = props.href,
      onClick = props.onClick,
      seamless = props.seamless,
      selector = props.selector,
      rest = _objectWithoutProperties(props, ['hover', 'href', 'onClick', 'seamless', 'selector']);

  var className = (0, _classNames2.default)('c-Card', (onClick || href) && 'is-clickable', (onClick || hover || href) && 'is-hoverable', seamless && 'is-seamless', props.className);

  var selectorTag = href ? 'a' : selector;

  var element = _react2.default.createElement(selectorTag, _extends({}, rest, {
    className: className,
    href: href,
    onClick: onClick
  }), props.children);

  return element;
};

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

exports.default = Card;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classNames = __webpack_require__(2);

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var propTypes = {
  className: _propTypes2.default.string,
  size: _propTypes2.default.string
};

var CardBlock = function CardBlock(props) {
  var size = props.size,
      rest = _objectWithoutProperties(props, ['size']);

  var className = (0, _classNames2.default)('c-CardBlock', size && 'c-CardBlock--' + size, props.className);

  return _react2.default.createElement(
    'div',
    _extends({ className: className }, rest),
    props.children
  );
};

CardBlock.propTypes = propTypes;

exports.default = CardBlock;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _icons = __webpack_require__(29);

var _icons2 = _interopRequireDefault(_icons);

var _classNames = __webpack_require__(2);

var _classNames2 = _interopRequireDefault(_classNames);

var _other = __webpack_require__(3);

var _VisuallyHidden = __webpack_require__(7);

var _VisuallyHidden2 = _interopRequireDefault(_VisuallyHidden);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  center: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  clickable: _propTypes2.default.bool,
  ignoreClick: _propTypes2.default.bool,
  muted: _propTypes2.default.bool,
  name: _propTypes2.default.string.isRequired,
  onClick: _propTypes2.default.func,
  size: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  title: _propTypes2.default.string
};
var defaultProps = {
  clickable: false,
  center: false,
  ignoreClick: true,
  muted: false,
  name: null,
  onClick: _other.noop
};

var Icon = function Icon(props) {
  var center = props.center,
      clickable = props.clickable,
      ignoreClick = props.ignoreClick,
      muted = props.muted,
      onClick = props.onClick,
      name = props.name,
      size = props.size,
      title = props.title;


  var className = (0, _classNames2.default)('c-Icon', center && 'is-center', clickable && 'is-clickable', !clickable && ignoreClick && 'is-noInteract', muted && 'is-muted', size && 'is-' + size, props.className);

  var src = { __html: _icons2.default[name] };
  var iconTitle = title || name;

  return _react2.default.createElement(
    'div',
    {
      className: className,
      onClick: onClick,
      'data-icon-name': name
    },
    _react2.default.createElement('div', {
      className: 'c-Icon__icon',
      dangerouslySetInnerHTML: src,
      title: iconTitle
    }),
    _react2.default.createElement(
      _VisuallyHidden2.default,
      null,
      iconTitle
    )
  );
};

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

exports.default = Icon;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classNames = __webpack_require__(2);

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  className: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  state: _propTypes2.default.string
};

var Backdrop = function Backdrop(props) {
  var disabled = props.disabled,
      state = props.state;


  var className = (0, _classNames2.default)('c-InputBackdrop', disabled && 'is-disabled', state && 'is-' + state, props.className);

  return _react2.default.createElement('div', { className: className, role: 'presentation' });
};

Backdrop.propTypes = propTypes;

exports.default = Backdrop;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classNames = __webpack_require__(2);

var _classNames2 = _interopRequireDefault(_classNames);

var _other = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  className: _propTypes2.default.string,
  onClick: _propTypes2.default.func,
  style: _propTypes2.default.object
};
var defaultProps = {
  onClick: _other.noop,
  style: {}
};

var Overlay = function Overlay(props) {
  var onClick = props.onClick,
      style = props.style;


  var className = (0, _classNames2.default)('c-Overlay', props.className);

  return _react2.default.createElement(
    'div',
    { className: className, style: style, role: 'dialog', onClick: onClick },
    props.children
  );
};

Overlay.propTypes = propTypes;
Overlay.defaultProps = defaultProps;

exports.default = Overlay;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(69);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  children: _propTypes2.default.element.isRequired,
  className: _propTypes2.default.string,
  id: _propTypes2.default.string,
  timeout: _propTypes2.default.number
};

var defaultProps = {
  timeout: 0
};

var Portal = function (_React$Component) {
  _inherits(Portal, _React$Component);

  function Portal() {
    _classCallCheck(this, Portal);

    var _this = _possibleConstructorReturn(this, (Portal.__proto__ || Object.getPrototypeOf(Portal)).call(this));

    _this.node = null;
    return _this;
  }

  _createClass(Portal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.openPortal(this.props);
    }

    /* istanbul ignore next */

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.node && this.props.className !== nextProps.className) {
        this.node.className = nextProps.className;
      }
      this.openPortal(nextProps);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this2 = this;

      setTimeout(function () {
        _this2.closePortal();
      }, this.props.timeout);
    }
  }, {
    key: 'openPortal',
    value: function openPortal(props) {
      if (!this.node) {
        this.node = document.createElement('div');
        if (props.className) {
          this.node.className = props.className;
        }
        if (props.id) {
          this.node.id = props.id;
        }
        document.body.appendChild(this.node);
      }

      _reactDom2.default.unstable_renderSubtreeIntoContainer(this, props.children, this.node);
    }
  }, {
    key: 'closePortal',
    value: function closePortal() {
      /* istanbul ignore next */
      if (this.node) {
        _reactDom2.default.unmountComponentAtNode(this.node);
        document.body.removeChild(this.node);
      }
      this.node = null;
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return Portal;
}(_react2.default.Component);

Portal.propTypes = propTypes;
Portal.defaultProps = defaultProps;

exports.default = Portal;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classNames = __webpack_require__(2);

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  className: _propTypes2.default.string,
  disableSelect: _propTypes2.default.bool,
  faint: _propTypes2.default.bool,
  muted: _propTypes2.default.bool,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  state: _propTypes2.default.string,
  subtle: _propTypes2.default.bool,
  truncate: _propTypes2.default.bool
};
var defaultProps = {
  disableSelect: false,
  truncate: false
};

var Text = function Text(props) {
  var disableSelect = props.disableSelect,
      faint = props.faint,
      muted = props.muted,
      size = props.size,
      state = props.state,
      subtle = props.subtle,
      truncate = props.truncate;


  var className = (0, _classNames2.default)('c-Text', disableSelect && 'is-disableSelect', faint && 'is-faint', muted && 'is-muted', size && 'is-' + size, state && 'is-' + state, subtle && 'is-subtle', truncate && 'is-truncate', props.className);

  return _react2.default.createElement(
    'span',
    { className: className },
    props.children
  );
};

Text.propTypes = propTypes;
Text.defaultProps = defaultProps;

exports.default = Text;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUniqueIDFactory = createUniqueIDFactory;
// Source
// https://github.com/Shopify/javascript-utilities/blob/master/src/other.ts
function createUniqueIDFactory() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var index = 1;
  return function () {
    return '' + prefix + index++;
  };
}

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("@shopify/javascript-utilities/events");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (typeof Promise === 'undefined') {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  __webpack_require__(68).enable()
  window.Promise = __webpack_require__(67)
}

// fetch() polyfill for making API calls.
__webpack_require__(71)

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = __webpack_require__(66)


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _components = __webpack_require__(40);

Object.keys(_components).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _components[key];
    }
  });
});

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _VisuallyHidden = __webpack_require__(7);

var _VisuallyHidden2 = _interopRequireDefault(_VisuallyHidden);

var _classNames = __webpack_require__(2);

var _classNames2 = _interopRequireDefault(_classNames);

var _strings = __webpack_require__(42);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  className: _propTypes2.default.string,
  image: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.string]),
  name: _propTypes2.default.string.isRequired,
  size: _propTypes2.default.string
};
var defaultProps = {
  name: ''
};

var Avatar = function Avatar(props) {
  var image = props.image,
      name = props.name,
      size = props.size;


  var className = (0, _classNames2.default)('c-Avatar', image && 'has-image', size && 'is-' + size, props.className);

  var initials = (0, _strings.nameToInitials)(name);
  var imageStyle = image ? { backgroundImage: 'url(\'' + image + '\')' } : null;

  var contentMarkup = image ? _react2.default.createElement(
    'div',
    { className: 'c-Avatar__image', style: imageStyle },
    _react2.default.createElement(
      'div',
      { className: 'c-Avatar__name' },
      _react2.default.createElement(
        _VisuallyHidden2.default,
        null,
        name
      )
    )
  ) : _react2.default.createElement(
    'div',
    { className: 'c-Avatar__title' },
    initials
  );

  return _react2.default.createElement(
    'div',
    { className: className },
    _react2.default.createElement(
      'div',
      { className: 'c-Avatar__crop' },
      contentMarkup
    )
  );
};

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

exports.default = Avatar;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classNames = __webpack_require__(2);

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  className: _propTypes2.default.string,
  size: _propTypes2.default.string,
  status: _propTypes2.default.string,
  white: _propTypes2.default.bool
};

var Badge = function Badge(props) {
  var size = props.size,
      status = props.status,
      white = props.white;

  var className = (0, _classNames2.default)('c-Badge', size && 'is-' + size, status && 'is-' + status, white && 'is-white', props.className);

  return _react2.default.createElement(
    'div',
    { className: className },
    props.children
  );
};

Badge.propTypes = propTypes;

exports.default = Badge;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classNames = __webpack_require__(2);

var _classNames2 = _interopRequireDefault(_classNames);

var _other = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var propTypes = {
  accessibilityLabel: _propTypes2.default.string,
  className: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  onBlur: _propTypes2.default.func,
  onClick: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  plain: _propTypes2.default.bool,
  primary: _propTypes2.default.bool,
  size: _propTypes2.default.string,
  state: _propTypes2.default.string,
  submit: _propTypes2.default.bool
};
var defaultProps = {
  accessibilityLabel: '',
  disabled: false,
  onBlur: _other.noop,
  onClick: _other.noop,
  onFocus: _other.noop,
  plain: false,
  primary: false,
  size: '',
  state: '',
  submit: false
};

var Button = function Button(props) {
  var accessibilityLabel = props.accessibilityLabel,
      children = props.children,
      className = props.className,
      disabled = props.disabled,
      onBlur = props.onBlur,
      onClick = props.onClick,
      onFocus = props.onFocus,
      plain = props.plain,
      primary = props.primary,
      size = props.size,
      state = props.state,
      submit = props.submit,
      rest = _objectWithoutProperties(props, ['accessibilityLabel', 'children', 'className', 'disabled', 'onBlur', 'onClick', 'onFocus', 'plain', 'primary', 'size', 'state', 'submit']);

  var buttonClassName = (0, _classNames2.default)('c-Button', size && 'c-Button--' + size, state && 'is-' + state, plain && 'c-Button--link', primary && 'c-Button--primary', props.className);

  var type = submit ? 'submit' : 'button';

  return _react2.default.createElement(
    'button',
    _extends({
      'aria-label': accessibilityLabel,
      className: buttonClassName,
      disabled: disabled,
      onBlur: onBlur,
      onClick: onClick,
      onFocus: onFocus,
      type: type
    }, rest),
    children
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

exports.default = Button;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Icon = __webpack_require__(10);

var _Icon2 = _interopRequireDefault(_Icon);

var _classNames = __webpack_require__(2);

var _classNames2 = _interopRequireDefault(_classNames);

var _other = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var propTypes = {
  className: _propTypes2.default.string,
  onBlur: _propTypes2.default.func,
  onClick: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  title: _propTypes2.default.string
};

var defaultProps = {
  onBlur: _other.noop,
  onClick: _other.noop,
  onFocus: _other.noop,
  title: 'Close'
};

var CloseButton = function CloseButton(props) {
  var className = props.className,
      title = props.title,
      rest = _objectWithoutProperties(props, ['className', 'title']);

  var buttonClassName = (0, _classNames2.default)('c-CloseButton', className);

  return _react2.default.createElement(
    'button',
    _extends({ className: buttonClassName }, rest, { 'aria-label': 'Close', title: title }),
    _react2.default.createElement(_Icon2.default, {
      center: true,
      className: 'c-CloseButton__icon',
      ignoreClick: true,
      muted: true,
      name: 'cross-medium',
      title: 'Close'
    })
  );
};

CloseButton.propTypes = propTypes;
CloseButton.defaultProps = defaultProps;

exports.default = CloseButton;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _events = __webpack_require__(16);

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

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _classNames = __webpack_require__(2);

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Block = function Block(props) {
  var className = (0, _classNames2.default)('c-Flexy__block', props.className);

  return _react2.default.createElement(
    'div',
    { className: className },
    props.children
  );
};

exports.default = Block;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Block = __webpack_require__(24);

var _Block2 = _interopRequireDefault(_Block);

var _Item = __webpack_require__(26);

var _Item2 = _interopRequireDefault(_Item);

var _classNames = __webpack_require__(2);

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  align: _propTypes2.default.string,
  className: _propTypes2.default.string,
  gap: _propTypes2.default.string,
  just: _propTypes2.default.string
};

var Flexy = function Flexy(props) {
  var align = props.align,
      gap = props.gap,
      just = props.just;


  var className = (0, _classNames2.default)('c-Flexy', align && 'is-' + align, gap && 'c-Flexy--gap-' + gap, just && 'c-Flexy--just-' + just, props.className);

  return _react2.default.createElement(
    'div',
    { className: className },
    props.children
  );
};

Flexy.PropTypes = propTypes;
Flexy.Block = _Block2.default;
Flexy.Item = _Item2.default;

exports.default = Flexy;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _classNames = __webpack_require__(2);

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Item = function Item(props) {
  var className = (0, _classNames2.default)('c-Flexy__item', props.className);

  return _react2.default.createElement(
    'div',
    { className: className },
    props.children
  );
};

exports.default = Item;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Flexy = __webpack_require__(25);

var _Flexy2 = _interopRequireDefault(_Flexy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Flexy2.default;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classNames = __webpack_require__(2);

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var propTypes = {
  className: _propTypes2.default.string,
  disableSelect: _propTypes2.default.bool,
  light: _propTypes2.default.bool,
  selector: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.string]),
  size: _propTypes2.default.string
};
var defaultProps = {
  disableSelect: false,
  selector: false
};

var Heading = function Heading(props) {
  var disableSelect = props.disableSelect,
      light = props.light,
      selector = props.selector,
      size = props.size,
      rest = _objectWithoutProperties(props, ['disableSelect', 'light', 'selector', 'size']);

  var className = (0, _classNames2.default)('c-Heading', disableSelect && 'is-disableSelect', light && 'is-light', size && 'is-' + size, props.className);

  var selectorTag = selector || 'div';

  var element = _react2.default.createElement(selectorTag, _extends({}, rest, {
    className: className
  }), props.children);

  return element;
};

Heading.propTypes = propTypes;
Heading.defaultProps = defaultProps;

exports.default = Heading;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alert = __webpack_require__(43);

var _alert2 = _interopRequireDefault(_alert);

var _arrowRight = __webpack_require__(44);

var _arrowRight2 = _interopRequireDefault(_arrowRight);

var _attachment = __webpack_require__(45);

var _attachment2 = _interopRequireDefault(_attachment);

var _chatActive = __webpack_require__(46);

var _chatActive2 = _interopRequireDefault(_chatActive);

var _chat = __webpack_require__(47);

var _chat2 = _interopRequireDefault(_chat);

var _clockLarge = __webpack_require__(48);

var _clockLarge2 = _interopRequireDefault(_clockLarge);

var _clockSmall = __webpack_require__(49);

var _clockSmall2 = _interopRequireDefault(_clockSmall);

var _crossLarge = __webpack_require__(50);

var _crossLarge2 = _interopRequireDefault(_crossLarge);

var _crossMedium = __webpack_require__(51);

var _crossMedium2 = _interopRequireDefault(_crossMedium);

var _crossSmall = __webpack_require__(52);

var _crossSmall2 = _interopRequireDefault(_crossSmall);

var _document = __webpack_require__(53);

var _document2 = _interopRequireDefault(_document);

var _emoji = __webpack_require__(54);

var _emoji2 = _interopRequireDefault(_emoji);

var _fullscreen = __webpack_require__(55);

var _fullscreen2 = _interopRequireDefault(_fullscreen);

var _helpscoutLogo = __webpack_require__(56);

var _helpscoutLogo2 = _interopRequireDefault(_helpscoutLogo);

var _imageAdd = __webpack_require__(57);

var _imageAdd2 = _interopRequireDefault(_imageAdd);

var _image = __webpack_require__(58);

var _image2 = _interopRequireDefault(_image);

var _link = __webpack_require__(59);

var _link2 = _interopRequireDefault(_link);

var _meatball = __webpack_require__(60);

var _meatball2 = _interopRequireDefault(_meatball);

var _search = __webpack_require__(61);

var _search2 = _interopRequireDefault(_search);

var _star = __webpack_require__(62);

var _star2 = _interopRequireDefault(_star);

var _tickLarge = __webpack_require__(63);

var _tickLarge2 = _interopRequireDefault(_tickLarge);

var _tickSmall = __webpack_require__(64);

var _tickSmall2 = _interopRequireDefault(_tickSmall);

var _video = __webpack_require__(65);

var _video2 = _interopRequireDefault(_video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ICONS = {
  alert: _alert2.default,
  'arrow-right': _arrowRight2.default,
  attachment: _attachment2.default,
  'chat-active': _chatActive2.default,
  chat: _chat2.default,
  'clock-large': _clockLarge2.default,
  'clock-small': _clockSmall2.default,
  'cross-large': _crossLarge2.default,
  'cross-medium': _crossMedium2.default,
  'cross-small': _crossSmall2.default,
  document: _document2.default,
  emoji: _emoji2.default,
  fullscreen: _fullscreen2.default,
  'helpscout-logo': _helpscoutLogo2.default,
  'image-add': _imageAdd2.default,
  image: _image2.default,
  link: _link2.default,
  meatball: _meatball2.default,
  'option-dots': _meatball2.default,
  search: _search2.default,
  star: _star2.default,
  'tick-large': _tickLarge2.default,
  'tick-small': _tickSmall2.default,
  video: _video2.default
};

exports.default = ICONS;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classNames = __webpack_require__(2);

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var propTypes = {
  alt: _propTypes2.default.string,
  className: _propTypes2.default.string,
  height: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  src: _propTypes2.default.string.isRequired,
  style: _propTypes2.default.object,
  title: _propTypes2.default.string,
  width: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])
};

var Image = function Image(props) {
  var className = props.className,
      rest = _objectWithoutProperties(props, ['className']);

  var ImageClassName = (0, _classNames2.default)('c-Image', className);

  var imageElement = _react2.default.createElement('img', _extends({}, rest, {
    className: ImageClassName
  }));

  return imageElement;
};

Image.propTypes = propTypes;

exports.default = Image;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _EventListener = __webpack_require__(23);

var _EventListener2 = _interopRequireDefault(_EventListener);

var _other = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // See: https://github.com/Shopify/polaris/blob/master/src/components/TextField/Resizer.tsx

var ENTITIES_TO_REPLACE = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '\n': '<br>'
};
var REPLACE_REGEX = /[\n&<>]/g;

var propTypes = {
  contents: _propTypes2.default.string,
  currentHeight: _propTypes2.default.number,
  minimumLines: _propTypes2.default.number,
  onResize: _propTypes2.default.func
};
var defaultProps = {
  contents: '',
  currentHeight: null,
  minimumLines: 1,
  onResize: _other.noop
};

var Resizer = function (_Component) {
  _inherits(Resizer, _Component);

  function Resizer() {
    _classCallCheck(this, Resizer);

    return _possibleConstructorReturn(this, (Resizer.__proto__ || Object.getPrototypeOf(Resizer)).apply(this, arguments));
  }

  _createClass(Resizer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.handleOnResize();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.handleOnResize();
    }

    // Ignoring as height calculation isn't possible with JSDOM
    // (which is what Enzyme uses for tests)
    /* istanbul ignore next */

  }, {
    key: 'handleOnResize',
    value: function handleOnResize() {
      var contentHeight = this.contentNode.offsetHeight;
      var minimumHeight = this.minimumLinesNode ? this.minimumLinesNode.offsetHeight : 0;
      var newHeight = Math.max(contentHeight, minimumHeight);

      var _props = this.props,
          currentHeight = _props.currentHeight,
          onResize = _props.onResize;


      if (newHeight !== currentHeight) {
        onResize(newHeight);
      }
    }
  }, {
    key: 'replaceEntity',
    value: function replaceEntity(entity) {
      return ENTITIES_TO_REPLACE[entity] || /* istanbul ignore next */entity;
    }
  }, {
    key: 'getContentsForMinimumLines',
    value: function getContentsForMinimumLines(minimumLines) {
      var content = '';
      for (var line = 0; line < minimumLines; line++) {
        content += '<br>';
      }

      return content;
    }
  }, {
    key: 'getFinalContents',
    value: function getFinalContents(contents) {
      return contents ? contents.replace(REPLACE_REGEX, this.replaceEntity) + '<br>' : '<br>';
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          contents = _props2.contents,
          minimumLines = _props2.minimumLines;

      var handleOnResize = this.handleOnResize.bind(this);

      var minimumLinesMarkup = minimumLines ? _react2.default.createElement('div', {
        ref: function ref(node) {
          return _this2.minimumLinesNode = node;
        },
        className: 'c-InputGhost',
        dangerouslySetInnerHTML: {
          __html: this.getContentsForMinimumLines(minimumLines)
        }
      }) : null;

      return _react2.default.createElement(
        'div',
        { 'aria-hidden': true, className: 'c-InputResizer' },
        _react2.default.createElement(_EventListener2.default, { event: 'resize', handler: handleOnResize }),
        _react2.default.createElement('div', {
          ref: function ref(node) {
            return _this2.contentNode = node;
          },
          className: 'c-InputGhost',
          dangerouslySetInnerHTML: { __html: this.getFinalContents(contents) }
        }),
        minimumLinesMarkup
      );
    }
  }]);

  return Resizer;
}(_react.PureComponent);

Resizer.propTypes = propTypes;
Resizer.defaultProps = defaultProps;

exports.default = Resizer;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Backdrop = __webpack_require__(11);

var _Backdrop2 = _interopRequireDefault(_Backdrop);

var _HelpText = __webpack_require__(5);

var _HelpText2 = _interopRequireDefault(_HelpText);

var _Label = __webpack_require__(6);

var _Label2 = _interopRequireDefault(_Label);

var _Resizer = __webpack_require__(31);

var _Resizer2 = _interopRequireDefault(_Resizer);

var _classNames = __webpack_require__(2);

var _classNames2 = _interopRequireDefault(_classNames);

var _id = __webpack_require__(15);

var _other = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // See: https://github.com/Shopify/polaris/blob/master/src/components/TextField/TextField.tsx

var propTypes = {
  autoFocus: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  helpText: _propTypes2.default.string,
  id: _propTypes2.default.string,
  label: _propTypes2.default.string,
  multiline: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.number]),
  name: _propTypes2.default.string,
  onBlur: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  placeholder: _propTypes2.default.string,
  prefix: _propTypes2.default.string,
  readOnly: _propTypes2.default.bool,
  resizable: _propTypes2.default.bool,
  seamless: _propTypes2.default.bool,
  size: _propTypes2.default.string,
  state: _propTypes2.default.string,
  suffix: _propTypes2.default.string,
  type: _propTypes2.default.string,
  value: _propTypes2.default.string
};
var defaultProps = {
  autoFocus: false,
  disabled: false,
  multiline: null,
  onBlur: _other.noop,
  onChange: _other.noop,
  onFocus: _other.noop,
  readOnly: false,
  resizable: false,
  seamless: false,
  type: 'text',
  value: ''
};

var uniqueID = (0, _id.createUniqueIDFactory)('Input');

var Input = function (_Component) {
  _inherits(Input, _Component);

  function Input(props) {
    _classCallCheck(this, Input);

    var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this));

    _this.state = {
      height: null,
      value: props.value
    };
    return _this;
  }

  _createClass(Input, [{
    key: 'handleOnChange',
    value: function handleOnChange(e) {
      var value = e.currentTarget.value;
      this.setState({ value: value });
      this.props.onChange(value);
    }
  }, {
    key: 'handleExpandingResize',
    value: function handleExpandingResize(height) {
      this.setState({ height: height });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          autoFocus = _props.autoFocus,
          disabled = _props.disabled,
          helpText = _props.helpText,
          id = _props.id,
          inputRef = _props.inputRef,
          label = _props.label,
          multiline = _props.multiline,
          name = _props.name,
          onBlur = _props.onBlur,
          onFocus = _props.onFocus,
          placeholder = _props.placeholder,
          prefix = _props.prefix,
          readOnly = _props.readOnly,
          resizable = _props.resizable,
          seamless = _props.seamless,
          size = _props.size,
          state = _props.state,
          suffix = _props.suffix,
          type = _props.type,
          rest = _objectWithoutProperties(_props, ['autoFocus', 'disabled', 'helpText', 'id', 'inputRef', 'label', 'multiline', 'name', 'onBlur', 'onFocus', 'placeholder', 'prefix', 'readOnly', 'resizable', 'seamless', 'size', 'state', 'suffix', 'type']);

      var _state = this.state,
          height = _state.height,
          value = _state.value;


      var handleOnChange = this.handleOnChange.bind(this);
      var handleExpandingResize = this.handleExpandingResize.bind(this);

      var className = (0, _classNames2.default)('c-Input', disabled && 'is-disabled', multiline && 'is-multiline', readOnly && 'is-readonly', resizable && 'is-resizable', seamless && 'is-seamless', state && 'is-' + state, value && 'has-value', this.props.className);

      var inputID = id || uniqueID();
      var fieldClassName = (0, _classNames2.default)('c-InputField', size && 'is-' + size);

      // Ignoring as height calculation isn't possible with JSDOM
      // (which is what Enzyme uses for tests)
      /* istanbul ignore next */
      var style = multiline && height ? { height: height } : null;

      var resizer = multiline != null ? _react2.default.createElement(_Resizer2.default, {
        contents: value || placeholder,
        currentHeight: height,
        minimumLines: typeof multiline === 'number' ? multiline : 1,
        onResize: handleExpandingResize
      }) : null;

      var labelMarkup = label ? _react2.default.createElement(
        _Label2.default,
        { 'for': inputID },
        label
      ) : null;

      var prefixMarkup = prefix ? _react2.default.createElement(
        'div',
        { className: 'c-Input__item c-Input__prefix' },
        prefix
      ) : null;

      var suffixMarkup = suffix ? _react2.default.createElement(
        'div',
        { className: 'c-Input__item c-Input__suffix' },
        suffix
      ) : null;

      var helpTextMarkup = helpText ? _react2.default.createElement(
        _HelpText2.default,
        { state: state },
        helpText
      ) : null;

      var inputElement = _react2.default.createElement(multiline ? 'textarea' : 'input', _extends({}, rest, {
        className: fieldClassName,
        id: inputID,
        onChange: handleOnChange,
        ref: inputRef,
        autoFocus: autoFocus,
        disabled: disabled,
        name: name,
        onBlur: onBlur,
        onFocus: onFocus,
        placeholder: placeholder,
        readOnly: readOnly,
        style: style,
        type: type,
        value: value
      }));

      return _react2.default.createElement(
        'div',
        { className: 'c-InputWrapper' },
        labelMarkup,
        _react2.default.createElement(
          'div',
          { className: className },
          prefixMarkup,
          inputElement,
          suffixMarkup,
          _react2.default.createElement(_Backdrop2.default, { disabled: disabled, state: state }),
          resizer
        ),
        helpTextMarkup
      );
    }
  }]);

  return Input;
}(_react.PureComponent);

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

exports.default = Input;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _other = __webpack_require__(3);

var _events = __webpack_require__(16);

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

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classNames = __webpack_require__(2);

var _classNames2 = _interopRequireDefault(_classNames);

var _other = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var propTypes = {
  className: _propTypes2.default.string,
  external: _propTypes2.default.bool,
  href: _propTypes2.default.string,
  onBlur: _propTypes2.default.func,
  onClick: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  to: _propTypes2.default.string
};
var defaultProps = {
  external: false,
  href: '#',
  onBlur: _other.noop,
  onClick: _other.noop,
  onFocus: _other.noop,
  to: ''
};

var Link = function Link(props) {
  var className = props.className,
      external = props.external,
      rest = _objectWithoutProperties(props, ['className', 'external']);

  var linkClassName = (0, _classNames2.default)('c-Link', className);

  var target = external ? '_blank' : undefined;
  var rel = external ? 'noopener noreferrer' : undefined;

  // Note: If we're going to support React Router, then the `to` prop
  // should render React Router's <Link> component.

  return _react2.default.createElement(
    'a',
    _extends({ className: linkClassName, target: target, rel: rel }, rest),
    props.children
  );
};

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;

exports.default = Link;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classNames = __webpack_require__(2);

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  className: _propTypes2.default.string
};

var LoadingDots = function LoadingDots(props) {
  var className = (0, _classNames2.default)('c-LoadingDots', props.className);

  return _react2.default.createElement(
    'div',
    { className: className },
    _react2.default.createElement('div', { className: 'c-LoadingDots__dot c-LoadingDots__dot--one' }),
    _react2.default.createElement('div', { className: 'c-LoadingDots__dot c-LoadingDots__dot--two' }),
    _react2.default.createElement('div', { className: 'c-LoadingDots__dot c-LoadingDots__dot--three' })
  );
};

LoadingDots.propTypes = propTypes;

exports.default = LoadingDots;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Animate = __webpack_require__(4);

var _Animate2 = _interopRequireDefault(_Animate);

var _Card = __webpack_require__(8);

var _Card2 = _interopRequireDefault(_Card);

var _CardBlock = __webpack_require__(9);

var _CardBlock2 = _interopRequireDefault(_CardBlock);

var _CloseButton = __webpack_require__(22);

var _CloseButton2 = _interopRequireDefault(_CloseButton);

var _Overlay = __webpack_require__(12);

var _Overlay2 = _interopRequireDefault(_Overlay);

var _PortalWrapper = __webpack_require__(37);

var _PortalWrapper2 = _interopRequireDefault(_PortalWrapper);

var _Scrollable = __webpack_require__(38);

var _Scrollable2 = _interopRequireDefault(_Scrollable);

var _classNames = __webpack_require__(2);

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  className: _propTypes2.default.string,
  closeIcon: _propTypes2.default.bool,
  isOpen: _propTypes2.default.bool,
  trigger: _propTypes2.default.element.isRequired
};

var defaultProps = {
  closeIcon: true,
  isOpen: false
};

var portalOptions = {
  id: 'Modal',
  timeout: 400
};

var Modal = function Modal(props) {
  var children = props.children,
      closeIcon = props.closeIcon,
      closePortal = props.closePortal,
      portalIsOpen = props.portalIsOpen;


  var className = (0, _classNames2.default)('c-Modal', props.className);

  var closeMarkup = closeIcon ? _react2.default.createElement(
    'div',
    { className: 'c-Modal__close' },
    _react2.default.createElement(_CloseButton2.default, { onClick: closePortal })
  ) : null;

  return _react2.default.createElement(
    'div',
    { className: className },
    _react2.default.createElement(
      'div',
      { className: 'c-Modal__content' },
      _react2.default.createElement(
        _Animate2.default,
        { sequence: 'fadeIn down', 'in': portalIsOpen, wait: 300 },
        _react2.default.createElement(
          _Card2.default,
          { seamless: true },
          closeMarkup,
          _react2.default.createElement(
            _Scrollable2.default,
            { fade: true, rounded: true },
            _react2.default.createElement(
              _CardBlock2.default,
              null,
              children
            )
          )
        )
      )
    ),
    _react2.default.createElement(
      _Animate2.default,
      { sequence: 'fadeIn', 'in': portalIsOpen, wait: 200 },
      _react2.default.createElement(_Overlay2.default, { onClick: closePortal })
    )
  );
};

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

exports.default = (0, _PortalWrapper2.default)(portalOptions)(Modal);

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Portal = __webpack_require__(13);

var _Portal2 = _interopRequireDefault(_Portal);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Animate = __webpack_require__(4);

var _Animate2 = _interopRequireDefault(_Animate);

var _KeypressListener = __webpack_require__(33);

var _KeypressListener2 = _interopRequireDefault(_KeypressListener);

var _Keys = __webpack_require__(41);

var _Keys2 = _interopRequireDefault(_Keys);

var _id = __webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultOptions = {
  id: 'PortalWrapper'
};

var PortalWrapper = function PortalWrapper() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultOptions;
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

      /* istanbul ignore next */


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
            { animateOnMount: false, 'in': isOpen, unmountOnExit: true, wait: 300 },
            _react2.default.createElement(ComposedComponent, _extends({
              openPortal: openPortal,
              closePortal: closePortal,
              portalIsOpen: isOpen
            }, this.props))
          );

          var triggerMarkup = trigger ? _react2.default.cloneElement(trigger, {
            onClick: openPortal
          }) : null;

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

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classNames = __webpack_require__(2);

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  className: _propTypes2.default.string,
  fade: _propTypes2.default.bool,
  rounded: _propTypes2.default.bool
};

var Scrollable = function Scrollable(props) {
  var children = props.children,
      fade = props.fade,
      rounded = props.rounded;


  var className = (0, _classNames2.default)('c-Scrollable', fade && 'has-fade', rounded && 'is-rounded', props.className);

  var fadeMarkup = fade ? _react2.default.createElement('div', { className: 'c-Scrollable__fade' }) : null;

  return _react2.default.createElement(
    'div',
    { className: className },
    fadeMarkup,
    _react2.default.createElement(
      'div',
      { className: 'c-Scrollable__content' },
      children
    )
  );
};

Scrollable.propTypes = propTypes;

exports.default = Scrollable;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Backdrop = __webpack_require__(11);

var _Backdrop2 = _interopRequireDefault(_Backdrop);

var _HelpText = __webpack_require__(5);

var _HelpText2 = _interopRequireDefault(_HelpText);

var _Label = __webpack_require__(6);

var _Label2 = _interopRequireDefault(_Label);

var _classNames = __webpack_require__(2);

var _classNames2 = _interopRequireDefault(_classNames);

var _other = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var optionType = _propTypes2.default.oneOfType([_propTypes2.default.shape({
  disabled: _propTypes2.default.bool,
  label: _propTypes2.default.string,
  value: _propTypes2.default.string
}), _propTypes2.default.string]);

var optionsType = _propTypes2.default.arrayOf(optionType);

var groupType = _propTypes2.default.shape({
  label: _propTypes2.default.string,
  value: optionsType
});

var propTypes = {
  autoFocus: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  helpText: _propTypes2.default.string,
  id: _propTypes2.default.string,
  label: _propTypes2.default.string,
  name: _propTypes2.default.string,
  options: _propTypes2.default.oneOfType([groupType, optionType, optionsType, _propTypes2.default.array, _propTypes2.default.string]),
  onBlur: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  placeholder: _propTypes2.default.string,
  prefix: _propTypes2.default.string,
  size: _propTypes2.default.string,
  state: _propTypes2.default.string,
  value: _propTypes2.default.string
};
var defaultProps = {
  autoFocus: false,
  disabled: false,
  onBlur: _other.noop,
  onChange: _other.noop,
  onFocus: _other.noop,
  options: [],
  value: ''
};

var PLACEHOLDER_VALUE = '__placeholder__';

var Select = function (_Component) {
  _inherits(Select, _Component);

  function Select(props) {
    _classCallCheck(this, Select);

    var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this));

    _this.state = {
      placeholder: props.placeholder,
      value: props.value
    };
    return _this;
  }

  _createClass(Select, [{
    key: 'handleOnChange',
    value: function handleOnChange(e) {
      var value = e.currentTarget.value;
      this.props.onChange(value);

      this.setState({
        placeholder: false,
        value: value
      });
    }
  }, {
    key: 'hasPlaceholder',
    value: function hasPlaceholder() {
      return this.state.value === '' && this.state.placeholder;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          disabled = _props.disabled,
          helpText = _props.helpText,
          id = _props.id,
          label = _props.label,
          onChange = _props.onChange,
          options = _props.options,
          placeholder = _props.placeholder,
          prefix = _props.prefix,
          seamless = _props.seamless,
          size = _props.size,
          state = _props.state,
          success = _props.success,
          value = _props.value,
          rest = _objectWithoutProperties(_props, ['className', 'disabled', 'helpText', 'id', 'label', 'onChange', 'options', 'placeholder', 'prefix', 'seamless', 'size', 'state', 'success', 'value']);

      var hasPlaceholder = this.hasPlaceholder();

      var selectClassName = (0, _classNames2.default)('c-Select', disabled && 'is-disabled', hasPlaceholder && 'has-placeholder', seamless && 'is-seamless', state && 'is-' + state, className);

      var fieldClassName = (0, _classNames2.default)('c-InputField', size && 'is-' + size);

      var renderOptions = function renderOptions(option) {
        // HTML <optgroup> only allows for single level nesting
        var hasOptions = option.hasOwnProperty('value') && Array.isArray(option.value);
        // Group
        if (hasOptions) {
          var _label = option.label;
          // Recursion!
          return _react2.default.createElement(
            'optgroup',
            { label: _label, key: _label },
            option.value.map(renderOptions)
          );
        }
        // Option
        if (typeof option === 'string') {
          return _react2.default.createElement(
            'option',
            { key: option, value: option },
            option
          );
        } else {
          return _react2.default.createElement(
            'option',
            {
              key: option.value,
              value: option.value,
              disabled: option.disabled
            },
            option.label
          );
        }
      };

      var optionsMarkup = Array.isArray(options) ? options.map(renderOptions) : renderOptions(options);

      var placeholderMarkup = hasPlaceholder ? _react2.default.createElement('option', {
        label: this.state.placeholder,
        value: PLACEHOLDER_VALUE,
        disabled: true,
        hidden: true
      }) : null;

      var labelMarkup = label ? _react2.default.createElement(
        _Label2.default,
        { 'for': id },
        label
      ) : null;

      var prefixMarkup = prefix ? _react2.default.createElement(
        'div',
        { className: 'c-Select__item c-Select__prefix' },
        prefix
      ) : null;

      var helpTextMarkup = helpText ? _react2.default.createElement(
        _HelpText2.default,
        { state: state },
        helpText
      ) : null;

      var selectedValue = hasPlaceholder ? PLACEHOLDER_VALUE : this.state.value;

      return _react2.default.createElement(
        'div',
        { className: 'c-InputWrapper' },
        labelMarkup,
        _react2.default.createElement(
          'div',
          { className: selectClassName },
          prefixMarkup,
          _react2.default.createElement(
            'select',
            _extends({
              className: fieldClassName,
              disabled: disabled,
              id: id,
              onChange: function onChange(e) {
                return _this2.handleOnChange(e);
              },
              value: selectedValue
            }, rest),
            placeholderMarkup,
            optionsMarkup
          ),
          _react2.default.createElement('div', { className: 'c-SelectIcon' }),
          _react2.default.createElement(_Backdrop2.default, { disabled: disabled, state: state })
        ),
        helpTextMarkup
      );
    }
  }]);

  return Select;
}(_react.PureComponent);

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

exports.default = Select;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Animate = __webpack_require__(4);

Object.defineProperty(exports, 'Animate', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Animate).default;
  }
});

var _Avatar = __webpack_require__(19);

Object.defineProperty(exports, 'Avatar', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Avatar).default;
  }
});

var _Badge = __webpack_require__(20);

Object.defineProperty(exports, 'Badge', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Badge).default;
  }
});

var _Button = __webpack_require__(21);

Object.defineProperty(exports, 'Button', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Button).default;
  }
});

var _Card = __webpack_require__(8);

Object.defineProperty(exports, 'Card', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Card).default;
  }
});

var _CardBlock = __webpack_require__(9);

Object.defineProperty(exports, 'CardBlock', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_CardBlock).default;
  }
});

var _Heading = __webpack_require__(28);

Object.defineProperty(exports, 'Heading', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Heading).default;
  }
});

var _Flexy = __webpack_require__(27);

Object.defineProperty(exports, 'Flexy', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Flexy).default;
  }
});

var _Icon = __webpack_require__(10);

Object.defineProperty(exports, 'Icon', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Icon).default;
  }
});

var _Image = __webpack_require__(30);

Object.defineProperty(exports, 'Image', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Image).default;
  }
});

var _Modal = __webpack_require__(36);

Object.defineProperty(exports, 'Modal', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Modal).default;
  }
});

var _Input = __webpack_require__(32);

Object.defineProperty(exports, 'Input', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Input).default;
  }
});

var _Label = __webpack_require__(6);

Object.defineProperty(exports, 'Label', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Label).default;
  }
});

var _Link = __webpack_require__(34);

Object.defineProperty(exports, 'Link', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Link).default;
  }
});

var _LoadingDots = __webpack_require__(35);

Object.defineProperty(exports, 'LoadingDots', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_LoadingDots).default;
  }
});

var _Overlay = __webpack_require__(12);

Object.defineProperty(exports, 'Overlay', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Overlay).default;
  }
});

var _Portal = __webpack_require__(13);

Object.defineProperty(exports, 'Portal', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Portal).default;
  }
});

var _Select = __webpack_require__(39);

Object.defineProperty(exports, 'Select', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Select).default;
  }
});

var _Text = __webpack_require__(14);

Object.defineProperty(exports, 'Text', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Text).default;
  }
});

var _VisuallyHidden = __webpack_require__(7);

Object.defineProperty(exports, 'VisuallyHidden', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_VisuallyHidden).default;
  }
});

var _HelpText = __webpack_require__(5);

Object.defineProperty(exports, 'HelpText', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_HelpText).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// See:
// https://github.com/Shopify/polaris/blob/master/src/types.ts

exports.default = {
  BACKSPACE: 8,
  TAB: 9,
  ENTER: 13,
  SHIFT: 16,
  CTRL: 17,
  ALT: 18,
  PAUSE: 19,
  CAPS_LOCK: 20,
  ESCAPE: 27,
  SPACE: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  LEFT_ARROW: 37,
  UP_ARROW: 38,
  RIGHT_ARROW: 39,
  DOWN_ARROW: 40,
  INSERT: 45,
  DELETE: 46,
  KEY_0: 48,
  KEY_1: 49,
  KEY_2: 50,
  KEY_3: 51,
  KEY_4: 52,
  KEY_5: 53,
  KEY_6: 54,
  KEY_7: 55,
  KEY_8: 56,
  KEY_9: 57,
  KEY_A: 65,
  KEY_B: 66,
  KEY_C: 67,
  KEY_D: 68,
  KEY_E: 69,
  KEY_F: 70,
  KEY_G: 71,
  KEY_H: 72,
  KEY_I: 73,
  KEY_J: 74,
  KEY_K: 75,
  KEY_L: 76,
  KEY_M: 77,
  KEY_N: 78,
  KEY_O: 79,
  KEY_P: 80,
  KEY_Q: 81,
  KEY_R: 82,
  KEY_S: 83,
  KEY_T: 84,
  KEY_U: 85,
  KEY_V: 86,
  KEY_W: 87,
  KEY_X: 88,
  KEY_Y: 89,
  KEY_Z: 90,
  LEFT_META: 91,
  RIGHT_META: 92,
  SELECT: 93,
  NUMPAD_0: 96,
  NUMPAD_1: 97,
  NUMPAD_2: 98,
  NUMPAD_3: 99,
  NUMPAD_4: 100,
  NUMPAD_5: 101,
  NUMPAD_6: 102,
  NUMPAD_7: 103,
  NUMPAD_8: 104,
  NUMPAD_9: 105,
  MULTIPLY: 106,
  ADD: 107,
  SUBTRACT: 109,
  DECIMAL: 110,
  DIVIDE: 111,
  F1: 112,
  F2: 113,
  F3: 114,
  F4: 115,
  F5: 116,
  F6: 117,
  F7: 118,
  F8: 119,
  F9: 120,
  F10: 121,
  F11: 122,
  F12: 123,
  NUM_LOCK: 144,
  SCROLL_LOCK: 145,
  SEMICOLON: 186,
  EQUALS: 187,
  COMMA: 188,
  DASH: 189,
  PERIOD: 190,
  FORWARD_SLASH: 191,
  GRAVE_ACCENT: 192,
  OPEN_BRACKET: 219,
  BACK_SLASH: 220,
  CLOSE_BRACKET: 221,
  SINGLE_QUOTE: 222
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var nameToInitials = exports.nameToInitials = function nameToInitials() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (!name || !name.length) return '';

  var words = name.split(' ').map(function (w) {
    return w[0];
  }).map(function (w) {
    return w.toUpperCase();
  });

  return words.length === 1 ? words[0] : words[0] + words[words.length - 1];
};

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><title>Alert</title><path d=\"M10 3a2.2 2.2 0 0 0-2.005 1.24L3.24 13.753c-.35.7-.313 1.516.098 2.183a2.227 2.227 0 0 0 1.907 1.063h9.509c.783 0 1.496-.397 1.908-1.063a2.232 2.232 0 0 0 .098-2.183L12.005 4.24A2.202 2.202 0 0 0 10 3m4.755 16H5.246c-1.48 0-2.83-.752-3.609-2.013a4.218 4.218 0 0 1-.185-4.129l4.753-9.512A4.217 4.217 0 0 1 9.998 1H10a4.22 4.22 0 0 1 3.794 2.346l4.755 9.512a4.216 4.216 0 0 1-.186 4.128A4.214 4.214 0 0 1 14.753 19M10 12.002a1 1 0 0 1-1-1V7.003a1 1 0 1 1 2 0V11a1 1 0 0 1-1 1.001m.006 2.996a1.004 1.004 0 0 1-1.005-1c0-.553.443-1 .995-1h.01a1 1 0 1 1 0 2\" fill=\"#C1CBD4\" fill-rule=\"evenodd\"/></svg>\n"

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><title>Arrow Right</title><path d=\"M12.737 11l-2.792 2.577a.788.788 0 0 0 0 1.179.956.956 0 0 0 1.277 0l4.513-4.167a.788.788 0 0 0 0-1.178l-4.513-4.167A.94.94 0 0 0 10.583 5a.94.94 0 0 0-.638.244.788.788 0 0 0 0 1.178L12.737 9H4v2h8.737z\" fill=\"#C1CBD4\" fill-rule=\"evenodd\"/></svg>"

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><title>Attachment</title><path d=\"M16.127 4.971a3.042 3.042 0 0 0-4.224 0L6.977 9.776a.953.953 0 0 0 0 1.373 1.014 1.014 0 0 0 1.407 0l4.927-4.805a1.015 1.015 0 0 1 1.408 0 .955.955 0 0 1 0 1.372l-5.63 5.492a3.043 3.043 0 0 1-4.223 0 2.857 2.857 0 0 1 0-4.119l3.518-3.432a.955.955 0 0 0 0-1.372c-.389-.38-1.019-.38-1.407 0l-3.52 3.431A4.76 4.76 0 0 0 2 11.15c0 1.297.517 2.515 1.457 3.432A5.026 5.026 0 0 0 6.977 16a5.025 5.025 0 0 0 3.519-1.42l5.63-5.491a2.864 2.864 0 0 0 0-4.118\" fill=\"#C1CBD4\" fill-rule=\"evenodd\"/></svg>"

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><title>Chat Active</title><path d=\"M16.003 10.006a3 3 0 0 1-2.993 2.997h-.007a.997.997 0 0 0-.707.293l-2.294 2.293-2.292-2.291a.997.997 0 0 0-.707-.293h-.007c-.8 0-1.551-.311-2.117-.876A2.978 2.978 0 0 1 4 10.008v-3.01a3 3 0 0 1 2.995-2.996L13.005 4h.001c.8 0 1.553.311 2.119.877.566.566.878 1.318.878 2.119v3.01zM13.006 2h-.002l-6.009.002A5.002 5.002 0 0 0 2 6.998v3.01c0 1.336.521 2.592 1.466 3.536a4.962 4.962 0 0 0 3.105 1.443l2.724 2.724a.997.997 0 0 0 1.414 0l2.727-2.726a5.005 5.005 0 0 0 4.567-4.979v-3.01c0-1.335-.52-2.59-1.464-3.533A4.964 4.964 0 0 0 13.006 2zM7.003 9.003a1 1 0 1 0 0 2 1 1 0 0 0 0-2m3 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2m3 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2\" fill=\"#C1CBD4\" fill-rule=\"evenodd\"/></svg>"

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><title>Chat</title><path d=\"M16.003 10.006a3 3 0 0 1-2.993 2.997h-.007a.997.997 0 0 0-.707.293l-2.294 2.293-2.292-2.291a.997.997 0 0 0-.707-.293h-.007c-.8 0-1.551-.311-2.117-.876A2.978 2.978 0 0 1 4 10.008v-3.01a3 3 0 0 1 2.995-2.996L13.005 4h.001c.8 0 1.553.311 2.119.877.566.566.878 1.318.878 2.119v3.01zM13.006 2h-.002l-6.009.002A5.002 5.002 0 0 0 2 6.998v3.01c0 1.336.521 2.592 1.466 3.536a4.962 4.962 0 0 0 3.105 1.443l2.724 2.724a.997.997 0 0 0 1.414 0l2.727-2.726a5.005 5.005 0 0 0 4.567-4.979v-3.01c0-1.335-.52-2.59-1.464-3.533A4.964 4.964 0 0 0 13.006 2z\" fill=\"#C1CBD4\" fill-rule=\"evenodd\"/></svg>"

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><title>Clock Large</title><path d=\"M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm0-2a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm.995-6.304c.042.03.083.066.121.105l1.592 1.458c.39.398.39 1.044 0 1.442a.982.982 0 0 1-1.41 0l-1.593-1.457C9.32 10.849 9 10.58 9 9.856V6.02C9 5.457 9.447 5 9.998 5c.55 0 .997.457.997 1.02v3.676z\" fill=\"#C1CBD4\" fill-rule=\"evenodd\"/></svg>"

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><title>Clock Small</title><path d=\"M10.5 16a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0-1a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zm.5-4.83c.022.017-.02.037 0 .058l.848.813a.596.596 0 0 1 0 .794.49.49 0 0 1-.733 0l-.749-.812c-.2-.217-.366-.366-.366-.765V8.145c0-.31.232-.562.518-.562.286 0 .482.252.482.562v2.025z\" fill=\"#C1CBD4\" fill-rule=\"evenodd\"/></svg>"

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><title>Cross Large</title><path d=\"M10 8.586L5.707 4.293a1 1 0 0 0-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 0 0 1.414 1.414L10 11.414l4.293 4.293a1 1 0 0 0 1.414-1.414L11.414 10l4.293-4.293a1 1 0 1 0-1.414-1.414L10 8.586z\" fill=\"#C1CBD4\" fill-rule=\"evenodd\"/></svg>"

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><title>Cross Medium</title><defs><path d=\"M10.89 9.5l3.822-3.822a.983.983 0 1 0-1.39-1.39L9.5 8.11 5.678 4.288a.983.983 0 1 0-1.39 1.39L8.11 9.5l-3.822 3.822a.983.983 0 1 0 1.39 1.39L9.5 10.89l3.822 3.822a.983.983 0 1 0 1.39-1.39L10.89 9.5z\" id=\"a\"/></defs><use fill=\"#C1CBD4\" xlink:href=\"#a\" fill-rule=\"evenodd\"/></svg>"

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><title>Cross Small</title><path d=\"M10 8.586L7.707 6.293a1 1 0 0 0-1.414 1.414L8.586 10l-2.293 2.293a1 1 0 0 0 1.414 1.414L10 11.414l2.293 2.293a1 1 0 0 0 1.414-1.414L11.414 10l2.293-2.293a1 1 0 1 0-1.414-1.414L10 8.586z\" fill=\"#C1CBD4\" fill-rule=\"evenodd\"/></svg>"

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><title>Document</title><path d=\"M13 6c-.551 0-1-.448-1-1V3.414L14.586 6H13zm2 10c0 .552-.449 1-1 1H6c-.551 0-1-.448-1-1V4c0-.552.449-1 1-1h4v2c0 1.654 1.346 3 3 3h2v8zM11.171 1H6C4.346 1 3 2.346 3 4v12c0 1.654 1.346 3 3 3h8c1.654 0 3-1.346 3-3V6.828c0-.801-.312-1.555-.879-2.121l-2.828-2.828A2.983 2.983 0 0 0 11.171 1z\" fill=\"#C1CBD4\" fill-rule=\"evenodd\"/></svg>"

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><title>Emoji</title><path d=\"M10 17c-3.859 0-7-3.141-7-7s3.141-7 7-7c3.86 0 7 3.141 7 7s-3.14 7-7 7m0-16c-4.962 0-9 4.037-9 9s4.038 9 9 9c4.963 0 9-4.037 9-9s-4.037-9-9-9M7.5 9a1.501 1.501 0 0 0 0-3 1.501 1.501 0 0 0 0 3m5-3A1.501 1.501 0 1 0 14 7.5c0-.826-.673-1.5-1.5-1.5m.804 5.059c-.547-.186-1.146.086-1.339.607C11.666 12.465 10.877 13 10 13s-1.666-.535-1.964-1.334c-.195-.521-.795-.793-1.34-.607-.545.186-.83.758-.635 1.277C6.655 13.93 8.238 15 10 15c1.76 0 3.344-1.07 3.939-2.664.195-.52-.09-1.091-.635-1.277\" fill=\"#C1CBD4\" fill-rule=\"evenodd\"/></svg>"

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><title>Fullscreen</title><path d=\"M13 6a1 1 0 1 1 0-2h2c1.654 0 3 1.346 3 3v8c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3v-2a1 1 0 1 1 2 0v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-2zM9 3a1 1 0 1 1 0 2H6.414l5.293 5.293a.999.999 0 1 1-1.414 1.414L5 6.414V9a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1h5z\" fill=\"#C1CBD4\" fill-rule=\"evenodd\"/></svg>"

/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><title>Help Scout Logo</title><path d=\"M9.105 7c.55-.51.89-1.226.89-2.008A2.76 2.76 0 0 0 9.133 3L4.89 7A2.74 2.74 0 0 0 4 9.008c0 .782.332 1.482.864 1.992l4.241-4zm1.79 6a2.74 2.74 0 0 0-.89 2.008c0 .774.331 1.482.863 1.992l4.242-4c.55-.51.89-1.226.89-2.008S15.668 9.51 15.136 9l-4.241 4zM16 5.041A2.86 2.86 0 0 0 15.136 3L4.89 12.893A2.858 2.858 0 0 0 4 14.959c0 .793.332 1.518.864 2.041L15.11 7.099A2.84 2.84 0 0 0 16 5.04z\" fill=\"#C1CBD4\" fill-rule=\"evenodd\"/></svg>"

/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><title>Image Add</title><path d=\"M19 5a1 1 0 1 1 0 2h-2v2a1 1 0 1 1-2 0V7h-2a1 1 0 1 1 0-2h2V3a1 1 0 1 1 2 0v2h2zm-5 14H3c-1.654 0-3-1.346-3-3V8c0-1.654 1.346-3 3-3h6a1 1 0 1 1 0 2H3c-.552 0-1 .449-1 1v3.586l2.293-2.293a.999.999 0 0 1 1.414 0L9 12.586l1.293-1.293a.999.999 0 0 1 1.414 0L15 14.586v-1.664a1 1 0 1 1 2 0V16c0 1.654-1.346 3-3 3zM2 16c0 .551.448 1 1 1h11a.97.97 0 0 0 .501-.154c-.071-.043-.147-.077-.208-.139L11 13.414l-1.293 1.293a.999.999 0 0 1-1.414 0L5 11.414l-3 3V16z\" fill=\"#C1CBD4\" fill-rule=\"evenodd\"/></svg>"

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><title>Image</title><path d=\"M5 5h10.001A1 1 0 0 1 16 6v5.586l-2.293-2.293a.999.999 0 0 0-1.414 0L11 10.586 7.707 7.293a.999.999 0 0 0-1.414 0L4 9.586V6c0-.551.448-1 1-1zm10 10H5c-.552 0-1-.449-1-1v-1.586l3-3 3.293 3.293a.999.999 0 0 0 1.414 0L13 11.414l2.931 2.93A.995.995 0 0 1 15 15zM2 14c0 1.654 1.346 3 3 3h10c1.654 0 3-1.346 3-3V6c0-1.654-1.346-3-2.999-3H5C3.346 3 2 4.346 2 6v8z\" fill=\"#C1CBD4\" fill-rule=\"evenodd\"/></svg>"

/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><title>Link</title><path d=\"M5.587 11.6a1.963 1.963 0 0 0-.44.815c-.101.42-.06 1.075.222 1.544.584.968 1.859 1.29 2.847.72l2.685-1.555a2.02 2.02 0 0 0 .276-3.321c-.44-.361-.5-1.004-.133-1.437a1.056 1.056 0 0 1 1.465-.13c.363.297.67.653.914 1.058 1.166 1.936.508 4.442-1.465 5.586l-2.686 1.555A4.198 4.198 0 0 1 7.167 17c-1.424 0-2.813-.716-3.588-2.003a3.983 3.983 0 0 1-.446-3.09c.278-1.057.725-1.576 1.397-2.065C4.98 9.514 5.63 9.47 6 10c.312.667 0 1.064-.413 1.6zm9.676-2.997c.975-.57.833-1.594.257-2.563a2.06 2.06 0 0 0-2.809-.718l-2.65 1.554c-.47.278-.806.72-.943 1.247a2.019 2.019 0 0 0 .22 1.546c.12.202.273.38.451.53.435.36.493 1.003.13 1.435a1.024 1.024 0 0 1-1.445.128 4.066 4.066 0 0 1-.902-1.057 4.03 4.03 0 0 1-.44-3.09A4.052 4.052 0 0 1 9.019 5.12l2.65-1.555c1.947-1.144 4.468-.5 5.619 1.438 1.15 1.937.966 4.212-.982 5.356a1.037 1.037 0 0 1-1.41-.36 1.018 1.018 0 0 1 .367-1.397z\" fill=\"#C1CBD4\" fill-rule=\"evenodd\"/></svg>"

/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><title>Meatball</title><path d=\"M4 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm6 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm6 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z\" fill=\"#C1CBD4\" fill-rule=\"evenodd\"/></svg>"

/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><title>Search</title><path d=\"M4 8.5C4 6.019 6.019 4 8.5 4S13 6.019 13 8.5 10.981 13 8.5 13A4.505 4.505 0 0 1 4 8.5m13.707 7.793l-3.965-3.966A6.456 6.456 0 0 0 15 8.5C15 4.916 12.084 2 8.5 2A6.508 6.508 0 0 0 2 8.5C2 12.084 4.916 15 8.5 15a6.455 6.455 0 0 0 3.828-1.259l3.965 3.966a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414\" fill=\"#C1CBD4\" fill-rule=\"evenodd\"/></svg>"

/***/ }),
/* 62 */
/***/ (function(module, exports) {

module.exports = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><title>Star</title><path d=\"M12.83 6.76h.01-.01zm1.506 5.442zm-8.67.002h.002-.002zM5.41 9.016l1.635 1.65c.404.404.588.994.491 1.575l-.392 2.36 2.086-1.134a1.6 1.6 0 0 1 1.544.001l2.084 1.134-.392-2.363c-.095-.583.09-1.171.494-1.575l1.633-1.648-2.284-.344a1.685 1.685 0 0 1-1.263-.956l-1.044-2.19-1.045 2.19a1.686 1.686 0 0 1-1.263.956l-2.284.344zM13.292 17c-.264 0-.528-.066-.774-.2L10 15.432l-2.518 1.37a1.602 1.602 0 0 1-1.774-.153 1.797 1.797 0 0 1-.65-1.715l.475-2.865-2.016-2.033A1.81 1.81 0 0 1 3.08 8.23c.196-.652.72-1.116 1.362-1.212l2.807-.423L8.5 3.972c.287-.6.862-.972 1.501-.972.638 0 1.213.372 1.5.971v.001l1.251 2.624 2.807.423c.642.095 1.165.558 1.362 1.21a1.815 1.815 0 0 1-.437 1.806l-2.016 2.033.475 2.865c.11.66-.14 1.317-.65 1.716a1.623 1.623 0 0 1-1 .35z\" fill=\"#C1CBD4\" fill-rule=\"evenodd\"/></svg>"

/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><title>Tick Large</title><path d=\"M15.008 4.358L7.667 12.05 4.992 9.247a1.128 1.128 0 0 0-1.65 0 1.262 1.262 0 0 0 0 1.728l3.5 3.667c.227.238.526.358.825.358.298 0 .597-.12.825-.358l8.166-8.555a1.262 1.262 0 0 0 0-1.729 1.128 1.128 0 0 0-1.65 0z\" fill=\"#C1CBD4\" fill-rule=\"evenodd\"/></svg>"

/***/ }),
/* 64 */
/***/ (function(module, exports) {

module.exports = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><title>Tick Small</title><path d=\"M8 14a.997.997 0 0 1-.707-.293l-2-2a.999.999 0 1 1 1.414-1.414L8 11.586l4.293-4.293a.999.999 0 1 1 1.414 1.414l-5 5A.997.997 0 0 1 8 14\" fill=\"#C1CBD4\" fill-rule=\"evenodd\"/></svg>"

/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><title>Video</title><path d=\"M5 6c-.552 0-1 .449-1 1v7c0 .551.448 1 1 1h10c.552 0 1-.449 1-1V7c0-.551-.448-1-1-1H5zm10 11H5c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10c1.654 0 3 1.346 3 3v7c0 1.654-1.346 3-3 3zM8 8l5 2.5L8 13V8z\" fill=\"#C1CBD4\" fill-rule=\"evenodd\"/></svg>"

/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports = require("object-assign");

/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports = require("promise/lib/es6-extensions.js");

/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports = require("promise/lib/rejection-tracking");

/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = require("react-transition-group/Transition");

/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = require("whatwg-fetch");

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(17);
module.exports = __webpack_require__(18);


/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map