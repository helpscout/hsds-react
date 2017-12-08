import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
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
  const extendedOptions = Object.assign(defaultOptions, options)

  const uniqueID = createUniqueIDFactory(extendedOptions.id)
  const uniqueIndex = createUniqueIndexFactory(1000)

  class PortalWrapper extends Component {
    constructor (props) {
      super()
      const composedWrapperClassName = getComponentDefaultProp(ComposedComponent, 'wrapperClassName')
      this.state = Object.assign({}, props, extendedOptions, {
        id: uniqueID(),
        isMounted: props.isOpen,
        wrapperClassName: classNames(
          props.wrapperClassName,
          composedWrapperClassName
        )
      })
      this.closePortal = this.closePortal.bind(this)
      this.openPortal = this.openPortal.bind(this)
      this.handleOnClose = this.handleOnClose.bind(this)
      this._portalWrapperId = uniqueIndex()
      // Welcome aboard, Mr. Manager!
      this._MrManager = setupManager(managerNamespace)
      // Wow, I'm Mr. Manager!
      // Well, manager… we we just say manager.
    }

    componentDidMount () {
      /* istanbul ignore else */
      if (this.props.path) {
        this.openPortal()
      }
    }

    componentWillReceiveProps (nextProps) {
      /* istanbul ignore else */
      if (nextProps.path) {
        this.openPortal()
      }
    }

    openPortal () {
      this.setState({
        isOpen: true,
        isMounted: true
      })
    }

    closePortal () {
      if (this._MrManager.max() === this._portalWrapperId) {
        this.setState({
          isOpen: false,
          isMounted: false
        })
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
        wrapperClassName: propsWrapperClassName,
        ...rest
      } = this.props
      // Remapping open/mount state for ComposedComponent
      const {
        id, isOpen: portalIsMounted,
        isMounted: portalIsOpen,
        wrapperClassName
      } = this.state

      const openPortal = this.openPortal
      const handleOnClose = this.handleOnClose

      const uniqueIndex = getUniqueIndex(id, options.id)
      const zIndex = options.zIndex ? options.zIndex + uniqueIndex : null

      const portalMarkup = (
        <Animate
          animateOnMount={false}
          in={portalIsMounted}
          unmountOnExit
          wait={this.state.timeout}
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
            timeout={this.state.timeout}
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

const getUniqueIndex = (id, namespace) => {
  return parseInt(id.replace(namespace, ''), 10)
}

PortalWrapper.Content = Content

export default PortalWrapper
