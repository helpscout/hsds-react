import React from 'react'
import PropTypes from 'prop-types'
import Card from '../Card'
import CardBlock from '../CardBlock'
import CloseButton from '../CloseButton'
import Overlay from '../Overlay'
import PortalWrapper from '../PortalWrapper'
import Scrollable from '../Scrollable'
import classNames from '../../utilities/classNames'

const propTypes = {
  className: PropTypes.string,
  closeIcon: PropTypes.bool,
  isOpen: PropTypes.bool,
  trigger: PropTypes.element.isRequired
}

const defaultProps = {
  closeIcon: true,
  isOpen: false
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

  const className = classNames(
    'c-Modal',
    props.className
  )

  const closeMarkup = closeIcon ? (
    <div className='c-Modal__close'>
      <CloseButton onClick={closePortal} />
    </div>
  ) : null

  return (
    <div className={className}>
      <div className='c-Modal__content'>
        <Card seamless>
          {closeMarkup}
          <Scrollable fade rounded>
            <CardBlock>
              {children}
            </CardBlock>
          </Scrollable>
        </Card>
      </div>
      <Overlay onClick={closePortal} />
    </div>
  )
}

Modal.propTypes = propTypes
Modal.defaultProps = defaultProps

export default PortalWrapper(portalOptions)(Modal)
