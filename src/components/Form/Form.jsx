import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'
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
        size="lg"
        theme="blue"
        className="save-button"
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
        size="md"
        className="cancel-button"
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
        size="md"
        theme="red"
        className="delete-button"
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

Form.propTypes = {
  /** Direction in which buttons render.*/
  actionDirection: PropTypes.oneOf(['right', 'left']),
  /** Can the user focus on actions by tabbing. */
  actionTabbable: PropTypes.bool,
  /** Allows the user to pass in any props that Button component accepts. */
  cancelButtonProps: PropTypes.object,
  /** Text for the cancel button. Button will not render without text. */
  cancelText: PropTypes.string,
  /** Content to render. */
  children: PropTypes.any,
  /** Custom class names to be added to the component */
  className: PropTypes.string,
  /** Allows the user to pass in any props that Button component accepts. */
  destroyButtonProps: PropTypes.object,
  /** Text for the delete button. Button will not render without text. */
  destroyText: PropTypes.string,
  /** Callback for the cancel button */
  onCancel: PropTypes.func,
  /** Callback for the delete button */
  onDestroy: PropTypes.func,
  /** Callback for when the form is submitted */
  onSave: PropTypes.func,
  /** Allows the user to pass in any props that Button component accepts. */
  saveButtonProps: PropTypes.object,
  /** Text for the save button. Button always renders. */
  saveText: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default Form
