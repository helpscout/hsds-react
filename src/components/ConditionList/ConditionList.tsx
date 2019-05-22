import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../PropProvider/propConnect'
import AddButton from './ConditionList.AddButton'
import And from './ConditionList.And'
import { classNames } from '../../utilities/classNames'
import { getComponentKey } from '../../utilities/component'
import { noop } from '../../utilities/other'
import { ConditionListProps } from './ConditionList.types'
import { ConditionListUI, AddButtonWrapperUI } from './styles/ConditionList.css'
import { COMPONENT_KEY } from './ConditionList.utils'

export class ConditionList extends React.PureComponent<ConditionListProps> {
  static className = 'c-ConditionList'
  static defaultProps = {
    conditions: [],
    innerRef: noop,
    onAdd: noop,
    isAddEnabled: true,
  }

  static AddButton = AddButton
  static And = And

  getClassName() {
    const { className } = this.props
    return classNames(ConditionList.className, className)
  }

  renderConditions() {
    const { conditions } = this.props

    return conditions.reduce((list, ConditionComponent, index) => {
      const key = getComponentKey(ConditionComponent, index)
      const enhancedCondition = React.cloneElement(ConditionComponent, {
        key,
      })

      if (index === 0) {
        return [...list, enhancedCondition]
      }

      const OperatorComponent = React.createElement(And, {
        key: index,
      })

      return [...list, OperatorComponent, enhancedCondition]
    }, [])
  }

  renderAddAction() {
    const { isAddEnabled, onAdd } = this.props
    if (!isAddEnabled) return null

    return <AddButton onClick={onAdd} />
  }

  render() {
    const { children, innerRef, isAddEnabled, ...rest } = this.props

    return (
      <ConditionListUI
        {...getValidProps(rest)}
        className={this.getClassName()}
        innerRef={innerRef}
      >
        {this.renderConditions()}
        {this.renderAddAction()}
      </ConditionListUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY.ConditionList)(
  ConditionList
)

export default PropConnectedComponent
