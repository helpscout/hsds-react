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
import { noop } from '../../utilities/other'

import { MaskProps } from './EditableField.types'

export class EditableFieldMask extends React.Component<MaskProps> {
  static defaultProps = {
    disabled: false,
    emphasize: false,
    maskTabIndex: null,
    type: 'text',
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

    if (!equal(nextProps.fieldValue, this.props.fieldValue)) {
      return true
    }

    return false
  }

  /* istanbul ignore next */
  componentDidUpdate(prevProps) {
    const { name, maskTabIndex } = this.props
    const valueNode = this.valueRef

    if (prevProps.maskTabIndex !== maskTabIndex && maskTabIndex === name) {
      valueNode.setAttribute('tabindex', '0')
      valueNode.focus()
    } else if (
      prevProps.maskTabIndex === name &&
      (maskTabIndex == null || maskTabIndex === prevProps.maskTabIndex)
    ) {
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

  render() {
    const {
      actions,
      disabled,
      emphasize,
      fieldValue,
      placeholder,
      type,
      validationInfo,
      valueOptions,
    } = this.props

    return (
      <ComponentUI
        className={classNames(
          MASK_CLASSNAMES.component,
          disabled && STATES_CLASSNAMES.isDisabled,
          validationInfo && STATES_CLASSNAMES.withValidation
        )}
      >
        {valueOptions ? (
          <MaskOptionUI className={MASK_CLASSNAMES.option}>
            <Truncate>{fieldValue.option}</Truncate>
          </MaskOptionUI>
        ) : null}

        <MaskValueUI
          className={classNames(
            MASK_CLASSNAMES.value,
            !fieldValue.value && STATES_CLASSNAMES.withPlaceholder,
            emphasize && STATES_CLASSNAMES.isEmphasized
          )}
          innerRef={this.setValueNode}
          onBlur={this.handleValueBlur}
          onKeyDown={this.handleValueKeyDown}
          numberOfActions={actions ? actions.length : 0}
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
