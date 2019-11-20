import * as React from 'react'
import Actions from './Form.Actions'
import Button from '../Button'
import { classNames } from '../../utilities/classNames'

export class Form extends React.PureComponent {
  static Actions = Actions

  static defaultProps = {
    cancelText: 'Cancel',
    destroyText: 'Delete',
    onSave: evt => {
      evt && evt.preventDefault()
    },
    saveText: 'Save',
  }

  render() {
    const {
      actionDirection,
      cancelText,
      children,
      className,
      destroyText,
      onCancel,
      onDestroy,
      onSave,
      saveText,
    } = this.props

    const componentClassName = classNames('c-Form', className)

    const saveButton = (
      <Button
        className="save-button"
        kind="primary"
        size="lg"
        version={2}
        submit={true}
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
