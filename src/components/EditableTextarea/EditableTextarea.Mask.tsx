import * as React from 'react'

import { MaskValueUI } from '../EditableField/styles/EditableField.Mask.css'
import { ComponentUI } from '../EditableField/styles/EditableField.css'

import {
  MASK_CLASSNAMES,
  STATES_CLASSNAMES,
} from '../EditableField/EditableField.utils'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'

import { MaskProps } from './EditableTextarea.types'

export class EditableTextareaMask extends React.Component<MaskProps> {
  static defaultProps = {
    maskTabIndex: null,
    type: 'textarea',
    onValueKeyDown: noop,
  }

  valueRef: HTMLSpanElement

  setValueNode = node => {
    this.valueRef = node
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.maskTabIndex !== this.props.maskTabIndex) {
      return true
    }

    if (nextProps.value !== this.props.value) {
      return true
    }

    return false
  }

  /* istanbul ignore next */
  componentDidUpdate(prevProps) {
    const { id, maskTabIndex } = this.props
    const valueNode = this.valueRef

    if (prevProps.maskTabIndex !== maskTabIndex && maskTabIndex === id) {
      valueNode.setAttribute('tabindex', '0')
      valueNode.focus()
    } else if (
      prevProps.maskTabIndex === id &&
      (maskTabIndex == null || maskTabIndex === prevProps.maskTabIndex)
    ) {
      valueNode && valueNode.removeAttribute('tabindex')
      valueNode.blur()
    }
  }

  /* istanbul ignore next */
  handleValueKeyDown = event => {
    const { id, onValueKeyDown } = this.props

    onValueKeyDown({ event, id })
  }

  /* istanbul ignore next */
  handleValueBlur = () => {
    const valueNode = this.valueRef
    valueNode && valueNode.removeAttribute('tabindex')
  }

  render() {
    const { value, placeholder } = this.props

    return (
      <ComponentUI className={classNames(MASK_CLASSNAMES.component)}>
        <MaskValueUI
          className={classNames(
            MASK_CLASSNAMES.value,
            !value && STATES_CLASSNAMES.withPlaceholder
          )}
          innerRef={this.setValueNode}
          onBlur={this.handleValueBlur}
          onKeyDown={this.handleValueKeyDown}
        >
          <span className={STATES_CLASSNAMES.isPlaceholder}>{placeholder}</span>
        </MaskValueUI>
      </ComponentUI>
    )
  }
}
