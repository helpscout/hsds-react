import * as React from 'react'
import PropProvider from '../PropProvider'
import AddButton from './ConditionField.AddButton'
import { noop } from '../../utilities/other'
import { ConditionFieldGroupProps } from './ConditionField.types'
import { COMPONENT_KEY } from './ConditionField.utils'

export class Group extends React.PureComponent<ConditionFieldGroupProps> {
  static defaultProps = {
    isAddEnabled: true,
    onAdd: noop,
  }

  static displayName = 'ConditionGroup'

  renderFields() {
    const { children } = this.props

    return React.Children.map(children, (child, index) => {
      const isWithOr = index > 0
      const value = {
        [COMPONENT_KEY.Field]: {
          isWithOr,
        },
      }
      return <PropProvider value={value}>{child}</PropProvider>
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
      <div {...rest}>
        {this.renderFields()}
        {this.renderAddAction()}
      </div>
    )
  }
}

export default Group
