import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import Text from '../Text'
import { classNames } from '../../utilities/classNames'
import { COMPONENT_KEY } from './Condition.utils'
import { ConditionOperatorProps } from './Condition.types'
import { OperatorUI } from './styles/Condition.css'

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

const PropConnectedComponent = propConnect(COMPONENT_KEY.Operator)(Operator)

export default PropConnectedComponent
