import * as React from 'react'
import Actions from './Form.Actions'
import Button from '../Button'
import { classNames } from '../../utilities/classNames'

export class Form extends React.PureComponent {
  static Actions = Actions

  static defaultProps = {
    primaryButtonText: 'Submit',
    onFormSubmit: evt => {
      evt && evt.preventDefault()
    },
    onSecondaryButtonClick: () => {},
    onSeriousButtonClick: () => {},
  }

  render() {
    const {
      actionDirection,
      children,
      className,
      onFormSubmit,
      onSecondaryButtonClick,
      onSeriousButtonClick,
      primaryButtonText,
      secondaryButtonText,
      seriousButtonText,
    } = this.props

    const componentClassName = classNames('c-Form', className)

    const primaryButton = (
      <Button kind="primary" size="lg" version={2} submit={true}>
        {primaryButtonText}
      </Button>
    )

    const secondaryButton = secondaryButtonText && (
      <Button size="md" version={2} onClick={onSecondaryButtonClick}>
        {secondaryButtonText}
      </Button>
    )

    const seriousButton = seriousButtonText && (
      <Button
        state="danger"
        size="md"
        version={2}
        onClick={onSeriousButtonClick}
      >
        {seriousButtonText}
      </Button>
    )

    return (
      <form onSubmit={onFormSubmit} className={componentClassName}>
        {children}
        <Form.Actions
          direction={actionDirection}
          primary={primaryButton}
          secondary={secondaryButton}
          serious={seriousButton}
        />
      </form>
    )
  }
}

export default Form
