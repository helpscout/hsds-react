import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import Operator from '../Condition/Condition.Operator'
import { classNames } from '../../utilities/classNames'
import { COMPONENT_KEY } from './ConditionList.utils'
import { AndWrapperUI } from './styles/ConditionList.css'

export const And = props => {
  const { className, ...rest } = props

  const componentClassName = classNames(And.className, className)

  return (
    <AndWrapperUI
      {...rest}
      className={componentClassName}
      data-cy="ConditionListAndWrapper"
    >
      <Operator data-cy={props['data-cy']} type="and" isBorderless={false} />
    </AndWrapperUI>
  )
}

And.className = 'c-ConditionListAnd'

const PropConnectedComponent = propConnect(COMPONENT_KEY.And)(And)

export default PropConnectedComponent
