/* istanbul ignore file */
import React from 'react'
import PropTypes from 'prop-types'
import PopperJS from '../../utilities/popper.lib'
import { ManagerContext } from './Popper.Manager'
import { safeInvoke, unwrapArray } from './Popper.utils'

const initialStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  opacity: 0,
  pointerEvents: 'none',
}

const initialArrowStyle = {}

export class InnerPopper extends React.Component {
  static defaultProps = {
    placement: 'bottom',
    eventsEnabled: true,
    referenceElement: undefined,
    positionFixed: false,
  }

  state = {
    popperNode: undefined,
    arrowNode: undefined,
    popperInstance: undefined,
    data: undefined,
  }
  arrowNodeRef = null
  _isMounted = false

  constructor(props) {
    super(props)
    this.arrowNodeRef = React.createRef()
  }

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
    if (this.state.popperInstance) {
      this.state.popperInstance.destroy()
    }
  }

  safeSetState(state, callback) {
    if (this._isMounted) {
      return this.setState(state, callback)
    }
  }

  setPopperNode = popperNode => {
    safeInvoke(this.props.ref, popperNode)
    this.safeSetState({ popperNode })
  }

  updateStateModifier = {
    enabled: true,
    order: 900,
    fn: data => {
      this.safeSetState({ data })
      return data
    },
  }

  getOptions = () => ({
    placement: this.props.placement,
    eventsEnabled: this.props.eventsEnabled,
    positionFixed: this.props.positionFixed,
    modifiers: {
      ...this.props.modifiers,
      arrow: {
        enabled: !!this.arrowNodeRef.current,
        element: this.arrowNodeRef.current,
      },
      applyStyle: { enabled: false },
      updateStateModifier: this.updateStateModifier,
    },
  })

  getPopperStyle = () =>
    !this.state.popperNode || !this.state.data
      ? initialStyle
      : {
          position: this.state.data.offsets.popper.position,

          ...this.state.data.styles,
        }

  getPopperPlacement = () =>
    !this.state.data ? undefined : this.state.data.placement

  getArrowStyle = () =>
    !this.arrowNodeRef.current || !this.state.data
      ? initialArrowStyle
      : this.state.data.arrowStyles

  getOutOfBoundariesState = () =>
    this.state.data ? this.state.data.hide : undefined

  initPopperInstance = () => {
    const { referenceElement } = this.props
    const { popperInstance } = this.state
    if (referenceElement && this.state.popperNode && !popperInstance) {
      const popperInstance = new PopperJS(
        referenceElement,
        this.state.popperNode,
        this.getOptions()
      )
      this.safeSetState({ popperInstance })
      return true
    }
    return false
  }

  destroyPopperInstance = callback => {
    if (this.state.popperInstance) {
      this.state.popperInstance.destroy()
    }
    this.safeSetState({ popperInstance: undefined }, callback)
  }

  updatePopperInstance = () => {
    if (this.state.popperInstance) {
      this.destroyPopperInstance(() => this.initPopperInstance())
    }
  }

  scheduleUpdate = () => {
    if (this.state.popperInstance) {
      this.state.popperInstance.scheduleUpdate()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // If needed, initialize the Popper.js instance
    // it will return `true` if it initialized a new instance, or `false` otherwise
    // if it returns `false`, we make sure Popper props haven't changed, and update
    // the Popper.js instance if needed
    if (!this.initPopperInstance()) {
      // If the Popper.js options have changed, update the instance (destroy + create)
      if (
        this.props.placement !== prevProps.placement ||
        this.props.eventsEnabled !== prevProps.eventsEnabled ||
        this.props.referenceElement !== prevProps.referenceElement ||
        this.props.positionFixed !== prevProps.positionFixed
      ) {
        this.updatePopperInstance()
      }
    }
  }

  render() {
    return unwrapArray(this.props.children)({
      ref: this.setPopperNode,
      style: this.getPopperStyle(),
      placement: this.getPopperPlacement(),
      outOfBoundaries: this.getOutOfBoundariesState(),
      scheduleUpdate: this.scheduleUpdate,
      arrowProps: {
        ref: this.arrowNodeRef,
        style: this.getArrowStyle(),
      },
    })
  }
}

const placements = PopperJS.placements
export { placements }

InnerPopper.propTypes = {
  children: PropTypes.shape({
    ref: PropTypes.any,
    style: PropTypes.oneOf([
      PropTypes.any,
      PropTypes.shape({ position: PropTypes.oneOf(['absolute', 'fixed']) }),
    ]),
    placement: PropTypes.any,
    outOfBoundaries: PropTypes.bool,
    scheduleUpdate: PropTypes.func,
    arrowProps: PropTypes.shape({
      ref: PropTypes.any,
      style: PropTypes.shape({ top: PropTypes.number, left: PropTypes.number }),
    }),
  }),
  eventsEnabled: PropTypes.bool,
  ref: PropTypes.any,
  modifiers: PropTypes.any,
  placement: PropTypes.any,
  positionFixed: PropTypes.bool,
  referenceElement: PropTypes.any,
}

export default function Popper(props) {
  return (
    <ManagerContext.Consumer>
      {({ referenceNode }) => (
        <InnerPopper referenceElement={referenceNode} {...props} />
      )}
    </ManagerContext.Consumer>
  )
}

Popper.propTypes = InnerPopper.propTypes
