// @flow
import React, { PureComponent as Component } from 'react'
import ControlGroup from '../ControlGroup'
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
  onCopy: (value: string) => void,
  readOnly: boolean,
  value: string,
}

class CopyInput extends Component<Props> {
  static defaultProps = {
    copyToClipboard: true,
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
  }

  render() {
    const { className, ...rest } = this.props
    const componentClassName = classNames('c-CopyInput', className)

    return (
      <ControlGroup className={componentClassName}>
        <ControlGroup.Block>
          <CopyInputUI
            {...getValidProps(rest)}
            inputRef={this.setNodeRef}
            isSubtleReadOnly
          />
        </ControlGroup.Block>
        <ControlGroup.Item>
          <CopyButton onClick={this.handleCopyClick.bind(this)} size="lg" />
        </ControlGroup.Item>
      </ControlGroup>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(CopyInput)

export default CopyInput
