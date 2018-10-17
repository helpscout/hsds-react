// @flow
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Highlight from '../Highlight'
import classNames from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { noop } from '../../utilities/other'
import { copyToClipboard, selectText } from '../../utilities/clipboard'
import { COMPONENT_KEY } from './utils'
import { CopyButtonUI, CopyCodeUI, WrapperUI } from './styles/CopyCode.css.js'
import Keys from '../../constants/Keys'

type Props = {
  autoFocus: boolean,
  className?: string,
  code: string,
  copyToClipboard: boolean,
  innerRef: (node: HTMLElement) => void,
  language?: string,
  onCopy: (code: string) => void,
}

class CopyCode extends Component<Props> {
  static defaultProps = {
    autoFocus: true,
    code: '',
    copyToClipboard: true,
    innerRef: noop,
    onCopy: noop,
  }
  codeNode: HTMLElement

  componentDidMount() {
    /* istanbul ignore else */
    if (this.props.autoFocus) {
      this.selectText()
    }
  }

  handleOnKeyDown = (event: SyntheticKeyboardEvent<HTMLElement>) => {
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

  selectText = () => {
    this.codeNode && selectText(this.codeNode)
  }

  preventEventDefault = (
    event: SyntheticKeyboardEvent<HTMLElement> | Event
  ) => {
    event && event.preventDefault()
    return false
  }

  setNodeRef = (node: HTMLElement) => {
    this.codeNode = node
    this.props.innerRef(node)
  }

  getCodeMarkup = () => {
    const { code, language } = this.props

    return language ? (
      <Highlight language={language}>{code}</Highlight>
    ) : (
      <pre>
        <code>{code}</code>
      </pre>
    )
  }

  render() {
    const { className, code, language, ...rest } = this.props
    const componentClassName = classNames('c-CopyCode', className)

    return (
      <WrapperUI className={componentClassName}>
        <CopyCodeUI
          {...getValidProps(rest)}
          contentEditable
          onCut={this.preventEventDefault}
          onPaste={this.preventEventDefault}
          onKeyDown={this.handleOnKeyDown}
          innerRef={this.setNodeRef}
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

namespaceComponent(COMPONENT_KEY)(CopyCode)

export default CopyCode
