import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import useAnimatedRender from '../../hooks/useAnimatedRender'
import { noop } from '../../utilities/other'
import { manageTrappedFocus } from '../../utilities/focus'
import {
  CloseModalButtonUI,
  SimpleModalOverlayUI,
  SimpleModalUI,
} from './SimpleModal.css'
import Icon from '../Icon'

function SimpleModal({
  ariaLabelledBy = '',
  children,
  className,
  focusModalOnShow = true,
  onClose = noop,
  show = false,
  trapFocus = true,
  withCloseButton = true,
  zIndex = 999,
}) {
  const modalRef = useRef(null)
  const overlayRef = useRef(null)
  const [shouldRender, onAnimationEnd] = useAnimatedRender(
    show,
    overlayRef,
    focusModalOnShow && modalRef
  )

  function handleOverlayKeyDown(e) {
    if (shouldRender && e.key === 'Escape') {
      e.stopPropagation()
      onClose()
    } else if (e.key === 'Tab' && trapFocus && modalRef.current) {
      manageTrappedFocus(modalRef.current, e)
    }
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
      zIndex={zIndex}
    >
      <SimpleModalUI
        aria-modal="true"
        aria-labelledby={ariaLabelledBy}
        className="SimpleModal"
        data-cy="simple-modal"
        data-testid="simple-modal"
        id="simple-modal"
        role="dialog"
        ref={modalRef}
        tabIndex="0"
      >
        {withCloseButton ? (
          <CloseModalButtonUI
            className="SimpleModal__CloseButton"
            onClick={onClose}
          >
            <Icon size={18} name="cross" />
          </CloseModalButtonUI>
        ) : null}
        {children}
      </SimpleModalUI>
    </SimpleModalOverlayUI>
  ) : null
}

SimpleModal.propTypes = {
  /** If you include a Heading in the modal, give it the same ID as the value you put here */
  ariaLabelledBy: PropTypes.string,
  /** Content to be rendered inside the modal */
  children: PropTypes.any,
  /** Custom classname on this component */
  className: PropTypes.string,
  /** If you don't want the focus to be moved to the Modal when it enters */
  focusModalOnShow: PropTypes.bool,
  /** Function that gets called when clicking the `x` button and when pressing `esc`, use this to close the modal in your app */
  onClose: PropTypes.func,
  /** Control whether the modal is open or close */
  show: PropTypes.bool,
  /** Whether to restrict focus to elements inside the modal */
  trapFocus: PropTypes.bool,
  /** Whether to include a close button */
  withCloseButton: PropTypes.bool,
  /** Customize the z-index */
  zIndex: PropTypes.number,
}

export default SimpleModal
