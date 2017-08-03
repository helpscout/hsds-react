'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Animate = require('../Animate');

var _Animate2 = _interopRequireDefault(_Animate);

var _Card = require('../Card');

var _Card2 = _interopRequireDefault(_Card);

var _CardBlock = require('../CardBlock');

var _CardBlock2 = _interopRequireDefault(_CardBlock);

var _CloseButton = require('../CloseButton');

var _CloseButton2 = _interopRequireDefault(_CloseButton);

var _Overlay = require('../Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

var _PortalWrapper = require('../PortalWrapper');

var _PortalWrapper2 = _interopRequireDefault(_PortalWrapper);

var _Scrollable = require('../Scrollable');

var _Scrollable2 = _interopRequireDefault(_Scrollable);

var _classNames = require('../../utilities/classNames');

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