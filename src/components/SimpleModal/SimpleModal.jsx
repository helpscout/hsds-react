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
        <CloseModalButtonUI onClick={onClose}>
          <Icon size={18} name="cross" />
        </CloseModalButtonUI>
        {children}
      </SimpleModalUI>
    </SimpleModalOverlayUI>
  ) : null
}

export default SimpleModal
