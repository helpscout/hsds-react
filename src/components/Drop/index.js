import React, {PureComponent as Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import EventListener from '../EventListener'
import PortalWrapper from '../PortalWrapper'
import classNames from '../../utilities/classNames'
import { propTypes as portalTypes } from '../Portal'
import {
  applyStylesToNode,
  getOptimalViewportPosition
} from '../../utilities/node'

export const propTypes = Object.assign({}, portalTypes, {
  trigger: PropTypes.oneOfType([PropTypes.element, PropTypes.object]),
  direction: PropTypes.string
})

const defaultProps = {
  direction: 'down'
}

const popoverWrapperBaseZIndex = 1020

const defaultOptions = {
  autoPosition: true,
  id: 'Drop',
  offset: 4,
  timeout: 0,
  zIndex: popoverWrapperBaseZIndex
}

const Drop = (options = defaultOptions) => ComposedComponent => {
  const portalOptions = Object.assign({}, defaultOptions, options)

  class Drop extends Component {
    constructor (props) {
      super()

      this.position = {
        top: null,
        left: null
      }

      this.contentNode = null
      this.composedNode = null
      this.portal = null
      this.direction = {
        x: '',
        y: 'down'
      }

      this.updatePosition = this.updatePosition.bind(this)
    }

    componentDidMount () {
      this.setTriggerNode()
      this.updatePosition()
    }

    componentDidUpdate () {
      this.setTriggerNode()
      this.updatePosition()
    }

    setTriggerNode () {
      if (!this.triggerNode) {
        this.triggerNode = ReactDOM.findDOMNode(this.props.trigger)
      }
    }

    getDirectionX () {
      const { direction } = this.props
      // No defaults
      return direction.match(/left/) ? 'left'
        : direction.match(/right/) ? 'right'
        : ''
    }

    getDirectionY () {
      const { direction } = this.props
      // Default to down
      return direction.match(/up/) ? 'up'
        : direction.match(/down/) ? 'down'
        : 'down'
    }

    getDirections () {
      return {
        x: this.getDirectionX(),
        y: this.getDirectionY()
      }
    }

    updatePosition () {
      if (!this.triggerNode || !this.composedNode) return
      if (!portalOptions.autoPosition) return
      const { zIndex } = this.props

      const position = getOptimalViewportPosition({
        triggerNode: this.triggerNode,
        contentNode: this.composedNode,
        offset: portalOptions.offset,
        direction: this.getDirections()
      })

      const nodeStyles = {
        display: position.offsetTop !== null ? 'block' : 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        transform: `translate(${position.left}px, ${position.top}px)`,
        zIndex
      }

      applyStylesToNode(this.contentNode, nodeStyles)
      this.position = { top: position.top, left: position.left }
      this.direction = position.direction
    }

    render () {
      const {
        className,
        closePortal,
        direction,
        exact,
        isOpen,
        openPortal,
        path,
        portalIsOpen,
        portalIsMounted,
        style,
        timeout,
        trigger,
        triggerNode,
        zIndex,
        ...rest
      } = this.props

      const componentClassName = classNames(
        'c-Drop',
        className,
        this.direction.x && `is-${this.direction.x}`,
        this.direction.y && `is-${this.direction.y}`
      )

      const updatePosition = this.updatePosition

      return (
        <div
          className={componentClassName}
          ref={node => { this.contentNode = node }}
        >
          <EventListener event='resize' handler={updatePosition} />
          <div className='c-Drop__positioner' ref={node => { this.composedNode = node }} style={{ display: 'inline-block' }}>
            <ComposedComponent
              closePortal={closePortal}
              isOpen={portalIsOpen}
              {...rest}
            />
          </div>
        </div>
      )
    }
  }

  Drop.propTypes = propTypes
  Drop.defaultProps = defaultProps

  return PortalWrapper(portalOptions)(Drop)
}

export default Drop
