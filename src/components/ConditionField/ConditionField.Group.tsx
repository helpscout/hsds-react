import * as React from 'react'
import AddButton from './ConditionField.AddButton'
import Operator from '../Condition/Condition.Operator'
import { getComponentKey } from '../../utilities/component'
import { noop } from '../../utilities/other'
import { ConditionFieldGroupProps } from './ConditionField.types'
import { ConditionFieldUI } from './styles/ConditionField.css'

export class Group extends React.PureComponent<ConditionFieldGroupProps> {
  static defaultProps = {
    isAddEnabled: true,
    onAdd: noop,
  }

  renderFields() {
    const { children } = this.props

    return React.Children.toArray(children).reduce((list, Component, index) => {
      const key = getComponentKey(Component, index)
      const enhancedComponent = React.cloneElement(Component, {
        key,
      })

      if (index === 0) {
        return [...list, enhancedComponent]
      }

      const OperatorComponent = React.createElement(Operator, {
        type: 'or',
        key: index,
      })

      return [...list, OperatorComponent, enhancedComponent]
    }, [])
  }

  renderAddAction() {
    const { isAddEnabled, onAdd } = this.props
    if (!isAddEnabled) return null

    return <AddButton onClick={onAdd} />
  }

  render() {
    const { children, isAddEnabled, ...rest } = this.props

    return (
      <ConditionFieldUI {...rest}>
        {this.renderFields()}
        {this.renderAddAction()}
      </ConditionFieldUI>
    )
  }
}

export default Group
