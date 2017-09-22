import React, {PureComponent as Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import EventListener from '../EventListener'
import PortalWrapper from '../PortalWrapper'
import classNames from '../../utilities/classNames'
import { propTypes as portalTypes } from '../Portal'
import { requestAnimationFrame } from '../../utilities/other'

export const propTypes = Object.assign({}, portalTypes, {
  trigger: PropTypes.oneOfType([PropTypes.element, PropTypes.object])
})

const popoverWrapperBaseZIndex = 1020

const defaultOptions = {
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

      this.contentNode = null
      this.composedNode = null
      this.portal = null

      this.state = {
        position: {
          top: null,
          left: null
        },
        isOpen: false
      }

      this.updatePosition = this.updatePosition.bind(this)
    }

    componentDidMount () {
      this.setTriggerNode()
    }

    componentWillReceiveProps (nextProps) {
      this.setState({ isOpen: nextProps.portalIsOpen })
      this.updatePosition()
    }

    shouldComponentUpdate (nextProps, nextState) {
      // return this.state.isOpen !== nextState.isOpen
      return true
    }

    componentDidUpdate () {
      this.setTriggerNode()
      // this.updatePosition()
    }

    setTriggerNode () {
      if (!this.triggerNode) {
        this.triggerNode = ReactDOM.findDOMNode(this.props.trigger)
      }
    }

    updatePosition () {
      const el = this.triggerNode
      if (!el) return

      const cr = el.getBoundingClientRect()
      const offset = portalOptions.offset
      let reposition = false
      let ccr

      if (this.contentNode) {
        ccr = this.contentNode.getBoundingClientRect()
        if (ccr.top + ccr.height > window.innerHeight) {
          reposition = true
        }
      }

      const top = reposition
        ? cr.top - cr.height - ccr.height
        : cr.top + cr.height

      const left = reposition
        ? (cr.left + cr.width) - ccr.width
        : cr.left

      const position = {
        top: parseInt(top + offset + window.scrollY, 10),
        left: parseInt(left + window.scrollX, 10)
      }

      if (
        this.state.position.top !== position.top ||
        this.state.position.left !== position.left
      ) {
        requestAnimationFrame(() => {
          this.setState({
            position
          })
        })
      }
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
      const { position } = this.state

      const componentClassName = classNames(
        'c-Drop',
        className
      )

      const updatePosition = this.updatePosition

      const popoverWrapperStyle = Object.assign({}, style, {
        display: position.top === null ? 'none' : 'block',
        position: 'absolute',
        top: position.top,
        left: position.left,
        zIndex
      })

      return (
        <div
          className={componentClassName}
          style={popoverWrapperStyle}
          ref={node => { this.contentNode = node }}
          {...rest}
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
