import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Flexy from '../Flexy'
import IconButton from '../IconButton'
import Tooltip from '../Tooltip'
import ConditionFieldGroup from './ConditionField.Group'
import ConditionFieldOr from './ConditionField.Or'
import ConditionFieldStatic from './ConditionField.Static'
import classNames from 'classnames'
import { noop } from '../../utilities/other'
import { FieldCloseWrapperUI } from './ConditionField.css'
import ConditionFieldAnd from './ConditionField.And'

export class ConditionField extends React.PureComponent {
  static Static = ConditionFieldStatic
  static Group = ConditionFieldGroup
  static Block = Flexy.Block
  static Item = Flexy.Item

  getClassName() {
    const { className } = this.props
    return classNames('c-ConditionField', className)
  }

  renderOperator() {
    const { isWithConjunction, conjunction } = this.props
    if (!isWithConjunction) return null

    return conjunction === 'and' ? <ConditionFieldAnd /> : <ConditionFieldOr />
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
          {isWithRemove ? (
            <FieldCloseWrapperUI data-cy="ConditionFieldCloseWrapper">
              <Tooltip
                title={removeTitle}
                animationDelay={tooltipDelay}
                animationDuration={tooltipDuration}
              >
                <IconButton
                  data-cy="ConditionFieldRemoveButton"
                  icon={closeIcon}
                  onClick={onRemove}
                />
              </Tooltip>
            </FieldCloseWrapperUI>
          ) : null}
        </Flexy>
      </div>
    )
  }
}

ConditionField.defaultProps = {
  closeIcon: 'collapse',
  'data-cy': 'ConditionField',
  innerRef: noop,
  isWithConjunction: false,
  conjunction: 'or',
  isWithRemove: true,
  onRemove: noop,
  removeTitle: 'Remove',
  tooltipDelay: 800,
  tooltipDuration: 60,
}

ConditionField.propTypes = {
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** The className of the component. */
  className: PropTypes.string,
  /** The [Icon](../Icon) to render. */
  closeIcon: PropTypes.string,
  /** Retrieve the inner DOM node. */
  innerRef: PropTypes.func,
  /** Whether to show conjunction before Field */
  isWithConjunction: PropTypes.bool,
  /** Current conjunction */
  conjunction: PropTypes.oneOf(['and', 'or']),
  /** Whether to show the remove button or not. */
  isWithRemove: PropTypes.bool,
  /** Callback when the remove IconButton is clicked. */
  onRemove: PropTypes.func,
  /** Title to show in the Tooltip on the remove IconButton. */
  removeTitle: PropTypes.string,
  /** Delay before the Tooltip renders, on hover. */
  tooltipDelay: PropTypes.number,
  /** Animation duration when the Tooltip renders, on hover. */
  tooltipDuration: PropTypes.number,
}

export default ConditionField
