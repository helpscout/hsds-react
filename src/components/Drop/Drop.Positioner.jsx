/* istanbul ignore file */
/**
 ***DEPRECATED COMPONENT***
 ***DEPRECATED COMPONENT***
 ***DEPRECATED COMPONENT***

  Use Pop instead
 */
import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import ReactDOM from 'react-dom'
import EventListener from '../EventListener'
import classNames from 'classnames'
import { applyStylesToNode, isNodeElement } from '../../utilities/node'
import {
  getViewportPosition,
  getDirections,
} from '../../utilities/nodePosition'
import { noop } from '../../utilities/other'

import { DropContentUI, DropUI } from './Drop.css'

class DropPositioner extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      direction: props.direction
        ? getDirections(props.direction)
        : getDirections(),
    }

    this.position = null
    this.node = null
    this.contentNode = null
    this.updatePosition = this.updatePosition.bind(this)
  }

  position
  node
  triggerNode
  contentNode

  componentDidMount() {
    this.setTriggerNode()

    this.updatePosition()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.position !== this.position) {
      this.updatePosition(nextProps.position)
    }
  }

  setTriggerNode() {
    const { trigger } = this.props

    if (!this.triggerNode) {
      this.triggerNode = isNodeElement(trigger)
        ? trigger
        : ReactDOM.findDOMNode(trigger)
    }
  }

  getPosition() {
    const { direction, offset } = this.props

    if (!this.triggerNode || !this.contentNode) return false

    // the getOptimalViewportPosition method is tested.
    // However, I'm unable to test it with this component due to the difficulty
    // of setting up Enzyme to recognize the triggerNode
    return getViewportPosition({
      triggerNode: this.triggerNode,
      contentNode: this.contentNode,
      offset: offset,
      direction: getDirections(direction),
    })
  }

  updatePosition(newPosition) {
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

    if (this.direction !== pos.direction) {
      this.setState({ direction: pos.direction })
    }

    this.position = pos

    applyStylesToNode(this.node, nodeStyles)
    onUpdatePosition(pos)
  }

  render() {
    const {
      autoPosition,
      className,
      children,
      offset,
      onUpdatePosition,
      position,
      trigger,
      zIndex,
      ...rest
    } = this.props

    const { direction } = this.state

    const componentClassName = classNames(
      'c-DropPositioner',

      // Tested, but istanbul is not picking it up
      direction.x && `is-${direction.x}`,
      direction.y && `is-${direction.y}`,
      className
    )

    const updatePosition = this.updatePosition

    return (
      <DropUI
        className={componentClassName}
        ref={node => {
          this.node = node
        }}
        {...getValidProps(rest)}
      >
        <EventListener
          event="resize"
          handler={() => {
            return updatePosition()
          }}
        />
        <DropContentUI
          className="c-DropPositioner__content"
          ref={node => {
            this.contentNode = node
          }}
        >
          {children}
        </DropContentUI>
      </DropUI>
    )
  }
}

DropPositioner.propTypes = {
  className: PropTypes.string,
  autoPosition: PropTypes.bool,
  direction: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  offset: PropTypes.number,
  onUpdatePosition: PropTypes.func,
  position: PropTypes.shape({
    direction: PropTypes.shape({
      x: PropTypes.oneOf(['left', 'right', '']),
      y: PropTypes.oneOf(['up', 'down']),
    }),
    left: PropTypes.number,
    offsetTop: PropTypes.number,
    top: PropTypes.number,
  }),
  trigger: PropTypes.any,
  zIndex: PropTypes.number,
}

DropPositioner.defaultProps = {
  autoPosition: true,
  'data-cy': 'DropPositioner',
  direction: 'down',
  offset: 8,
  onUpdatePosition: noop,
  zIndex: 1000,
}

export default DropPositioner
