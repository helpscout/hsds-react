import React from 'react'
import PropTypes from 'prop-types'
import Card from '../Card'
import CardBlock from '../CardBlock'
import Icon from '../Icon'
import Overlay from '../Overlay'
import Portal from '../Portal'

const propTypes = {
  closeIcon: PropTypes.bool
}

const defaultProps = {
  closeIcon: true
}

const portalOptions = {
}

const Modal = props => {
  const {
    closeIcon
  } = props

  const modalHeaderMarkup = closeIcon ? (
    <CardBlock size='sm'>
      <Icon name='cross-large' />
    </CardBlock>
  ) : null

  return (
    <Overlay>
      <Card seamless>
        {modalHeaderMarkup}
        <CardBlock>
          {props.children}
        </CardBlock>
      </Card>
    </Overlay>
  )
}

Modal.propTypes = propTypes
Modal.defaultProps = defaultProps

export default Portal(portalOptions)(Modal)
