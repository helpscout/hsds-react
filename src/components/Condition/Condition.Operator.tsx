import * as React from 'react'
import Text from '../Text'
import { classNames } from '../../utilities/classNames'
import { ConditionOperatorProps } from './Condition.types'
import { OperatorUI } from './Condition.css'

export const Operator = (props: ConditionOperatorProps) => {
  const { className, isBorderless, type, ...rest } = props
  const label = type.toLowerCase() === 'and' ? 'and' : 'or'

  const componentClassName = classNames(
    Operator.className,
    isBorderless && 'is-borderless',
    `is-${label}`,
    className
  )

  return (
    // @ts-ignore
    <OperatorUI {...rest} className={componentClassName}>
      <Text block lineHeightReset size="11" weight={500}>
        {label}
      </Text>
    </OperatorUI>
  )
}

Operator.className = 'c-ConditionOperator'

Operator.defaultProps = {
  isBorderless: true,
  type: 'or',
}
Operator.displayName = 'ConditionOperator'

export default Operator
