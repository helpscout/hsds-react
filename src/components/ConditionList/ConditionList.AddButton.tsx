import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import Condition from '../Condition'
import { classNames } from '../../utilities/classNames'
import { COMPONENT_KEY } from './ConditionList.utils'
import { AddButtonWrapperUI } from './styles/ConditionList.css'

export const AddButton = props => {
  const { className, ...rest } = props

  const componentClassName = classNames(AddButton.className, className)

  return (
    <AddButtonWrapperUI data-cy="ConditionListAddButtonWrapper">
      <Condition.AddButton
        {...rest}
        className={componentClassName}
        type="and"
      />
    </AddButtonWrapperUI>
  )
}

AddButton.className = 'c-ConditionListAddButton'

const PropConnectedComponent = propConnect(COMPONENT_KEY.AddButton)(AddButton)

export default PropConnectedComponent
