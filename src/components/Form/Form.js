import React from 'react'
import Actions from './Form.Actions'
import PropTypes from 'prop-types'
import Button from '../Button'

import { classNames } from '../../utilities/classNames'

export class Form extends React.PureComponent {
  static Actions = Actions

  static defaultProps = {
    actionTabbable: true,
    cancelText: 'Cancel',
    destroyText: 'Delete',
    onSave: evt => {
      evt && evt.preventDefault()
    },
    saveText: 'Save',
  }

  static propTypes = {
    actionDirection: PropTypes.string,
    actionTabbable: PropTypes.bool,
    cancelButtonProps: PropTypes.object,
    cancelText: PropTypes.string,
    children: PropTypes.any,
    className: PropTypes.string,
    destroyButtonProps: PropTypes.object,
    destroyText: PropTypes.string,
    onCancel: PropTypes.func,
    onDestroy: PropTypes.func,
    onSave: PropTypes.func,
    saveButtonProps: PropTypes.object,
    saveText: PropTypes.string,
  }

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
      <form onSubmit={onSave} className={componentClassName}>
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

export default Form
