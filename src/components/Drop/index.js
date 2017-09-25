import React, {PureComponent as Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import EventListener from '../EventListener'
import PortalWrapper from '../PortalWrapper'
import classNames from '../../utilities/classNames'
import { applyStylesToNode } from '../../utilities/node'
import { pureComponentShouldUpdate } from '../../utilities/components'
import { propTypes as portalTypes } from '../Portal'

export const propTypes = Object.assign({}, portalTypes, {
  trigger: PropTypes.oneOfType([PropTypes.element, PropTypes.object])
})

const popoverWrapperBaseZIndex = 1020

const defaultOptions = {
  autoPosition: true,
  id: 'Drop',
  offset: 8,
  timeout: 0,
  zIndex: popoverWrapperBaseZIndex
}

const Drop = (options = defaultOptions) => ComposedComponent => {
  const portalOptions = Object.assign({}, defaultOptions, options)

  class Drop extends Component {
    constructor (props) {
      super()

      this.state = {
        isOpen: false
      }

      this.position = {
        top: null,
        left: null
      }

      this.contentNode = null
      this.composedNode = null
      this.portal = null

      this.updatePosition = this.updatePosition.bind(this)
    }

    componentDidMount () {
      this.setTriggerNode()
      this.updatePosition()
    }

    componentWillReceiveProps (nextProps) {
      this.setState({ isOpen: nextProps.portalIsOpen })
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

    updatePosition () {
      // TODO: IMPLEMENT DIRECTIONS (Up, Right, Down, Left)
      // IT CURRENTLY ONLY ACCOUNTS FOR UP/DOWN
      if (!this.triggerNode) return
      if (!portalOptions.autoPosition) return
      const { zIndex } = this.props

      const triggerRect = this.triggerNode.getBoundingClientRect()
      const offset = portalOptions.offset
      let reposition = false
      let contentNodeRect

      if (this.contentNode) {
        contentNodeRect = this.contentNode.getBoundingClientRect()
        if (contentNodeRect.top + contentNodeRect.height > window.innerHeight) {
          reposition = true
        }
      }

      const top = reposition
        ? triggerRect.top - triggerRect.height - contentNodeRect.height
        : triggerRect.top + triggerRect.height

      const left = reposition
        ? (triggerRect.left + triggerRect.width) - contentNodeRect.width
        : triggerRect.left

      // TODO: Improve handling of calculations to avoid needing
      // to terminal on negative values.
      if (top < 0 || left < 0) return

      const position = {
        top: parseInt(top + offset + window.scrollY, 10),
        left: parseInt(left + window.scrollX, 10)
      }

      const nodeStyles = {
        display: position.top !== null ? 'block' : 'none',
        position: 'absolute',
        top: position.top,
        left: position.left,
        zIndex
      }

      applyStylesToNode(this.contentNode, nodeStyles)
      this.position = position
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
        className
      )

      const updatePosition = this.updatePosition

      return (
        <div
          className={componentClassName}
          ref={node => { this.contentNode = node }}
        >
          <EventListener event='resize' handler={updatePosition} />
          <div className='c-Drop__positioner' ref={node => { this.composedNode = node }}>
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

  return PortalWrapper(portalOptions)(Drop)
}

export default Drop
