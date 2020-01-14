import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'

import { noop } from '../../utilities/other'
import { copyToClipboard, selectText } from '../../utilities/clipboard'

import {
  CopyButtonUI,
  CopyCodeUI,
  SyntaxHighlight,
  WrapperUI,
} from './styles/CopyCode.css'
import Keys from '../../constants/Keys'
const Prism = require('prismjs')
require('prismjs/components/prism-java')
require('prismjs/components/prism-swift')
require('prismjs/components/prism-c')
require('prismjs/components/prism-objectivec')

type Props = {
  autoFocus: boolean
  className?: string
  code: string
  copyToClipboard: boolean
  innerRef: (node: HTMLElement) => void
  language: string
  maxWidth: number
  onCopy: (code: string) => void
}

class CopyCode extends React.PureComponent<Props> {
  static defaultProps = {
    autoFocus: false,
    code: '',
    copyToClipboard: true,
    innerRef: noop,
    language: 'javascript',
    maxWidth: 500,
    onCopy: noop,
  }
  node: HTMLElement

  componentDidMount() {
    /* istanbul ignore else */
    if (this.props.autoFocus) {
      this.selectText()
    }
  }

  handleOnKeyDown = (event: KeyboardEvent) => {
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
    /* istanbul ignore else */
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

  preventEventDefault = (event: KeyboardEvent | Event) => {
    event && event.preventDefault()
    return false
  }

  setNodeRef = (node: HTMLElement) => {
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
    const { className, code, maxWidth, ...rest } = this.props
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
        >
          Copy
        </CopyButtonUI>
      </WrapperUI>
    )
  }
}

export default CopyCode
