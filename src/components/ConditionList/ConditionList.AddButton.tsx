import * as React from 'react'
import Condition from '../Condition'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { ConditionListAddButtonProps } from './ConditionList.types'
import { AddButtonWrapperUI } from './styles/ConditionList.css'

export class AddButton extends React.PureComponent<
  ConditionListAddButtonProps
> {
  static defaultProps = {
    innerRef: noop,
    onClick: noop,
    scrollDuration: 300,
    scrollOffset: 200,
  }

  static className = 'c-ConditionListAddButton'

  node: HTMLDivElement

  getClassName() {
    const { className } = this.props
    return classNames(AddButton.className, className)
  }

  render() {
    const { className, ...rest } = this.props

    return (
      <AddButtonWrapperUI data-cy="ConditionListAddButtonWrapper">
        <Condition.AddButton
          {...rest}
          className={this.getClassName()}
          type="and"
          data-cy="ConditionListAddButton"
        />
      </AddButtonWrapperUI>
    )
  }
}

export default AddButton
