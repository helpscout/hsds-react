import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import Condition from '../Condition'
import { classNames } from '../../utilities/classNames'
import { COMPONENT_KEY } from './ConditionField.utils'
import { AddButtonWrapperUI } from './styles/ConditionField.css'

export const AddButton = props => {
  const { className, ...rest } = props

  const componentClassName = classNames(AddButton.className, className)

  return (
    <AddButtonWrapperUI data-cy="ConditionFieldAddButtonWrapper">
      <Condition.AddButton
        {...rest}
        isBorderless
        className={componentClassName}
        type="or"
      />
    </AddButtonWrapperUI>
  )
}

AddButton.className = 'c-ConditionFieldAddButton'

const PropConnectedComponent = propConnect(COMPONENT_KEY.AddButton)(AddButton)

export default PropConnectedComponent
