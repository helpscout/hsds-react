import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import Text from '../Text'
import { classNames } from '../../utilities/classNames'
import { COMPONENT_KEY } from './Condition.utils'
import { OperatorWrapperUI, OperatorUI } from './styles/Condition.css'

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
    <OperatorWrapperUI className="c-ConditionOperatorWrapper">
      <OperatorUI {...rest} className={componentClassName}>
        <Text block lineHeightReset size="11">
          {label}
        </Text>
      </OperatorUI>
    </OperatorWrapperUI>
  )
}

Operator.className = 'c-ConditionOperator'

Operator.defaultProps = {
  isBorderless: true,
  type: 'or',
}

const PropConnectedComponent = propConnect(COMPONENT_KEY.Operator)(Operator)

export default PropConnectedComponent
