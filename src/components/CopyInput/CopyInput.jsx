import React from 'react'
import PropTypes from 'prop-types'
import CopyButton from '../CopyButton'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'

import { copyToClipboard, selectText } from '../../utilities/clipboard'
import { noop } from '../../utilities/other'
import { CopyInputUI } from './CopyInput.css'

class CopyInput extends React.PureComponent {
  static propTypes = {
    copyToClipboard: PropTypes.bool,
    className: PropTypes.string,
    innerRef: PropTypes.func,
    onCopy: PropTypes.func,
    readOnly: PropTypes.bool,
    value: PropTypes.string,
  }

  static defaultProps = {
    copyToClipboard: true,
    innerRef: noop,
    onCopy: noop,
    readOnly: true,
    value: '',
  }

  inputNode
  copyButtonNode

  copyToClipboard = () => {
    copyToClipboard()
  }

  getInputValue = () => {
    return this.inputNode ? this.inputNode.value : this.props.value
  }

  selectText = () => {
    this.inputNode && selectText(this.inputNode)
  }

  handleCopyClick = () => {
    this.selectText()
    this.copyToClipboard()
    console.log('handleCopyClick', this.getInputValue())
    this.props.onCopy(this.getInputValue())
  }

  setNodeRef = node => {
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
        onKeyUp={e => {
          if (e.key === 'Enter') {
            e.preventDefault()
            this.copyButtonNode.click()
            return false
          }
        }}
        suffix={
          <CopyButton
            onClick={this.handleCopyClick.bind(this)}
            size="lg"
            isLast
            style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            innerRef={node => (this.copyButtonNode = node)}
          />
        }
      />
    )
  }
}

export default CopyInput
