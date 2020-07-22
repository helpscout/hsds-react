import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
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
    const { code, language } = this.props

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
          canRenderFocus
          size={buttonSize}
        >
          Copy
        </CopyButtonUI>
      </WrapperUI>
    )
  }
}

CopyCode.propTypes = {
  autoFocus: PropTypes.bool,
  buttonSize: PropTypes.string,
  className: PropTypes.string,
  code: PropTypes.string,
  copyToClipboard: PropTypes.bool,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  innerRef: PropTypes.func,
  language: PropTypes.string,
  maxWidth: PropTypes.number,
  onCopy: PropTypes.func,
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

export default CopyCode
