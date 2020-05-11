import React from 'react'
import PropTypes from 'prop-types'
import Flexy from '../Flexy'
import IconButton from '../IconButton'
import Tooltip from '../Tooltip'
import Group from './ConditionField.Group'
import Or from './ConditionField.Or'
import Static from './ConditionField.Static'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { FieldCloseWrapperUI } from './ConditionField.css'

export class ConditionField extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    innerRef: PropTypes.func,
    closeIcon: PropTypes.string,
    isWithOr: PropTypes.bool,
    isWithRemove: PropTypes.bool,
    onRemove: PropTypes.func,
    removeTitle: PropTypes.string,
    tooltipDelay: PropTypes.number,
    tooltipDuration: PropTypes.number,
  }

  static className = 'c-ConditionField'
  static defaultProps = {
    closeIcon: 'collapse',
    innerRef: noop,
    isWithOr: false,
    isWithRemove: true,
    onRemove: noop,
    removeTitle: 'Remove',
    tooltipDelay: 800,
    tooltipDuration: 60,
  }

  static Static = Static
  static Group = Group
  static Block = Flexy.Block
  static Item = Flexy.Item

  getClassName() {
    const { className } = this.props
    return classNames(ConditionField.className, className)
  }

  renderOperator() {
    const { isWithOr } = this.props
    if (!isWithOr) return null

    return <Or />
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
          {...rest}
          innerRef={innerRef}
          className={this.getClassName()}
          data-cy="ConditionField"
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

export default ConditionField
