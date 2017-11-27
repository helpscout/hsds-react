import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import Animate from '../Animate'
import KeypressListener from '../KeypressListener'
import { default as Portal, propTypes as portalTypes } from '../Portal'
import Keys from '../../constants/Keys'
import { createUniqueIDFactory } from '../../utilities/id'
import { setupManager } from '../../utilities/globalManager'

const defaultOptions = {
  id: 'PortalWrapper'
}

const managerNamespace = 'BluePortalWrapperManager'

const PortalWrapper = (options = defaultOptions) => ComposedComponent => {
  const propTypes = portalTypes

  const defaultProps = {
    isOpen: false,
    timeout: 200
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
      // Welcome aboard, Mr. Manager!
      this._MrManager = setupManager(managerNamespace)
      // Wow, I'm Mr. Manager!
      // Well, manager… we we just say manager.
    }

    componentDidMount () {
      const { id, isMounted } = this.state
      if (isMounted) {
        this._MrManager.add(id)
      }
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
      const { id } = this.state
      this.setState({
        isOpen: true,
        isMounted: true
      })
      this._MrManager.add(id)
    }

    closePortal () {
      const { id } = this.state
      if (this._MrManager.last() === id) {
        this.setState({
          isOpen: false,
          isMounted: false
        })
        this._MrManager.remove(id)
      }
    }

    sequenceClosePortal (onClose) {
      setTimeout(() => {
        onClose()
      }, this.state.timeout)
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
        className,
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
          wait={this.state.timeout}
        >
          <Portal
            onBeforeClose={handleOnClose}
            onClose={onClose}
            onBeforeOpen={onBeforeOpen}
            onOpen={onOpen}
            id={id}
            renderTo={renderTo}
            portalIsMounted={portalIsMounted}
            timeout={this.state.timeout}
            {...rest}
          >
            <ComposedComponent
              className={className}
              openPortal={openPortal}
              closePortal={handleOnClose}
              onClose={onClose}
              portalIsOpen={portalIsOpen}
              portalIsMounted={portalIsMounted}
              trigger={trigger}
              zIndex={zIndex}
              {...rest}
            />
          </Portal>
        </Animate>
      )

      const portalContainerMarkup = path ? (
        <Route exact={exact} path={path} render={props => portalMarkup} />
      ) : portalMarkup

      const triggerMarkup = trigger && React.isValidElement(trigger)
        ? React.cloneElement(trigger, {
          onClick: openPortal
        })
        : null

      return (
        <div className='c-PortalWrapper'>
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
