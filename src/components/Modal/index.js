import React from 'react'
import PropTypes from 'prop-types'
import Animate from '../Animate'
import Card from '../Card'
import CloseButton from '../CloseButton'
import Overlay from '../Overlay'
import PortalWrapper from '../PortalWrapper'
import Scrollable from '../Scrollable'
import classNames from '../../utilities/classNames'
import { propTypes as portalTypes } from '../Portal'

export const propTypes = Object.assign({}, portalTypes, {
  closeIcon: PropTypes.bool,
  scrollFade: PropTypes.bool,
  trigger: PropTypes.element
})

const defaultProps = {
  closeIcon: true,
  scrollFade: true,
  isOpen: false
}

const modalBaseZIndex = 1040
const portalOptions = {
  lockBodyOnOpen: true,
  id: 'Modal',
  timeout: 400,
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
    path,
    portalIsOpen,
    portalIsMounted,
    scrollFade,
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
            <Scrollable fade={scrollFade} rounded>
              <Card.Block>
                {children}
              </Card.Block>
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

export default PortalWrapper(portalOptions)(Modal)
