'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

var _createClass = (function () { function defineProperties (target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor) } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor } }())

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _constants = require('../../utilities/constants')

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

function _classCallCheck (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function') } }

function _possibleConstructorReturn (self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called") } return call && (typeof call === 'object' || typeof call === 'function') ? call : self }

function _inherits (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass) } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass } // See: https://github.com/Shopify/polaris/blob/master/src/components/TextField/Resizer.tsx

var ENTITIES_TO_REPLACE = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '\n': '<br>'
}
var REPLACE_REGEX = /[\n&<>]/g

var propTypes = {
  contents: _propTypes2.default.string,
  currentHeight: _propTypes2.default.number,
  minimumLines: _propTypes2.default.number,
  onResize: _propTypes2.default.func
}
var defaultProps = {
  contents: '',
  currentHeight: null,
  minimumLines: 1,
  onResize: _constants.noop
}

var Resizer = (function (_Component) {
  _inherits(Resizer, _Component)

  function Resizer () {
    _classCallCheck(this, Resizer)

    return _possibleConstructorReturn(this, (Resizer.__proto__ || Object.getPrototypeOf(Resizer)).apply(this, arguments))
  }

  _createClass(Resizer, [{
    key: 'componentDidMount',
    value: function componentDidMount () {
      this.handleOnResize()
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate () {
      this.handleOnResize()
    }
  }, {
    key: 'handleOnResize',
    value: function handleOnResize () {
      var contentHeight = this.contentNode.offsetHeight
      var minimumHeight = this.minimumLinesNode ? this.minimumLinesNode.offsetHeight : 0
      var newHeight = Math.max(contentHeight, minimumHeight)

      var _props = this.props,
        currentHeight = _props.currentHeight,
        onResize = _props.onResize

      if (newHeight !== currentHeight) {
        onResize(newHeight)
      }
    }
  }, {
    key: 'replaceEntity',
    value: function replaceEntity (entity) {
      return ENTITIES_TO_REPLACE[entity] || entity
    }
  }, {
    key: 'getContentsForMinimumLines',
    value: function getContentsForMinimumLines (minimumLines) {
      var content = ''
      for (var line = 0; line < minimumLines; line++) {
        content += '<br>'
      }

      return content
    }
  }, {
    key: 'getFinalContents',
    value: function getFinalContents (contents) {
      return contents ? contents.replace(REPLACE_REGEX, this.replaceEntity) + '<br>' : '<br>'
    }
  }, {
    key: 'render',
    value: function render () {
      var _this2 = this

      var _props2 = this.props,
        contents = _props2.contents,
        minimumLines = _props2.minimumLines

      var minimumLinesMarkup = minimumLines ? _react2.default.createElement('div', {
        ref: function ref (node) {
          return _this2.minimumLinesNode = node
        },
        className: 'c-InputGhost',
        dangerouslySetInnerHTML: {
          __html: this.getContentsForMinimumLines(minimumLines)
        }
      }) : null

      return _react2.default.createElement(
        'div',
        { 'aria-hidden': true, className: 'c-InputResizer' },
        _react2.default.createElement('div', {
          ref: function ref (node) {
            return _this2.contentNode = node
          },
          className: 'c-InputGhost',
          dangerouslySetInnerHTML: { __html: this.getFinalContents(contents) }
        }),
        minimumLinesMarkup
      )
    }
  }])

  return Resizer
}(_react.PureComponent))

exports.default = Resizer
