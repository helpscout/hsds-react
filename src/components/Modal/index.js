import React from 'react'
import PropTypes from 'prop-types'
import Animate from '../Animate'
import Card from '../Card'
import CardBlock from '../CardBlock'
import CloseButton from '../CloseButton'
import Overlay from '../Overlay'
import PortalWrapper from '../PortalWrapper'
import Scrollable from '../Scrollable'
import classNames from '../../utilities/classNames'
import portalTypes from '../Portal/types'

const propTypes = Object.assign({}, portalTypes, {
  className: PropTypes.string,
  closeIcon: PropTypes.bool,
  trigger: PropTypes.element
})

const defaultProps = {
  closeIcon: true,
  isOpen: false
}

const modalBaseZIndex = 1040
const portalOptions = {
  id: 'Modal',
  timeout: 400,
  zIndex: modalBaseZIndex
}

const Modal = props => {
  const {
    children,
    closeIcon,
    closePortal,
    portalIsOpen,
    zIndex
  } = props

  const className = classNames(
    'c-Modal',
    props.className
  )

  const closeMarkup = closeIcon ? (
    <div className='c-Modal__close'>
      <CloseButton onClick={closePortal} />
    </div>
  ) : null

  const modalStyle = {
    zIndex
  }

  return (
    <div className={className} style={modalStyle}>
      <div className='c-Modal__content'>
        <Animate sequence='fadeIn down' in={portalIsOpen} wait={300}>
          <Card seamless>
            {closeMarkup}
            <Scrollable fade rounded>
              <CardBlock>
                {children}
              </CardBlock>
            </Scrollable>
          </Card>
        </Animate>
      </div>
      <Animate sequence='fadeIn' in={portalIsOpen} wait={200}>
        <Overlay onClick={closePortal} />
      </Animate>
    </div>
  )
}

Modal.propTypes = propTypes
Modal.defaultProps = defaultProps

export default PortalWrapper(portalOptions)(Modal)
