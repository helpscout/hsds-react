import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import useAnimatedRender from '../../hooks/useAnimatedRender'
import { noop } from '../../utilities/other'
import {
  CloseModalButtonUI,
  SimpleModalOverlayUI,
  SimpleModalUI,
} from './SimpleModal.css'
import Icon from '../Icon'

function SimpleModal({
  ariaLabelledBy = '',
  show = false,
  children,
  className,
  onClose = noop,
  withCloseButton = true,
  zIndex = 999,
}) {
  const modalRef = useRef(null)
  const overlayRef = useRef(null)
  const [shouldRender, onAnimationEnd] = useAnimatedRender(
    show,
    overlayRef,
    modalRef
  )

  function handleOverlayKeyDown(e) {
    if (shouldRender && e.key === 'Escape') {
      e.stopPropagation()
      onClose()
    }
  }

  return shouldRender ? (
    <SimpleModalOverlayUI
      className={classNames(
        'SimpleModal__Overlay',
        show && 'element-in',
        className
      )}
      onAnimationEnd={onAnimationEnd}
      onKeyDown={handleOverlayKeyDown}
      zIndex={zIndex}
      ref={overlayRef}
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
          <CloseModalButtonUI onClick={onClose}>
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
  /** Function that gets called when clicking the `x` button and when pressing `esc`, use this to close the modal in your app */
  onClose: PropTypes.func,
  /** Control whether the modal is open or close */
  show: PropTypes.bool,
  /** Whether to include a close button */
  withCloseButton: PropTypes.bool,
  /** Customize the z-index */
  zIndex: PropTypes.number,
}

export default SimpleModal
