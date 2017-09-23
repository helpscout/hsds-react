import React, {PureComponent as Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import debounce from 'lodash.debounce'
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

      this.updatePosition = debounce(this.updatePosition.bind(this), 4)
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
      if (!this.triggerNode) return
      if (!portalOptions.autoPosition) return

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

      const popoverWrapperStyle = portalOptions.autoPosition
        ? Object.assign({}, style, {
          display: position.top === null ? 'none' : 'block',
          position: 'absolute',
          top: position.top,
          left: position.left,
          zIndex
        }) : null

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
