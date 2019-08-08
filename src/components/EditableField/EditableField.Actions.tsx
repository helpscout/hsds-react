import * as React from 'react'

import { ComponentUI, FieldButtonUI } from './styles/EditableField.Actions.css'
import Icon from '../Icon'

import { ACTION_ICONS, ACTIONS_CLASSNAMES } from './EditableField.utils'

export class EditableFieldActions extends React.Component<any> {
  shouldComponentUpdate(nextProps) {
    if (this.props.fieldValue.value !== nextProps.fieldValue.value) {
      return true
    }

    return false
  }

  handleActionClick = ({ action, event }) => {
    const { name, fieldValue } = this.props
    /* istanbul ignore else */
    if (action.name === 'delete') {
      this.props.deleteAction({ action, name, event })
    }
    /* istanbul ignore next */
    if (action.name === 'link') {
      window && window.open(fieldValue.value)
    } else {
      this.props.customAction({ action, name, event })
    }
  }

  render() {
    const { actions } = this.props

    return (
      <ComponentUI
        className={ACTIONS_CLASSNAMES.actions}
        numberOfActions={actions.length}
      >
        {(actions as any).map(action => {
          return (
            <FieldButtonUI
              className={`${ACTIONS_CLASSNAMES.fieldButton} action-${
                action.name
              }`}
              key={action.name}
              tabIndex="-1"
              type="button"
              onClick={event => {
                this.handleActionClick({ action, event })
              }}
            >
              <Icon name={action.icon || ACTION_ICONS[action.name]} size="24" />
            </FieldButtonUI>
          )
        })}
      </ComponentUI>
    )
  }
}

export default EditableFieldActions
