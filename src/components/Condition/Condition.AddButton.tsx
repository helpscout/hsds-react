import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import Icon from '../Icon'
import { ButtonWrapperUI, ButtonUI } from './styles/Condition.css'
import { classNames } from '../../utilities/classNames'
import { COMPONENT_KEY } from './Condition.utils'

export const AddButton = props => {
  const { className, isBorderless, type, ...rest } = props

  const isAnd = type.toLowerCase() === 'and'

  const align = isAnd ? 'center' : 'left'
  const iconSize = isAnd ? 24 : 20
  const label = isAnd ? 'and' : 'or'
  const size = isAnd ? 'sm' : 'xxs'

  const componentClassName = classNames(
    AddButton.className,
    isBorderless && 'is-borderless',
    `is-${label}`,
    className
  )

  return (
    <ButtonWrapperUI align={align}>
      <ButtonUI
        {...rest}
        className={componentClassName}
        kind="secondaryAlt"
        size={size}
        version={2}
      >
        <Icon name="plus-small" size={iconSize} />
        {label}
      </ButtonUI>
    </ButtonWrapperUI>
  )
}

AddButton.className = 'c-ConditionAddButton'

AddButton.defaultProps = {
  type: 'or',
}

const PropConnectedComponent = propConnect(COMPONENT_KEY.AddButton)(AddButton)

export default PropConnectedComponent
