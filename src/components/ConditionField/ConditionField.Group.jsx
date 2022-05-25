import React from 'react'
import PropTypes from 'prop-types'
import { getValidProps } from '@hsds/utils-react'
import AddButton from './ConditionField.AddButton'

export class ConditionFieldGroup extends React.PureComponent {
  renderFields() {
    const { children } = this.props

    return React.Children.map(children, (child, index) => {
      return React.cloneElement(child, {
        ...child.props,
        isWithConjunction: index > 0,
        conjunction: this.props.conjunction,
      })
    })
  }

  renderAddAction() {
    const {
      isAddEnabled,
      canChangeConjunction,
      onAdd,
      conjunction,
      onConjunctionChange,
    } = this.props
    if (!isAddEnabled && !canChangeConjunction) return null

    return (
      <AddButton
        onClick={onAdd}
        onTypeChanged={onConjunctionChange}
        type={conjunction}
        disabled={!isAddEnabled}
        selectableType={canChangeConjunction}
      />
    )
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

function noop() {}

ConditionFieldGroup.defaultProps = {
  'data-cy': 'ConditionFieldGroup',
  isAddEnabled: true,
  canChangeConjunction: false,
  onAdd: noop,
  onConjunctionChange: noop,
  conjunction: 'or',
}

ConditionFieldGroup.propTypes = {
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** The className of the component. */
  className: PropTypes.string,
  /** Retrieve the inner DOM node. */
  innerRef: PropTypes.func,
  /** Renders an inner Condition.AddButton */
  isAddEnabled: PropTypes.bool,
  /** Callback when the inner Condition.AddButton is clicked. */
  onAdd: PropTypes.func,
  /** Currently used conjunction */
  conjunction: PropTypes.oneOf(['and', 'or']),
  /** Callback when conjunction changed */
  onConjunctionChange: PropTypes.func,
  /** Flag indicating if conjunction can change */
  canChangeConjunction: PropTypes.bool,
}
export default ConditionFieldGroup
