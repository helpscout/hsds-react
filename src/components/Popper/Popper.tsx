/* istanbul ignore file */
import * as React from 'react'
import PopperJS from '../../utilities/popper.lib'
import { ManagerContext } from './Popper.Manager'
import { safeInvoke, unwrapArray } from './Popper.utils'

type ReferenceElement = any
type StyleOffsets = { top: number; left: number }
type StylePosition = { position: 'absolute' | 'fixed' }

export type PopperArrowProps = {
  ref: any
  style: StyleOffsets
}

export type PopperChildrenProps = {
  ref: any
  style: StyleOffsets & StylePosition
  placement: any
  outOfBoundaries?: boolean
  scheduleUpdate: () => void
  arrowProps: PopperArrowProps
}

export type PopperChildren = any

export type PopperProps = {
  children: PopperChildren
  eventsEnabled?: boolean
  ref?: any
  modifiers?: any
  placement?: any
  positionFixed?: boolean
  referenceElement?: ReferenceElement
}

type PopperState = {
  popperNode?: HTMLElement
  arrowNode?: HTMLElement
  popperInstance?: any
  data?: any
}

const initialStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  opacity: 0,
  pointerEvents: 'none',
}

const initialArrowStyle = {}

export class InnerPopper extends React.Component<PopperProps, PopperState> {
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
  arrowNodeRef: any = null

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
      // TODO: fix typescript complains
      // @ts-ignore
      this.state.popperInstance.destroy()
    }
  }

  safeSetState(state, callback?) {
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
    fn: (data: Object) => {
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
          // TODO: fix typescript complains
          // @ts-ignore
          position: this.state.data.offsets.popper.position,
          // TODO: fix typescript complains
          // @ts-ignore
          ...this.state.data.styles,
        }

  getPopperPlacement = () =>
    // TODO: fix typescript complains
    // @ts-ignore
    !this.state.data ? undefined : this.state.data.placement

  getArrowStyle = () =>
    !this.arrowNodeRef.current || !this.state.data
      ? initialArrowStyle
      : // TODO: fix typescript complains
        // @ts-ignore
        this.state.data.arrowStyles

  getOutOfBoundariesState = () =>
    // TODO: fix typescript complains
    // @ts-ignore
    this.state.data ? this.state.data.hide : undefined

  initPopperInstance = () => {
    const { referenceElement } = this.props
    const { popperInstance } = this.state
    if (referenceElement && this.state.popperNode && !popperInstance) {
      // TODO: fix typescript complains
      // @ts-ignore
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

  destroyPopperInstance = (callback: () => boolean) => {
    if (this.state.popperInstance) {
      // TODO: fix typescript complains
      // @ts-ignore
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
      // TODO: fix typescript complains
      // @ts-ignore
      this.state.popperInstance.scheduleUpdate()
    }
  }

  componentDidUpdate(prevProps: PopperProps, prevState: PopperState) {
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

export default function Popper(props: PopperProps) {
  return (
    <ManagerContext.Consumer>
      {({ referenceNode }) => (
        <InnerPopper referenceElement={referenceNode} {...props} />
      )}
    </ManagerContext.Consumer>
  )
}
