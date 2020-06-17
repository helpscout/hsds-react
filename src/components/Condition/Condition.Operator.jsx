import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Text from '../Text'
import { classNames } from '../../utilities/classNames'
import { OperatorUI } from './Condition.css'

export const Operator = props => {
  const { className, isBorderless, type, ...rest } = props
  const label = type.toLowerCase() === 'and' ? 'and' : 'or'
  const componentClassName = classNames(
    Operator.className,
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

Operator.className = 'c-ConditionOperator'

Operator.propTypes = {
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  innerRef: PropTypes.func,
  isBorderless: PropTypes.bool,
  type: PropTypes.oneOf(['and', 'or']),
}

Operator.defaultProps = {
  'data-cy': 'ConditionOperator',
  isBorderless: true,
  type: 'or',
}

export default Operator
