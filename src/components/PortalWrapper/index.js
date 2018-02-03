import React, { PureComponent as Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { matchPath } from 'react-router'
import Animate from '../Animate'
import KeypressListener from '../KeypressListener'
import { default as Portal, propTypes as portalTypes } from '../Portal'
import Keys from '../../constants/Keys'
import {
  createUniqueIDFactory,
  createUniqueIndexFactory
} from '../../utilities/id'
import { getComponentDefaultProp } from '../../utilities/component'
import { setupManager } from '../../utilities/globalManager'
import classNames from '../../utilities/classNames'
import { requestAnimationFrame } from '../../utilities/other'
import Content from './Content'

const defaultOptions = {
  id: 'PortalWrapper'
}

const managerNamespace = 'BluePortalWrapperGlobalManager'

const PortalWrapper = (options = defaultOptions) => ComposedComponent => {
  const propTypes = portalTypes

  const defaultProps = {
    isOpen: false,
    timeout: 200
  }

  const contextTypes = {
    router: PropTypes.object
  }

  const extendedOptions = Object.assign({}, defaultOptions, options)

  const uniqueID = createUniqueIDFactory(extendedOptions.id)
  const uniqueIndex = createUniqueIndexFactory(1000)

  class PortalWrapper extends Component {
    constructor (props) {
      super()
      const composedWrapperClassName = getComponentDefaultProp(ComposedComponent, 'wrapperClassName')
      const composedWrapperTimeout = getComponentDefaultProp(ComposedComponent, 'timeout')
      const timeout = extendedOptions.timeout !== undefined ? extendedOptions.timeout : composedWrapperTimeout

      this.state = Object.assign({}, props, extendedOptions, {
        id: uniqueID(),
        isMounted: props.isOpen,
        timeout: timeout,
        wrapperClassName: classNames(
          props.wrapperClassName,
          composedWrapperClassName
        )
      })

      this.closePortal = this.closePortal.bind(this)
      this.openPortal = this.openPortal.bind(this)
      this.handleOnClose = this.handleOnClose.bind(this)
      this.triggerComponent = null
      this.triggerNode = null
      this._isMounted = false
      this._portalWrapperId = uniqueIndex()

      // Welcome aboard, Mr. Manager!
      this._MrManager = setupManager(managerNamespace)
      // Wow, I'm Mr. Manager!
      // Well, manager… we we just say manager.
    }

    componentDidMount () {
      const { path } = this.props
      this._isMounted = true
      this.setTriggerNode()
      /* istanbul ignore else */
      if (this.routeMatches(path)) {
        this.openPortal()
      }
    }

    componentWillReceiveProps (nextProps, nextState) {
      const { isOpen, path } = nextProps
      /* istanbul ignore else */
      if (this.routeMatches(path)) {
        return this.openPortal()
      }

      /* istanbul ignore else */
      if (isOpen !== this.state.isOpen) {
        return isOpen ? this.openPortal() : this.closePortal()
      }

      /* istanbul ignore else */
      if (!nextState.isOpen) {
        return this.refocusTriggerNode()
      }
    }

    componentWillUnmount () {
      this._isMounted = false
      this.triggerComponent = null
      this.triggerNode = null
    }

    safeSetState (state) {
      /* istanbul ignore else */
      if (this._isMounted) {
        this.setState(state)
      }
    }

    setTriggerNode () {
      /* istanbul ignore else */
      if (this.triggerComponent) {
        this.triggerNode = ReactDOM.findDOMNode(this.triggerComponent)
      }
    }

    refocusTriggerNode () {
      /* istanbul ignore else */
      if (this.triggerNode) {
        this.triggerNode.focus()
      }
    }

    routeMatches (path) {
      /* istanbul ignore next */
      // Context will always exist, except for Enzyme shallow/mount rendered
      // instances.
      if (!this.context) return false

      const { exact } = this.props
      const { router } = this.context

      if (!router || !router.history) return false

      const { history } = router

      if (path && history && history.location) {
        return matchPath(history.location.pathname, {path, exact}) !== null
      } else {
        return false
      }
    }

    openPortal () {
      this.safeSetState({
        isOpen: true,
        isMounted: true
      })
    }

    closePortal () {
      if (this._MrManager.max() === this._portalWrapperId) {
        this.safeSetState({
          isOpen: false,
          isMounted: false
        })
      }
    }

    sequenceClosePortal (onClose) {
      requestAnimationFrame(() => onClose())
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
        timeout: timeoutProp,
        wrapperClassName: propsWrapperClassName,
        ...rest
      } = this.props

      // Remapping open/mount state for ComposedComponent
      const {
        id,
        isOpen: portalIsMounted,
        isMounted: portalIsOpen,
        timeout: timeoutState,
        wrapperClassName
      } = this.state

      const openPortal = this.openPortal
      const handleOnClose = this.handleOnClose

      const uniqueIndex = getUniqueIndex(id, options.id)
      const zIndex = options.zIndex ? options.zIndex + uniqueIndex : null
      const timeout = timeoutState !== undefined ? timeoutState : timeoutProp

      const portalMarkup = (
        <Animate
          animateOnMount={false}
          timeout={timeout}
          in={portalIsMounted}
          unmountOnExit
        >
          <Portal
            className={wrapperClassName}
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
            <Content
              manager={this._MrManager}
              id={this._portalWrapperId}
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
            </Content>
          </Portal>
        </Animate>
      )

      const portalContainerMarkup = portalMarkup

      const triggerMarkup = trigger && React.isValidElement(trigger)
        ? React.cloneElement(trigger, {
          onClick: () => {
            const { onClick } = trigger.props
            /* istanbul ignore else */
            if (onClick && typeof onClick === 'function') {
              onClick()
            }
            openPortal()
          },
          ref: node => {
            const ref = trigger.ref
            if (ref && typeof ref === 'function') {
              ref(node)
            }
            this.triggerComponent = node
          }
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
  PortalWrapper.contextTypes = contextTypes
  PortalWrapper.displayName = 'PortalWrapper'

  return PortalWrapper
}

const getUniqueIndex = (id, namespace) => {
  return parseInt(id.replace(namespace, ''), 10)
}

PortalWrapper.Content = Content

export default PortalWrapper
