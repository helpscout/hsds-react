/* istanbul ignore file */
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ScrollableContainer from '../ScrollableContainer'
import Button from '../Button'
import {
  BodyUI,
  HeaderUI,
  FooterUI,
  ConfirmationWrapperUI,
  ConfirmationBodyUI,
  ConfirmationHeadingUI,
  ConfirmationFooterUI,
} from './SimpleModal.layouts.css'

function noop() {}

export function HeaderAndFooter({
  children,
  heading,
  header,
  footer,
  ...rest
}) {
  return (
    <ScrollableContainer
      width="100%"
      height="100%"
      header={
        <HeaderUI
          className={classNames(
            'SimpleModal__header',
            header && 'with-custom-header-content'
          )}
        >
          {header ? header : <h1>{heading}</h1>}
        </HeaderUI>
      }
      body={<BodyUI className="SimpleModal__body">{children}</BodyUI>}
      footer={
        footer ? (
          <FooterUI className={'SimpleModal__footer'}>{footer}</FooterUI>
        ) : null
      }
      {...rest}
    />
  )
}

HeaderAndFooter.propTypes = {
  /** The content to put in the body of the modal*/
  children: PropTypes.any,
  /** Custom footer content */
  footer: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /** If you just need a modal title in the header, use this */
  heading: PropTypes.string,
  /** Custom header content */
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
}

export function Confirmation({
  heading,
  body,
  onConfirm = noop,
  onCancel = noop,
  confirmButtonText = 'Accept',
  cancelButtonText = 'Cancel',
  danger,
}) {
  return (
    <ConfirmationWrapperUI className={classNames(!body && 'is-compact')}>
      <ConfirmationHeadingUI>{heading}</ConfirmationHeadingUI>
      {body && <ConfirmationBodyUI>{body}</ConfirmationBodyUI>}
      <ConfirmationFooterUI>
        <Button outlined theme="grey" onClick={onConfirm}>
          {cancelButtonText}
        </Button>
        <Button theme={danger ? 'red' : 'blue'} onClick={onCancel}>
          {confirmButtonText}
        </Button>
      </ConfirmationFooterUI>
    </ConfirmationWrapperUI>
  )
}

Confirmation.propTypes = {
  /** Text or element for the modal heading */
  heading: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  /** Text or element for the modal body */
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /** Callback to run on main action click */
  onConfirm: PropTypes.func,
  /** Callback to run on cancel action click */
  onCancel: PropTypes.func,
  /** Text of the main action button */
  confirmButtonText: PropTypes.string,
  /** Text of the cancel button */
  cancelButtonText: PropTypes.string,
  /** Render the main action as a red button */
  danger: PropTypes.bool,
}
