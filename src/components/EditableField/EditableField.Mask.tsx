import * as React from 'react'

import {
  ComponentUI,
  MaskValueUI,
  MaskOptionUI,
} from './styles/EditableField.Mask.css'
import Truncated from './EditableField.Truncated'
import Truncate from '../Truncate'

import { MASK_CLASSNAMES, STATES_CLASSNAMES } from './EditableField.utils'
import { classNames } from '../../utilities/classNames'
import * as equal from 'fast-deep-equal'

export class EditableFieldMask extends React.Component<any> {
  valueRef: HTMLSpanElement

  setValueNode = node => {
    this.valueRef = node
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.maskTabIndex !== this.props.maskTabIndex) {
      return true
    }

    if (!equal(nextProps.fieldValue, this.props.fieldValue)) {
      return true
    }

    return false
  }

  componentDidUpdate(prevProps) {
    const { maskTabIndex } = this.props
    const valueNode = this.valueRef

    if (prevProps.maskTabIndex == null && maskTabIndex === '0') {
      valueNode.setAttribute('tabindex', maskTabIndex)
      valueNode.focus()
    } else if (prevProps.maskTabIndex === '0' && maskTabIndex == null) {
      valueNode && valueNode.removeAttribute('tabindex')
      valueNode.blur()
    }
  }

  /* istanbul ignore next */
  handleValueKeyDown = event => {
    const { name, onValueKeyDown } = this.props

    onValueKeyDown({ event, name })
  }

  /* istanbul ignore next */
  handleValueBlur = () => {
    const valueNode = this.valueRef
    valueNode && valueNode.removeAttribute('tabindex')
  }

  renderOption = () => {
    /* istanbul ignore next */
    const { fieldValue } = this.props

    return (
      <MaskOptionUI className={MASK_CLASSNAMES.option}>
        <Truncate>{fieldValue.option}</Truncate>
      </MaskOptionUI>
    )
  }

  render() {
    const {
      actions,
      emphasize,
      fieldValue,
      placeholder,
      type,
      valueOptions,
    } = this.props

    return (
      <ComponentUI className={MASK_CLASSNAMES.component}>
        {valueOptions ? this.renderOption() : null}

        <MaskValueUI
          className={classNames(
            MASK_CLASSNAMES.value,
            !fieldValue.value && STATES_CLASSNAMES.withPlaceholder,
            emphasize && STATES_CLASSNAMES.isEmphasized
          )}
          innerRef={this.setValueNode}
          onBlur={this.handleValueBlur}
          onKeyDown={this.handleValueKeyDown}
          numberOfActions={actions.length}
        >
          {fieldValue.value ? (
            <Truncated
              string={fieldValue.value}
              splitter={type === 'email' ? '@' : undefined}
            />
          ) : (
            <span className={STATES_CLASSNAMES.isPlaceholder}>
              {placeholder}
            </span>
          )}
        </MaskValueUI>
      </ComponentUI>
    )
  }
}

export default EditableFieldMask
