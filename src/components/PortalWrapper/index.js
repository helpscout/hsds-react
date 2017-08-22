import React, { Component } from 'react'
import Portal from '../Portal'
import PropTypes from 'prop-types'
import Animate from '../Animate'
import KeypressListener from '../KeypressListener'
import Keys from '../../constants/Keys'
import { createUniqueIDFactory } from '../../utilities/id'

const defaultOptions = {
  id: 'PortalWrapper'
}

const PortalWrapper = (options = defaultOptions) => ComposedComponent => {
  const propTypes = {
    isOpen: PropTypes.bool,
    timeout: PropTypes.number
  }

  const defaultProps = {
    isOpen: false,
    timeout: 0
  }

  const uniqueID = createUniqueIDFactory(options.id)

  class PortalWrapper extends Component {
    constructor (props) {
      super()
      this.state = Object.assign({}, props, options)
    }

    /* istanbul ignore next */
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
        timeout,
        trigger
      } = this.state
      const openPortal = this.openPortal.bind(this)
      const closePortal = this.closePortal.bind(this)
      const id = uniqueID()

      const portalMarkup = (
        <Animate animateOnMount={false} in={isOpen} unmountOnExit wait={300}>
          <ComposedComponent
            openPortal={openPortal}
            closePortal={closePortal}
            portalIsOpen={isOpen}
            {...this.props}
          />
        </Animate>
      )

      const triggerMarkup = trigger
        ? React.cloneElement(trigger, {
          onClick: openPortal
        })
        : null

      return (
        <div>
          <KeypressListener keyCode={Keys.ESCAPE} handler={closePortal} />
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
