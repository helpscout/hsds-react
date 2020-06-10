import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Flexy from '../Flexy'
import IconButton from '../IconButton'
import Tooltip from '../Tooltip'
import ConditionFieldGroup from './ConditionField.Group'
import ConditionFieldOr from './ConditionField.Or'
import ConditionFieldStatic from './ConditionField.Static'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { FieldCloseWrapperUI } from './ConditionField.css'

export class ConditionField extends React.PureComponent {
  static className = 'c-ConditionField'
  static Static = ConditionFieldStatic
  static Group = ConditionFieldGroup
  static Block = Flexy.Block
  static Item = Flexy.Item

  getClassName() {
    const { className } = this.props
    return classNames(ConditionField.className, className)
  }

  renderOperator() {
    const { isWithOr } = this.props
    if (!isWithOr) return null

    return <ConditionFieldOr />
  }

  render() {
    const {
      children,
      closeIcon,
      innerRef,
      isWithRemove,
      onRemove,
      removeTitle,
      tooltipDelay,
      tooltipDuration,
      ...rest
    } = this.props

    return (
      <div data-cy="ConditionFieldWrapper">
        {this.renderOperator()}
        <Flexy
          {...getValidProps(rest)}
          innerRef={innerRef}
          className={this.getClassName()}
        >
          <Flexy.Block data-cy="ConditionFieldContentWrapper">
            <Flexy align="top" gap="md">
              {children}
            </Flexy>
          </Flexy.Block>
          <FieldCloseWrapperUI data-cy="ConditionFieldCloseWrapper">
            <Tooltip
              title={removeTitle}
              animationDelay={tooltipDelay}
              animationDuration={tooltipDuration}
            >
              {isWithRemove ? (
                <IconButton
                  data-cy="ConditionFieldRemoveButton"
                  icon={closeIcon}
                  onClick={onRemove}
                />
              ) : null}
            </Tooltip>
          </FieldCloseWrapperUI>
        </Flexy>
      </div>
    )
  }
}

ConditionField.propTypes = {
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  innerRef: PropTypes.func,
  closeIcon: PropTypes.string,
  isWithOr: PropTypes.bool,
  isWithRemove: PropTypes.bool,
  onRemove: PropTypes.func,
  removeTitle: PropTypes.string,
  tooltipDelay: PropTypes.number,
  tooltipDuration: PropTypes.number,
}

ConditionField.defaultProps = {
  closeIcon: 'collapse',
  'data-cy': 'ConditionField',
  innerRef: noop,
  isWithOr: false,
  isWithRemove: true,
  onRemove: noop,
  removeTitle: 'Remove',
  tooltipDelay: 800,
  tooltipDuration: 60,
}

export default ConditionField
