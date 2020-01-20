import * as React from 'react'
import Operator from './Condition.Operator'
import { classNames } from '../../utilities/classNames'
import { AndWrapperUI } from './styles/Condition.css'

export const And = props => {
  const { className, ...rest } = props

  const componentClassName = classNames(And.className, className)

  return (
    <AndWrapperUI
      {...rest}
      className={componentClassName}
      data-cy="ConditionAndWrapper"
    >
      <Operator data-cy={props['data-cy']} type="and" isBorderless={false} />
    </AndWrapperUI>
  )
}

And.defaultProps = {
  'data-cy': 'ConditionAnd',
}
And.className = 'c-ConditionAnd'
And.displayName = 'ConditionAnd'

export default And
