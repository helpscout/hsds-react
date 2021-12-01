import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import useAnimatedRender from '../../hooks/useAnimatedRender'
import useClickOutside from '../../hooks/useClickOutside'
import { noop } from '../../utilities/other'
import { manageTrappedFocus } from '../../utilities/focus'
import {
  CloseModalButtonUI,
  SimpleModalOverlayUI,
  SimpleModalUI,
} from './SimpleModal.css'

function SimpleModal({
  ariaLabelledBy = '',
  children,
  className,
  customCloseButton,
  closeOnClickOutside = false,
  'data-cy': dataCy = 'SimpleModal',
  focusModalOnShow = true,
  onClose = noop,
  show = false,
  trapFocus = true,
  width = '360px',
  height = '390px',
  withCloseButton = true,
  zIndex = 999,
  zIndexCloseButton = 5,
  ...rest
}) {
  const modalRef = useRef(null)
  const overlayRef = useRef(null)
  const [shouldRender, onAnimationEnd] = useAnimatedRender(
    show,
    overlayRef,
    focusModalOnShow && modalRef
  )

  useClickOutside(getClickOutsideRef(), () => {
    onClose()
  })

  function getClickOutsideRef() {
    if (closeOnClickOutside === 'modal') {
      return modalRef
    }
    if (closeOnClickOutside === 'overlay') {
      return overlayRef
    }

    return null
  }

  function handleOverlayKeyDown(e) {
    if (shouldRender && e.key === 'Escape') {
      e.stopPropagation()
      onClose()
    } else if (e.key === 'Tab' && trapFocus && modalRef.current) {
      manageTrappedFocus(modalRef.current, e)
    }
  }

  function renderCloseButton() {
    if (withCloseButton) {
      if (customCloseButton && React.isValidElement(customCloseButton)) {
        const clickHandler = customCloseButton.props.onClick || onClose
        return React.cloneElement(customCloseButton, {
          onClick: clickHandler,
        })
      }
      return (
        <CloseModalButtonUI
          aria-label="close modal button"
          className="SimpleModal__CloseButton"
          onClick={onClose}
          $zIndex={zIndexCloseButton}
          icon="cross-small"
          size="lg"
          seamless
        />
      )
    }

    return null
  }

  return shouldRender ? (
    <SimpleModalOverlayUI
      className={classNames(
        'SimpleModal__Overlay',
        show && 'element-in',
        className
      )}
      data-testid="simple-modal-overlay"
      onAnimationEnd={onAnimationEnd}
      onKeyDown={handleOverlayKeyDown}
      ref={overlayRef}
      $zIndex={zIndex}
    >
      <SimpleModalUI
        aria-modal="true"
        aria-labelledby={ariaLabelledBy}
        className="SimpleModal"
        dataCy={dataCy}
        data-testid="simple-modal"
        id="simple-modal"
        role="dialog"
        ref={modalRef}
        height={height}
        width={width}
        tabIndex="0"
        {...rest}
      >
        {renderCloseButton()}
        {children}
      </SimpleModalUI>
    </SimpleModalOverlayUI>
  ) : null
}

SimpleModal.propTypes = {
  /** If you include a Heading in the modal, give it the same ID as the value you put here. Otherwise add a `aria-label` with a description */
  ariaLabelledBy: PropTypes.string,
  /** Content to be rendered inside the modal */
  children: PropTypes.any,
  /** Custom classname on this component */
  className: PropTypes.string,
  /** Pass your own close button, don't forget to style it and position it. Your `onClose` handler will be attached to it automatically, or you can add your own click handler directly on it */
  customCloseButton: PropTypes.element,
  /** Whether to close the Modal when clicking outside, pass a string with value "modal" if clicking ouside the Modal, or "overlay" if clicking outside the overlay should close it (in case of "contained modals") */
  closeOnClickOutside: PropTypes.oneOf([null, undefined, 'modal', 'overlay']),
  /** Data attr applied for Cypress tests */
  'data-cy': PropTypes.string,
  /** If you don't want the focus to be moved to the Modal when it enters */
  focusModalOnShow: PropTypes.bool,
  /** Customize the modal's height */
  height: PropTypes.string,
  /** Function that gets called when clicking the `x` button and when pressing `esc`, use this to close the modal in your app */
  onClose: PropTypes.func,
  /** Control whether the modal is open or close */
  show: PropTypes.bool,
  /** Whether to restrict focus to elements inside the modal */
  trapFocus: PropTypes.bool,
  /** Customize the modal's width */
  width: PropTypes.string,
  /** Whether to include a close button */
  withCloseButton: PropTypes.bool,
  /** Customize the z-index for the modal */
  zIndex: PropTypes.number,
  /** Customize the z-index specifically for the close modal button */
  zIndexCloseButton: PropTypes.number,
}

export default SimpleModal
