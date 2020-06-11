import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import FormActions from './Form.Actions'
import Button from '../Button'

export class Form extends React.PureComponent {
  static Actions = FormActions

  render() {
    const {
      actionDirection,
      actionTabbable,
      cancelButtonProps,
      cancelText,
      children,
      className,
      destroyButtonProps,
      destroyText,
      onCancel,
      onDestroy,
      onSave,
      saveButtonProps,
      saveText,
      ...rest
    } = this.props

    const componentClassName = classNames('c-Form', className)
    const commonButtonProps = actionTabbable ? {} : { tabIndex: -1 }

    const saveButton = (
      <Button
        className="save-button"
        kind="primary"
        size="lg"
        version={2}
        submit={true}
        {...commonButtonProps}
        {...saveButtonProps}
      >
        {saveText}
      </Button>
    )

    const cancelButton = onCancel && (
      <Button
        className="cancel-button"
        size="md"
        version={2}
        onClick={onCancel}
        {...commonButtonProps}
        {...cancelButtonProps}
      >
        {cancelText}
      </Button>
    )

    const destroyButton = onDestroy && (
      <Button
        className="delete-button"
        state="danger"
        size="md"
        version={2}
        onClick={onDestroy}
        {...commonButtonProps}
        {...destroyButtonProps}
      >
        {destroyText}
      </Button>
    )

    return (
      <form
        {...getValidProps(rest)}
        onSubmit={onSave}
        className={componentClassName}
      >
        {children}
        <Form.Actions
          direction={actionDirection}
          save={saveButton}
          cancel={cancelButton}
          destroy={destroyButton}
        />
      </form>
    )
  }
}

Form.propTypes = {
  actionDirection: PropTypes.string,
  actionTabbable: PropTypes.bool,
  cancelButtonProps: PropTypes.object,
  cancelText: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  destroyButtonProps: PropTypes.object,
  destroyText: PropTypes.string,
  onCancel: PropTypes.func,
  onDestroy: PropTypes.func,
  onSave: PropTypes.func,
  saveButtonProps: PropTypes.object,
  saveText: PropTypes.string,
}

Form.defaultProps = {
  actionTabbable: true,
  cancelText: 'Cancel',
  destroyText: 'Delete',
  'data-cy': 'Form',
  onSave: evt => {
    evt && evt.preventDefault()
  },
  saveText: 'Save',
}

export default Form
