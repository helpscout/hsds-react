import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'
import { noop } from '../../utilities/other'
import { copyToClipboard, selectText } from '../../utilities/clipboard'
import {
  CopyButtonUI,
  CopyCodeUI,
  SyntaxHighlight,
  WrapperUI,
} from './CopyCode.css'
import Keys from '../../constants/Keys'
const Prism = require('prismjs')
require('prismjs/components/prism-java')
require('prismjs/components/prism-swift')
require('prismjs/components/prism-c')
require('prismjs/components/prism-objectivec')
require('prismjs/components/prism-markup')

class CopyCode extends React.PureComponent {
  node

  componentDidMount() {
    if (this.props.autoFocus) {
      this.selectText()
    }
  }

  handleOnKeyDown = event => {
    if (event.ctrlKey || event.metaKey) {
      return true
    }

    if (event.keyCode === Keys.TAB) {
      return true
    }

    return this.preventEventDefault(event)
  }

  handleCopyClick = () => {
    this.selectText()
    this.copyToClipboard()
    this.props.onCopy(this.getCodeValue())
  }

  copyToClipboard = () => {
    if (this.props.copyToClipboard) {
      copyToClipboard()
    }
  }

  getCodeValue = () => {
    return this.props.code
  }

  selectText() {
    this.node && selectText(this.node)
  }

  preventEventDefault = event => {
    event && event.preventDefault()
    return false
  }

  setNodeRef = node => {
    this.node = node
    this.props.innerRef(node)
  }

  getCodeMarkup() {
    const { code } = this.props
    const language =
      this.props.language === 'html' ? 'markup' : this.props.language

    function createMarkup() {
      const html = Prism.highlight(code, Prism.languages[language], language)
      return { __html: html }
    }

    return (
      <SyntaxHighlight>
        <div dangerouslySetInnerHTML={createMarkup()} />
      </SyntaxHighlight>
    )
  }

  render() {
    const { buttonSize, className, code, maxWidth, ...rest } = this.props
    const componentClassName = classNames('c-CopyCode', className)

    return (
      <WrapperUI className={componentClassName} maxWidth={maxWidth}>
        <CopyCodeUI
          {...getValidProps(rest)}
          contentEditable
          onCut={this.preventEventDefault}
          onPaste={this.preventEventDefault}
          onKeyDown={this.handleOnKeyDown}
          ref={this.setNodeRef}
          spellCheck={false}
          suppressContentEditableWarning
        >
          {this.getCodeMarkup()}
        </CopyCodeUI>
        <CopyButtonUI
          kind="secondary"
          onClick={this.handleCopyClick}
          size={buttonSize}
        >
          Copy
        </CopyButtonUI>
      </WrapperUI>
    )
  }
}

CopyCode.defaultProps = {
  autoFocus: false,
  buttonSize: 'sm',
  code: '',
  copyToClipboard: true,
  'data-cy': 'CopyCode',
  innerRef: noop,
  language: 'javascript',
  maxWidth: 500,
  onCopy: noop,
}

CopyCode.propTypes = {
  className: PropTypes.string,
  /** Automatically select `code` when component mounts. */
  autoFocus: PropTypes.bool,
  /** Sets the size of the button. Can be one of `"sm"`, `"md"` or `"lg"`.  */
  buttonSize: PropTypes.string,
  /** The code to be displayed within the container. */
  code: PropTypes.string,
  /** Enables copying to clipboard. */
  copyToClipboard: PropTypes.bool,
  /** Retrieves the DOM node. */
  innerRef: PropTypes.func,
  /** Language syntax */
  language: PropTypes.oneOf([
    'c',
    'java',
    'javascript',
    'objectivec',
    'swift',
    'html',
    'markup',
  ]),
  /** Sets the max width of the container. */
  maxWidth: PropTypes.number,
  /** Callback function when the copy button is clicked. */
  onCopy: PropTypes.func,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default CopyCode
