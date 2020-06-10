import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Condition from '../Condition'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { AddButtonWrapperUI } from './ConditionList.css'

export class ConditionListAddButton extends React.PureComponent {
  static className = 'c-ConditionListAddButton'

  node

  getClassName() {
    const { className } = this.props
    return classNames(ConditionListAddButton.className, className)
  }

  render() {
    const { className, ...rest } = this.props

    return (
      <AddButtonWrapperUI data-cy="ConditionListAddButtonWrapper">
        <Condition.AddButton
          {...getValidProps(rest)}
          className={this.getClassName()}
          type="and"
        />
      </AddButtonWrapperUI>
    )
  }
}

ConditionListAddButton.propTypes = {
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  innerRef: PropTypes.func,
  onClick: PropTypes.func,
  scrollDuration: PropTypes.number,
  scrollOffset: PropTypes.number,
}

ConditionListAddButton.defaultProps = {
  'data-cy': 'ConditionListAddButton',
  innerRef: noop,
  onClick: noop,
  scrollDuration: 300,
  scrollOffset: 200,
}

export default ConditionListAddButton
