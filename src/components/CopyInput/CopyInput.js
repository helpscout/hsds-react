// @flow
import React, { PureComponent as Component } from 'react'
import CopyButton from '../CopyButton'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { copyToClipboard, selectText } from '../../utilities/clipboard'
import { noop } from '../../utilities/other'
import { CopyInputUI } from './styles/CopyInput.css.js'
import { COMPONENT_KEY } from './utils'

type InputNode = HTMLInputElement | HTMLTextAreaElement

type Props = {
  copyToClipboard: boolean,
  className?: string,
  innerRef: (node: InputNode) => void,
  onCopy: (value: string) => void,
  readOnly: boolean,
  value: string,
}

class CopyInput extends Component<Props> {
  static defaultProps = {
    copyToClipboard: true,
    innerRef: noop,
    onCopy: noop,
    readOnly: true,
    value: '',
  }
  inputNode: InputNode

  copyToClipboard = () => {
    copyToClipboard()
  }

  getInputValue = () => {
    /* istanbul ignore next */
    return this.inputNode ? this.inputNode.value : this.props.value
  }

  selectText = () => {
    this.inputNode && selectText(this.inputNode)
  }

  handleCopyClick = () => {
    this.selectText()
    this.copyToClipboard()
    this.props.onCopy(this.getInputValue())
  }

  setNodeRef = (node: InputNode) => {
    this.inputNode = node
    this.props.innerRef(node)
  }

  render() {
    const { className, ...rest } = this.props
    const componentClassName = classNames('c-CopyInput', className)

    return (
      <CopyInputUI
        {...getValidProps(rest)}
        className={componentClassName}
        inputRef={this.setNodeRef}
        isSubtleReadOnly
        suffix={
          <CopyButton
            onClick={this.handleCopyClick.bind(this)}
            size="lg"
            isLast
          />
        }
      />
    )
  }
}

namespaceComponent(COMPONENT_KEY)(CopyInput)

export default CopyInput
