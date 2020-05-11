import React from 'react'
import PropTypes from 'prop-types'
import AddButton from './ConditionField.AddButton'
import { noop } from '../../utilities/other'

export class Group extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    innerRef: PropTypes.func,
    isAddEnabled: PropTypes.bool,
    onAdd: PropTypes.func,
  }
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
      <div {...rest} data-cy="ConditionFieldGroup">
        {this.renderFields()}
        {this.renderAddAction()}
      </div>
    )
  }
}

export default Group
