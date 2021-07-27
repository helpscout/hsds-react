import React from 'react'
import PropTypes from 'prop-types'
import CopyButton from '../CopyButton'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'
import { copyToClipboard, selectText } from '../../utilities/clipboard'
import { noop } from '../../utilities/other'
import { CopyInputUI } from './CopyInput.css'

class CopyInput extends React.PureComponent {
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
    this.props.onCopy(this.getInputValue())
  }

  setNodeRef = node => {
    this.inputNode = node
    this.props.innerRef(node)
  }

  render() {
    const { className, buttonLabel, ...rest } = this.props
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
            isLast
            size="lg"
            style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            tabIndex={'-1'}
            innerRef={node => (this.copyButtonNode = node)}
            icon={buttonLabel ? null : 'copy-small'}
            label={buttonLabel}
          />
        }
      />
    )
  }
}

CopyInput.defaultProps = {
  buttonLabel: null,
  copyToClipboard: true,
  'data-cy': 'CopyInput',
  innerRef: noop,
  onCopy: noop,
  readOnly: true,
  value: '',
}

CopyInput.propTypes = {
  /** Button label to use in place of copy icon (default is no label) */
  buttonLabel: PropTypes.string,
  /** Enables copying to clipboard. */
  copyToClipboard: PropTypes.bool,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Retrieves the `input` DOM node. */
  innerRef: PropTypes.func,
  /** Callback function when the copy button is clicked. */
  onCopy: PropTypes.func,
  /** Whether the Input is read only. */
  readOnly: PropTypes.bool,
  /** The value to be displayed within the Input. */
  value: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default CopyInput
