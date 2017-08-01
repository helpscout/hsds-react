import React from 'react'
import PropTypes from 'prop-types'
import Card from '../Card'
import CardBlock from '../CardBlock'
import Icon from '../Icon'
import Overlay from '../Overlay'
import { PortalWrapper } from '../Portal'

const propTypes = {
  closeIcon: PropTypes.bool,
  trigger: PropTypes.element.isRequired
}

const defaultProps = {
  closeIcon: true
}

const portalOptions = {
  id: 'Modal'
}

const Modal = props => {
  const {
    children,
    closeIcon,
    closePortal
  } = props

  const closeMarkup = closeIcon ? (
    <div className='c-Modal__close'>
      <Icon name='cross-medium' onClick={closePortal} clickable />
    </div>
  ) : null

  return (
    <div className='c-Modal'>
      <div className='c-Modal__content'>
        <Card seamless>
          <CardBlock>
            {closeMarkup}
            {children}
          </CardBlock>
        </Card>
      </div>
      <Overlay onClick={closePortal} />
    </div>
  )
}

Modal.propTypes = propTypes
Modal.defaultProps = defaultProps

export default PortalWrapper(portalOptions)(Modal)
