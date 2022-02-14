import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'
import { MODAL_KIND, getModalKindClassName } from './Modal.utils'
import {
  ActionFooterUI,
  CancelButtonUI,
  PrimaryButtonUI,
  SecondaryAlertButtonUI,
  SecondaryButtonUI,
} from './Modal.ActionFooter.css'
import {
  THEME_GREEN,
  THEME_BLUE,
  THEME_RED,
  THEME_GREY,
} from '../Button/Button.utils'

function noop() {}

class ModalActionFooter extends React.PureComponent {
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
    const {
      primaryButtonText,
      primaryButtonProps,
      state,
      primaryButtonDisabled,
    } = this.props
    let theme = THEME_BLUE
    if (state === 'success') theme = THEME_GREEN
    if (state === 'danger') theme = THEME_RED

    return (
      <PrimaryButtonUI
        size="lg"
        data-cy="PrimaryButton"
        {...primaryButtonProps}
        theme={theme}
        onClick={this.handlePrimaryAction}
        disabled={primaryButtonDisabled}
      >
        {primaryButtonText}
      </PrimaryButtonUI>
    )
  }

  renderSecondaryButton() {
    const {
      kind,
      secondaryButtonText,
      secondaryButtonProps,
      secondaryButtonDisabled,
    } = this.props

    if (!secondaryButtonText) {
      return null
    }

    const ButtonComponent =
      kind === MODAL_KIND.ALERT ? SecondaryAlertButtonUI : SecondaryButtonUI

    return (
      <ButtonComponent
        size="lg"
        theme="grey"
        outlined
        data-cy="SecondaryButton"
        {...secondaryButtonProps}
        onClick={this.handleSecondaryAction}
        disabled={secondaryButtonDisabled}
      >
        {secondaryButtonText}
      </ButtonComponent>
    )
  }

  renderCancelButton() {
    const { cancelText, cancelProps, showDefaultCancel } = this.props

    if (!(showDefaultCancel && cancelText)) {
      return null
    }

    return (
      <CancelButtonUI
        linked
        size="lg"
        theme={THEME_GREY}
        className="is-cancel"
        data-cy="CancelButton"
        {...cancelProps}
        onClick={this.handleCancel}
      >
        {cancelText}
      </CancelButtonUI>
    )
  }

  render() {
    const { className, kind, state, shadow, ...rest } = this.props

    const modalKindClassName = getModalKindClassName(kind)

    const componentClassName = classNames(
      'c-ModalActionFooter',
      modalKindClassName,
      state === 'danger' && 'is-danger',
      className
    )

    return (
      <ActionFooterUI
        {...getValidProps(rest)}
        className={componentClassName}
        gap="md"
        placement="bottom"
        size="md"
        shadow={shadow}
      >
        {this.renderCancelButton()}
        {this.renderSecondaryButton()}
        {this.renderPrimaryButton()}
      </ActionFooterUI>
    )
  }
}

ModalActionFooter.defaultProps = {
  cancelText: 'Cancel',
  cancelProps: {},
  'data-cy': 'ModalActionFooter',
  kind: MODAL_KIND.DEFAULT,
  onCancel: noop,
  onPrimaryClick: noop,
  onSecondaryClick: noop,
  primaryButtonText: 'Save',
  primaryButtonProps: {},
  primaryButtonDisabled: false,
  secondaryButtonText: null,
  secondaryButtonProps: {},
  secondaryButtonDisabled: false,
  showDefaultCancel: true,
  state: '',
}

ModalActionFooter.propTypes = {
  /** Text on cancel button */
  cancelText: PropTypes.string,
  /** Extra props on cancel button */
  cancelProps: PropTypes.object,
  /** The kind of version 2 Modal style to apply. */
  kind: PropTypes.oneOf(['alert', 'default', 'branded', 'sequence']),
  /** Callback on cancel button click */
  onCancel: PropTypes.func,
  /** Callback on primary button click */
  onPrimaryClick: PropTypes.func,
  /** Callback on secondary button click */
  onSecondaryClick: PropTypes.func,
  /** Text on primary button */
  primaryButtonText: PropTypes.string,
  /** Extra props on primary button */
  primaryButtonProps: PropTypes.object,
  /** Whether the button is disabled */
  primaryButtonDisabled: PropTypes.bool,
  /** Text on secondary button */
  secondaryButtonText: PropTypes.string,
  /** Whether the button is disabled */
  secondaryButtonDisabled: PropTypes.bool,
  /** Extra props on secondary button */
  secondaryButtonProps: PropTypes.object,
  /** Show cancel button */
  showDefaultCancel: PropTypes.bool,
  /** State to use when styling a version 2 Modal (currently only `danger` state is custom styled). */
  state: PropTypes.oneOf(['', 'danger']),
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default ModalActionFooter
