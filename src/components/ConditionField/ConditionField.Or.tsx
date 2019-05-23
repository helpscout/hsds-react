import * as React from 'react'
import Operator from '../Condition/Condition.Operator'
import { classNames } from '../../utilities/classNames'
import { OrWrapperUI } from './styles/ConditionField.css'

export const Or = props => {
  const { className, ...rest } = props

  const componentClassName = classNames(Or.className, className)

  return (
    <OrWrapperUI
      {...rest}
      className={componentClassName}
      data-cy="ConditionFieldOrWrapper"
    >
      <Operator data-cy={props['data-cy']} type="or" isBorderless={true} />
    </OrWrapperUI>
  )
}

Or.defaultProps = {
  'data-cy': 'ConditionFieldOr',
}
Or.className = 'c-ConditionAnd'

export default Or
