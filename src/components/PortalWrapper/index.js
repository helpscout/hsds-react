import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Animate from '../Animate'
import KeypressListener from '../KeypressListener'
import { default as Portal, propTypes as portalTypes } from '../Portal'
import Keys from '../../constants/Keys'
import { createUniqueIDFactory } from '../../utilities/id'

const defaultOptions = {
  id: 'PortalWrapper'
}

const PortalWrapper = (options = defaultOptions) => ComposedComponent => {
  const propTypes = portalTypes

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

    componentDidMount () {
      if (this.props.path) {
        this.openPortal()
      }
    }

    componentWillReceiveProps (nextProps) {
      /* istanbul ignore next */
      if (nextProps.path) {
        this.openPortal()
      }
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
        exact,
        isOpen,
        onBeforeClose,
        onBeforeOpen,
        onClose,
        onOpen,
        path,
        renderTo,
        trigger
      } = this.state
      const { timeout } = this.props

      const openPortal = this.openPortal.bind(this)
      const closePortal = this.closePortal.bind(this)
      const id = uniqueID()
      const uniqueIndex = parseInt(id.replace(options.id, ''), 10)
      const zIndex = options.zIndex ? options.zIndex + uniqueIndex : null

      const portalMarkup = (
        <Animate animateOnMount={false} in={isOpen} unmountOnExit wait={300}>
          <Portal
            onBeforeClose={onBeforeClose}
            onClose={onClose}
            onBeforeOpen={onBeforeOpen}
            onOpen={onOpen}
            id={id}
            renderTo={renderTo}
            timeout={timeout}
          >
            <ComposedComponent
              openPortal={openPortal}
              closePortal={closePortal}
              portalIsOpen={isOpen}
              zIndex={zIndex}
              {...this.props}
            />
          </Portal>
        </Animate>
      )

      const portalContainerMarkup = path ? (
        <Route exact={exact} path={path} render={props => portalMarkup} />
      ) : portalMarkup

      const triggerMarkup = trigger
        ? React.cloneElement(trigger, {
          onClick: openPortal
        })
        : null

      return (
        <div>
          <KeypressListener keyCode={Keys.ESCAPE} handler={closePortal} />
          {triggerMarkup}
          {portalContainerMarkup}
        </div>
      )
    }
  }

  PortalWrapper.propTypes = propTypes
  PortalWrapper.defaultProps = defaultProps

  return PortalWrapper
}

export default PortalWrapper
