import React, { Component } from 'react'
import Portal from '../Portal'
import PropTypes from 'prop-types'
import { createUniqueIDFactory } from '../../utilities/constants'

const PortalWrapper = (options = {}) => ComposedComponent => {
  const propTypes = {
    isOpen: PropTypes.bool
  }

  const defaultProps = {
    isOpen: false
  }

  const uniqueID = createUniqueIDFactory(options.id)

  class PortalWrapper extends Component {
    constructor (props) {
      super()
      this.state = Object.assign({}, options, props)
    }

    openPortal () {
      this.setState({
        isOpen: true
      })
    }

    closePortal () {
      this.setState({
        isOpen: false
      })
    }

    render () {
      const {
        isOpen,
        trigger
      } = this.state
      const openPortal = this.openPortal.bind(this)
      const closePortal = this.closePortal.bind(this)
      const id = uniqueID()

      const portalMarkup = isOpen ? (
        <Portal id={id}>
          <ComposedComponent
            openPortal={openPortal}
            closePortal={closePortal}
            {...this.props}
          />
        </Portal>
      ) : null

      const triggerMarkup = React.cloneElement(trigger, {
        onClick: openPortal
      })

      return (
        <div>
          {triggerMarkup}
          {portalMarkup}
        </div>
      )
    }
  }

  PortalWrapper.propTypes = propTypes
  PortalWrapper.defaultProps = defaultProps

  return PortalWrapper
}

export default PortalWrapper
