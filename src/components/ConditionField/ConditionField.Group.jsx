import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import AddButton from './ConditionField.AddButton'
import { noop } from '../../utilities/other'

export class ConditionFieldGroup extends React.PureComponent {
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
      <div {...getValidProps(rest)}>
        {this.renderFields()}
        {this.renderAddAction()}
      </div>
    )
  }
}

ConditionFieldGroup.propTypes = {
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  innerRef: PropTypes.func,
  isAddEnabled: PropTypes.bool,
  onAdd: PropTypes.func,
}

ConditionFieldGroup.defaultProps = {
  'data-cy': 'ConditionFieldGroup',
  isAddEnabled: true,
  onAdd: noop,
}

export default ConditionFieldGroup
