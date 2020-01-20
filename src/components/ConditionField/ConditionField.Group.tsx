import * as React from 'react'
import AddButton from './ConditionField.AddButton'
import { noop } from '../../utilities/other'
import { ConditionFieldGroupProps } from './ConditionField.types'

export class Group extends React.PureComponent<ConditionFieldGroupProps> {
  static defaultProps = {
    isAddEnabled: true,
    onAdd: noop,
  }

  static displayName = 'ConditionGroup'

  renderFields() {
    const { children } = this.props

    return React.Children.map(children, (child, index) => {
      return React.cloneElement(child, {
        ...child.props,
        isWithOr: index > 0,
      })
    })
  }

  renderAddAction() {
    const { isAddEnabled, onAdd } = this.props
    if (!isAddEnabled) return null

    return <AddButton onClick={onAdd} />
  }

  render() {
    const { children, isAddEnabled, onAdd, ...rest } = this.props

    return (
      // @ts-ignore
      <div {...rest} data-cy="ConditionFieldGroup">
        {this.renderFields()}
        {this.renderAddAction()}
      </div>
    )
  }
}

export default Group
