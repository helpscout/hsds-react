import * as React from 'react'
import ReactDOM from 'react-dom'
import EventListener from '../EventListener'
import { classNames } from '../../utilities/classNames'
import { applyStylesToNode, isNodeElement } from '../../utilities/node'
import {
  getViewportPosition,
  getDirections,
} from '../../utilities/nodePosition'
import { noop } from '../../utilities/other'

export interface DropPositionerProps {
  autoPosition: boolean
  direction: string
  offset: number
  onUpdatePosition: (...args: any[]) => void
  position?: {
    direction: {
      x: 'left' | 'right' | ''
      y: 'up' | 'down'
    }
    left: number
    offsetTop: number
    top: number
  }
  trigger: Element | object
  zIndex: number
}

class Positioner extends React.PureComponent<DropPositionerProps> {
  constructor(props) {
    super(props)
    /* istanbul ignore next */
    this.state = {
      direction: props.direction
        ? getDirections(props.direction)
        : getDirections(),
    }

    // TODO: fix typescript complains
    // @ts-ignore
    this.position = null
    // TODO: fix typescript complains
    // @ts-ignore
    this.node = null
    // TODO: fix typescript complains
    // @ts-ignore
    this.contentNode = null
    this.updatePosition = this.updatePosition.bind(this)
  }

  static defaultProps = {
    autoPosition: true,
    direction: 'down',
    offset: 8,
    onUpdatePosition: noop,
    zIndex: 1000,
  }

  componentDidMount() {
    this.setTriggerNode()
    // TODO: fix typescript complains
    // @ts-ignore
    this.updatePosition()
  }

  componentWillReceiveProps(nextProps) {
    // TODO: fix typescript complains
    // @ts-ignore
    if (nextProps.position !== this.position) {
      this.updatePosition(nextProps.position)
    }
  }

  setTriggerNode() {
    // TODO: fix typescript complains
    // @ts-ignore
    const { trigger } = this.props
    /* istanbul ignore next */
    // TODO: fix typescript complains
    // @ts-ignore
    if (!this.triggerNode) {
      // TODO: fix typescript complains
      // @ts-ignore
      this.triggerNode = isNodeElement(trigger)
        ? trigger
        : // TODO: fix typescript complains
          // @ts-ignore
          ReactDOM.findDOMNode(trigger)
    }
  }

  getPosition() {
    // TODO: fix typescript complains
    // @ts-ignore
    const { direction, offset } = this.props

    /* istanbul ignore next */
    // TODO: fix typescript complains
    // @ts-ignore
    if (!this.triggerNode || !this.contentNode) return false

    /* istanbul ignore next */
    // the getOptimalViewportPosition method is tested.
    // However, I'm unable to test it with this component due to the difficulty
    // of setting up Enzyme to recognize the triggerNode
    return getViewportPosition({
      // TODO: fix typescript complains
      // @ts-ignore
      triggerNode: this.triggerNode,
      // TODO: fix typescript complains
      // @ts-ignore
      contentNode: this.contentNode,
      offset: offset,
      direction: getDirections(direction),
    })
  }

  /* istanbul ignore next */
  updatePosition(newPosition) {
    // TODO: fix typescript complains
    // @ts-ignore
    const { autoPosition, onUpdatePosition, position, zIndex } = this.props

    if (!autoPosition) return

    const pos = newPosition || position || this.getPosition()
    if (!pos) return

    // Cannot test transform style in JSDOM :'(
    // https://github.com/chad3814/CSSStyleDeclaration/pull/49
    const nodeStyles = {
      display: pos.offsetTop !== undefined ? 'block' : 'none',
      transform: `translate(${pos.left}px, ${pos.top}px)`,
      zIndex,
    }

    // TODO: fix typescript complains
    // @ts-ignore
    if (this.direction !== pos.direction) {
      this.setState({ direction: pos.direction })
    }

    // TODO: fix typescript complains
    // @ts-ignore
    this.position = pos

    /* istanbul ignore next */
    // TODO: fix typescript complains
    // @ts-ignore
    applyStylesToNode(this.node, nodeStyles)
    onUpdatePosition(pos)
  }

  render() {
    const {
      // TODO: fix typescript complains
      // @ts-ignore
      autoPosition,
      // TODO: fix typescript complains
      // @ts-ignore
      className,
      children,
      // TODO: fix typescript complains
      // @ts-ignore
      offset,
      // TODO: fix typescript complains
      // @ts-ignore
      onUpdatePosition,
      // TODO: fix typescript complains
      // @ts-ignore
      position,
      // TODO: fix typescript complains
      // @ts-ignore
      trigger,
      // TODO: fix typescript complains
      // @ts-ignore
      zIndex,
      ...rest
    } = this.props

    // TODO: fix typescript complains
    // @ts-ignore
    const { direction } = this.state

    const componentClassName = classNames(
      'c-DropPositioner',
      /* istanbul ignore next */
      // Tested, but istanbul is not picking it up
      direction.x && `is-${direction.x}`,
      direction.y && `is-${direction.y}`,
      className
    )

    const updatePosition = this.updatePosition

    return (
      <div
        className={componentClassName}
        ref={node => {
          // TODO: fix typescript complains
          // @ts-ignore
          this.node = node
        }}
        {...rest}
      >
        <EventListener
          event="resize"
          handler={() => {
            // TODO: fix typescript complains
            // @ts-ignore
            return updatePosition()
          }}
        />
        <div
          className="c-DropPositioner__content"
          ref={node => {
            // TODO: fix typescript complains
            // @ts-ignore
            this.contentNode = node
          }}
        >
          {children}
        </div>
      </div>
    )
  }
}

// TODO: fix typescript complains
// @ts-ignore
Positioner.displayName = 'DropPositioner'

export default Positioner
