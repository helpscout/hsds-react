import React from 'react'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { MODAL_KIND, getModalKindClassName } from './Modal.utils'
import {
  ActionFooterUI,
  CancelButtonUI,
  PrimaryButtonUI,
  SecondaryAlertButtonUI,
  SecondaryButtonUI,
} from './Modal.ActionFooter.css'

class ActionFooter extends React.PureComponent {
  static defaultProps = {
    cancelText: 'Cancel',
    kind: MODAL_KIND.DEFAULT,
    onCancel: noop,
    onPrimaryClick: noop,
    onSecondaryClick: noop,
    primaryButtonText: 'Save',
    primaryButtonDisabled: false,
    secondaryButtonText: null,
    secondaryButtonDisabled: false,
    showDefaultCancel: true,
    state: '',
  }

  handleCancel = e => {
    e && e.preventDefault()
    const { onCancel } = this.props
    onCancel()
  }

  handlePrimaryAction = e => {
    e && e.preventDefault()
    const { onPrimaryClick } = this.props
    onPrimaryClick()
  }

  handleSecondaryAction = e => {
    e && e.preventDefault()
    const { onSecondaryClick } = this.props
    onSecondaryClick()
  }

  renderPrimaryButton() {
    const { primaryButtonText, state, primaryButtonDisabled } = this.props
    return (
      <PrimaryButtonUI
        state={state}
        kind="primary"
        size="lg"
        version={2}
        onClick={this.handlePrimaryAction}
        disabled={primaryButtonDisabled}
      >
        {primaryButtonText}
      </PrimaryButtonUI>
    )
  }

  renderSecondaryButton() {
    const { kind, secondaryButtonText, secondaryButtonDisabled } = this.props
    if (!secondaryButtonText) {
      return null
    }

    const ButtonComponent =
      kind === MODAL_KIND.ALERT ? SecondaryAlertButtonUI : SecondaryButtonUI

    return (
      <ButtonComponent
        kind="secondary"
        size="lg"
        version={2}
        onClick={this.handleSecondaryAction}
        disabled={secondaryButtonDisabled}
      >
        {secondaryButtonText}
      </ButtonComponent>
    )
  }

  renderCancelButton() {
    const { cancelText, showDefaultCancel } = this.props
    if (!(showDefaultCancel && cancelText)) {
      return null
    }
    return (
      <CancelButtonUI
        className="is-cancel"
        kind="default"
        version={2}
        onClick={this.handleCancel}
      >
        {cancelText}
      </CancelButtonUI>
    )
  }

  render() {
    const { className, kind, state, ...rest } = this.props

    const modalKindClassName = getModalKindClassName(kind)

    const componentClassName = classNames(
      'c-ModalActionFooter',
      modalKindClassName,
      state === 'danger' && 'is-danger',
      className
    )

    return (
      <ActionFooterUI
        {...rest}
        className={componentClassName}
        gap="md"
        placement="bottom"
        size="md"
      >
        {this.renderCancelButton()}
        {this.renderSecondaryButton()}
        {this.renderPrimaryButton()}
      </ActionFooterUI>
    )
  }
}

ActionFooter.displayName = 'ModalActionFooter'

export default ActionFooter
