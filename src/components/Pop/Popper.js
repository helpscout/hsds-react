// @flow
import type { PopProps, PopperStyles } from './types'
import React, { Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import ReactPopper from '../Popper/Popper'
import Animate from '../Animate'
import Portal from '../Portal'
import Arrow from './Arrow'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { renderRenderPropComponent } from '../../utilities/component'
import { createUniqueIDFactory } from '../../utilities/id'

const uniqueID = createUniqueIDFactory('PopPopper')

type Props = PopProps

export class Popper extends Component<Props> {
  static defaultProps = {
    animationDelay: 0,
    animationDuration: 0,
    animationEasing: 'ease',
    animationSequence: 'fade',
    arrowSize: 5,
    modifiers: {},
    offset: 0,
    close: noop,
    onClick: noop,
    onContentClick: noop,
    onMouseLeave: noop,
    placement: 'auto',
    positionFixed: false,
    showArrow: true,
    zIndex: 1000,
  }

  id = uniqueID()

  getId() {
    return this.props.id || this.id
  }

  handleOnClick = (event: Event) => {
    /* istanbul ignore next */
    event && event.stopPropagation()
    this.props.onClick(event)
    this.props.onContentClick(event)
  }

  renderChildren = () => {
    const { children, close } = this.props
    return renderRenderPropComponent(children, { close })
  }

  render() {
    const {
      animationDelay,
      animationDuration,
      animationEasing,
      animationSequence,
      arrowClassName,
      arrowColor,
      arrowSize,
      className,
      children,
      offset,
      onClick,
      onMouseLeave,
      modifiers,
      positionFixed,
      placement,
      showArrow,
      zIndex,
      ...rest
    } = this.props

    const componentClassName = classNames('c-PopPopper', className)

    const animateProps = {
      delay: animationDelay,
      duration: animationDuration,
      easing: animationEasing,
      sequence: animationSequence,
      timeout: 0,
    }

    return (
      <ReactPopper
        modifiers={modifiers}
        placement={placement}
        positionFixed={positionFixed}
      >
        {({ ref, style, placement, arrowProps }) => (
          <Portal className="PopPortal" id={this.getId()}>
            <div
              {...getValidProps(rest)}
              className={componentClassName}
              data-placement={placement}
              onClick={this.handleOnClick}
              ref={ref}
              role="tooltip"
              style={{
                ...enhancePopperStyles({
                  arrowSize,
                  offset,
                  placement,
                  style,
                }),
                zIndex,
              }}
            >
              <Animate {...animateProps}>
                <div
                  className="c-PopPopperContentWrapper"
                  onMouseLeave={onMouseLeave}
                  style={{ position: 'relative', zIndex }}
                >
                  {this.renderChildren()}
                  <Arrow
                    color={arrowColor}
                    className={arrowClassName}
                    innerRef={arrowProps.ref}
                    placement={placement}
                    showArrow={showArrow}
                    style={arrowProps.style}
                    size={arrowSize}
                    zIndex={zIndex - 1}
                  />
                </div>
              </Animate>
            </div>
          </Portal>
        )}
      </ReactPopper>
    )
  }
}

/**
 * Adjust styles for the Popper HTML element.
 *
 * @param   {object} props
 * @returns {object}
 */
export const enhancePopperStyles = (props: PopperStyles = {}) => {
  const options = {
    arrowSize: props.arrowSize || 5,
    offset: props.offset || 0,
    placement: props.placement || 'top',
    style: props.style || {},
  }

  const { arrowSize, offset, placement, style } = options

  if (placement.indexOf('top') >= 0) {
    return {
      ...style,
      top: `${(arrowSize + offset) * -1}px`,
    }
  }
  if (placement.indexOf('bottom') >= 0) {
    return {
      ...style,
      top: `${(arrowSize + offset) * 1}px`,
    }
  }
  if (placement.indexOf('left') >= 0) {
    return {
      ...style,
      left: `${arrowSize / 2 * -1}px`,
    }
  }
  if (placement.indexOf('right') >= 0) {
    return {
      ...style,
      left: `${arrowSize / 2 * 1}px`,
    }
  }

  return style
}

export default Popper
