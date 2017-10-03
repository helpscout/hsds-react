import React, {PureComponent as Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import EventListener from '../EventListener'
import PortalWrapper from '../PortalWrapper'
import classNames from '../../utilities/classNames'
import { pureComponentShouldUpdate } from '../../utilities/components'
import { propTypes as portalTypes } from '../Portal'
import {
  applyStylesToNode,
  getViewportHeight,
  getViewportWidth
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

    shouldComponentUpdate (nextProps, nextState) {
      return pureComponentShouldUpdate(this, nextProps, nextState)
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

    updatePosition () {
      if (!this.triggerNode || !this.contentNode) return
      if (!portalOptions.autoPosition) return
      const { zIndex } = this.props

      const pos = this.triggerNode.getBoundingClientRect()
      const nodePos = this.composedNode.getBoundingClientRect()
      const height = this.composedNode.offsetHeight
      const width = this.composedNode.offsetWidth
      const boundingOffset = 8
      const triggerOffset = portalOptions.offset
      const offset = triggerOffset + boundingOffset
      const offsetTop = pos.top > this.triggerNode.offsetTop ? pos.top : this.triggerNode.offsetTop
      const offsetLeft = pos.left > this.triggerNode.offsetLeft ? pos.left : this.triggerNode.offsetLeft
      const viewportHeight = getViewportHeight()
      const viewportWidth = getViewportWidth()
      const posSize = offsetTop + pos.height

      let top
      let left
      let directionX = this.getDirectionX()
      let directionY = this.getDirectionY()

      directionX = directionX === 'right' && offsetLeft + width + offset > viewportWidth ? 'left'
        : directionX === 'left' && offsetLeft - width - offset < 0 ? 'right'
        : directionX

      directionY = directionY === 'down' && posSize + height + offset > viewportHeight && posSize - height - offset > 0 ? 'up'
        : directionY === 'up' && posSize - height - offset < 0 ? 'down'
        : directionY

      switch (directionY) {
        case 'up' :
          top = offsetTop - triggerOffset - nodePos.height
          break

        case 'down' :
          top = offsetTop + pos.height + triggerOffset
          break
      }

      switch (directionX) {
        case 'left' :
          left = offsetLeft - triggerOffset - nodePos.width
          if (directionY === 'down') {
            top = offsetTop
          } else {
            top = offsetTop - nodePos.height + pos.height
          }
          break

        case 'right' :
          left = offsetLeft + pos.width + triggerOffset
          if (directionY === 'down') {
            top = offsetTop
          } else {
            top = offsetTop - nodePos.height + pos.height
          }
          break

        default :
          left = offsetLeft
          break
      }

      const nodeStyles = {
        display: offsetTop !== null ? 'block' : 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        transform: `translate(${left}px, ${top}px)`,
        zIndex
      }

      applyStylesToNode(this.contentNode, nodeStyles)
      this.position = { top, left }
      this.direction = { x: directionX, y: directionY }
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
