import * as React from 'react'

import { EditableFieldActionsUI, FieldButtonUI } from './EditableField.css'
import Icon from '../Icon'

import { classNames } from '../../utilities/classNames'
import { normalizeUrl } from '../../utilities/urls'
import { ACTION_ICONS } from './EditableField.constants'
import { ACTIONS_CLASSNAMES, STATES_CLASSNAMES } from './EditableField.utils'

import * as equal from 'fast-deep-equal'
import { noop } from '../../utilities/other'

import { ActionsProps } from './EditableField.types'

export class EditableFieldActions extends React.Component<ActionsProps> {
  static defaultProps = {
    deleteAction: noop,
    customAction: noop,
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.fieldValue.value !== nextProps.fieldValue.value) {
      return true
    }

    if (!equal(this.props.validationInfo, nextProps.validationInfo)) {
      return true
    }

    return false
  }

  handleActionClick = ({ action, event }) => {
    const {
      name,
      fieldValue: { value },
    } = this.props
    /* istanbul ignore else */
    if (action.name === 'delete') {
      this.props.deleteAction({ action, name, event })
    }
    /* istanbul ignore next */
    if (action.name === 'link') {
      window && window.open(normalizeUrl(value))
    } else {
      this.props.customAction({ action, name, event })
    }
  }

  render() {
    const { actions, validationInfo } = this.props

    return (
      <EditableFieldActionsUI
        className={classNames(
          ACTIONS_CLASSNAMES.actions,
          validationInfo && STATES_CLASSNAMES.withValidation
        )}
        numberOfActions={actions.length}
      >
        {(actions as any).map(action => {
          return (
            <FieldButtonUI
              className={`${ACTIONS_CLASSNAMES.fieldButton} action-${action.name}`}
              key={action.name}
              tabIndex={-1}
              type="button"
              onClick={event => {
                this.handleActionClick({ action, event })
              }}
            >
              <Icon name={action.icon || ACTION_ICONS[action.name]} size="24" />
            </FieldButtonUI>
          )
        })}
      </EditableFieldActionsUI>
    )
  }
}

export default EditableFieldActions
