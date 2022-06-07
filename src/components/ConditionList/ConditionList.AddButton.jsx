import React from 'react'
import PropTypes from 'prop-types'
import { getValidProps } from '@hsds/utils-react'
import Condition from '../Condition'
import classNames from 'classnames'
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

function noop() {}

ConditionListAddButton.defaultProps = {
  'data-cy': 'ConditionListAddButton',
  innerRef: noop,
  onClick: noop,
  scrollDuration: 300,
  scrollOffset: 200,
}

ConditionListAddButton.propTypes = {
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Retrieve the inner DOM node. */
  innerRef: PropTypes.func,
  /** Callback when clicked */
  onClick: PropTypes.func,
  /** Time (ms) it takes to scroll into view. */
  scrollDuration: PropTypes.number,
  /** Amount (px) used to calculate scrolling into view. */
  scrollOffset: PropTypes.number,
}

export default ConditionListAddButton
