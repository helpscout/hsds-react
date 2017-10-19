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
  onScroll: PropTypes.func,
  trigger: PropTypes.element
})

const defaultProps = {
  closeIcon: true,
  scrollFade: true,
  isOpen: false,
  onScroll: noop,
  scrollableRef: noop
}

const modalBaseZIndex = 1040
const portalOptions = {
  lockBodyOnOpen: true,
  id: 'Modal',
  timeout: 200,
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
    lockBodyOnOpen,
    openPortal,
    onClose,
    onScroll,
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
        <Animate sequence='fadeIn down' in={portalIsOpen} wait={300}>
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
      <Animate sequence='fadeIn' in={portalIsOpen} wait={200}>
        <Overlay onClick={closePortal} role='presentation' />
      </Animate>
    </div>
  )
}

Modal.propTypes = propTypes
Modal.defaultProps = defaultProps

export const ModalComponent = Modal
export default PortalWrapper(portalOptions)(Modal)
