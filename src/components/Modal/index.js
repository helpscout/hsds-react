import React from 'react'
import PropTypes from 'prop-types'
import Animate from '../Animate'
import Card from '../Card'
import CloseButton from '../CloseButton'
import Overlay from '../Overlay'
import PortalWrapper from '../PortalWrapper'
import Scrollable from '../Scrollable'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { propTypes as portalTypes } from '../Portal'

export const propTypes = Object.assign({}, portalTypes, {
  closeIcon: PropTypes.bool,
  scrollFade: PropTypes.bool,
  scrollableRef: PropTypes.func,
  modalAnimationDelay: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object
  ]),
  overlayAnimationDelay: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object
  ]),
  onScroll: PropTypes.func,
  trigger: PropTypes.element
})

const defaultProps = {
  closeIcon: true,
  scrollFade: true,
  isOpen: false,
  modalAnimationDelay: {
    in: 200,
    out: 100
  },
  overlayAnimationDelay: {
    in: 100,
    out: 200
  },
  onScroll: noop,
  scrollableRef: noop
}

const modalBaseZIndex = 1040
const portalOptions = {
  id: 'Modal',
  timeout: 100,
  zIndex: modalBaseZIndex
}

const Modal = props => {
  const {
    children,
    className,
    closeIcon,
    closePortal,
    exact,
    isOpen,
    modalAnimationDelay,
    openPortal,
    onClose,
    onScroll,
    overlayAnimationDelay,
    path,
    portalIsOpen,
    portalIsMounted,
    scrollFade,
    scrollableRef,
    style,
    timeout,
    trigger,
    zIndex,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-Modal',
    isOpen && 'is-open',
    className
  )

  const closeMarkup = closeIcon ? (
    <div className='c-Modal__close'>
      <CloseButton onClick={closePortal} />
    </div>
  ) : null

  const modalStyle = style ? Object.assign({}, style, {
    zIndex
  }) : { zIndex }

  return (
    <div className={componentClassName} role='document' style={modalStyle} {...rest}>
      <div className='c-Modal__content'>
        <Animate sequence='fade down' in={portalIsOpen} wait={modalAnimationDelay}>
          <Card seamless role='dialog'>
            {closeMarkup}
            <Scrollable
              className='c-Modal__scrollable'
              fade
              rounded
              onScroll={onScroll}
              scrollableRef={scrollableRef}
            >
              {children}
            </Scrollable>
          </Card>
        </Animate>
      </div>
      <Animate sequence='fade' in={portalIsOpen} wait={overlayAnimationDelay}>
        <Overlay onClick={closePortal} role='presentation' />
      </Animate>
    </div>
  )
}

Modal.propTypes = propTypes
Modal.defaultProps = defaultProps

export const ModalComponent = Modal
export default PortalWrapper(portalOptions)(Modal)
