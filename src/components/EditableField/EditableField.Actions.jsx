import React from 'react'
import PropTypes from 'prop-types'
import { EditableFieldActionsUI, FieldButtonUI } from './EditableField.css'
import Icon from '../Icon'
import classNames from 'classnames'
import { normalizeUrl } from '../../utilities/urls'
import { ACTION_ICONS } from './EditableField.constants'
import { ACTIONS_CLASSNAMES, STATES_CLASSNAMES } from './EditableField.utils'
import equal from 'fast-deep-equal'

export class EditableFieldActions extends React.Component {
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

    if (action.name === 'delete') {
      this.props.deleteAction({ action, name, event })
    }

    if (action.name === 'link') {
      window && window.open(normalizeUrl(value))
    } else {
      this.props.customAction({ action, name, event })
    }
  }

  render() {
    const { actions, validationInfo, ...rest } = this.props

    return (
      <EditableFieldActionsUI
        {...rest}
        className={classNames(
          ACTIONS_CLASSNAMES.actions,
          validationInfo && STATES_CLASSNAMES.withValidation
        )}
        numberOfActions={actions.length}
      >
        {actions.map(action => {
          return (
            <FieldButtonUI
              className={`${ACTIONS_CLASSNAMES.fieldButton} action-${action.name}`}
              key={action.name}
              tabIndex={-1}
              type="button"
              onClick={event => {
                this.handleActionClick({ action, event })
              }}
              {...action.buttonAttrs}
            >
              <Icon name={action.icon || ACTION_ICONS[action.name]} size="24" />
            </FieldButtonUI>
          )
        })}
      </EditableFieldActionsUI>
    )
  }
}

function noop() {}

EditableFieldActions.defaultProps = {
  'data-cy': 'EditableFieldActions',
  deleteAction: noop,
  customAction: noop,
}

EditableFieldActions.propTypes = {
  /** Actions to attach to an EditableField (default includes 'delete') */
  actions: PropTypes.arrayOf(PropTypes.object),
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** The **unique** identifier for the EditableField - Ties label with input - Used to generate React `keys` - Used to manage correct handling (adding, deleting, editing) of multiple-value fields */
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Value passed from the EditableField */
  fieldValue: PropTypes.object,
  /** Validation object passed from the EditableField */
  validationInfo: PropTypes.object,
  /** Callback action on delete */
  deleteAction: PropTypes.func,
  /** Callback custom action */
  customAction: PropTypes.func,
}

export default EditableFieldActions
