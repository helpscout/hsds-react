import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import Animate from '../Animate'
import KeypressListener from '../KeypressListener'
import { default as Portal, propTypes as portalTypes } from '../Portal'
import Keys from '../../constants/Keys'
import { createUniqueIDFactory } from '../../utilities/id'

const ANIMATION_TIMEOUT = 200

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
      this.state = Object.assign({}, props, options, {
        id: uniqueID(),
        isMounted: props.isOpen
      })
      this.closePortal = this.closePortal.bind(this)
      this.openPortal = this.openPortal.bind(this)
      this.handleOnClose = this.handleOnClose.bind(this)
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
        isOpen: true,
        isMounted: true
      })
    }

    closePortal () {
      this.setState({
        isOpen: false,
        isMounted: false
      })
    }

    sequenceClosePortal (onClose) {
      setTimeout(() => {
        onClose()
      }, ANIMATION_TIMEOUT)
    }

    handleOnClose (onClose) {
      const { onBeforeClose } = this.props

      if (onClose && typeof onClose === 'function') {
        if (onBeforeClose) {
          onBeforeClose(() => this.sequenceClosePortal(onClose))
        } else {
          this.sequenceClosePortal(onClose)
        }
      } else {
        this.closePortal()
      }
    }

    getChildContext () {
      return {
        closePortal: this.closePortal
      }
    }

    render () {
      const {
        exact,
        isOpenProps,
        onBeforeClose,
        onBeforeOpen,
        onClose,
        onOpen,
        path,
        renderTo,
        trigger,
        timeout,
        ...rest
      } = this.props
      // Remapping open/mount state for ComposedComponent
      const { id, isOpen: portalIsMounted, isMounted: portalIsOpen } = this.state

      const openPortal = this.openPortal
      const handleOnClose = this.handleOnClose

      const uniqueIndex = parseInt(id.replace(options.id, ''), 10)
      const zIndex = options.zIndex ? options.zIndex + uniqueIndex : null

      const portalMarkup = (
        <Animate
          animateOnMount={false}
          in={portalIsMounted}
          unmountOnExit
          wait={ANIMATION_TIMEOUT}
        >
          <Portal
            onBeforeClose={handleOnClose}
            onClose={onClose}
            onBeforeOpen={onBeforeOpen}
            onOpen={onOpen}
            id={id}
            renderTo={renderTo}
            portalIsMounted={portalIsMounted}
            timeout={timeout}
            {...rest}
          >
            <ComposedComponent
              openPortal={openPortal}
              closePortal={handleOnClose}
              portalIsOpen={portalIsOpen}
              portalIsMounted={portalIsMounted}
              zIndex={zIndex}
              {...rest}
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
          <KeypressListener keyCode={Keys.ESCAPE} handler={handleOnClose} />
          {triggerMarkup}
          {portalContainerMarkup}
        </div>
      )
    }
  }

  PortalWrapper.childContextTypes = {
    closePortal: PropTypes.func
  }
  PortalWrapper.propTypes = propTypes
  PortalWrapper.defaultProps = defaultProps

  return PortalWrapper
}

export default PortalWrapper
