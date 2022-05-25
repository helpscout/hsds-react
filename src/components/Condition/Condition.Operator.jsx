import React from 'react'
import PropTypes from 'prop-types'
import { getValidProps } from '@hsds/utils-react'
import Text from '../Text'
import classNames from 'classnames'
import { OperatorUI } from './Condition.css'

export const Operator = props => {
  const { className, isBorderless, type, ...rest } = props
  const label = type.toLowerCase() === 'and' ? 'and' : 'or'
  const componentClassName = classNames(
    'c-ConditionOperator',
    isBorderless && 'is-borderless',
    `is-${label}`,
    className
  )

  return (
    <OperatorUI {...getValidProps(rest)} className={componentClassName}>
      <Text block lineHeightReset size="11" weight={500}>
        {label}
      </Text>
    </OperatorUI>
  )
}

Operator.defaultProps = {
  'data-cy': 'ConditionOperator',
  isBorderless: true,
  type: 'or',
}

Operator.propTypes = {
  /** The className of the component. */
  className: PropTypes.string,
  /** Retrieve the inner DOM node. */
  innerRef: PropTypes.func,
  /** Renders a white border. */
  isBorderless: PropTypes.bool,
  /** The operator. */
  type: PropTypes.oneOf(['and', 'or']),
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default Operator
