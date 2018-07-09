// @flow
import React, { Component } from 'react'
import ReactPopper from '../Popper/Popper'
import Animate from '../Animate'
import Portal from '../Portal'
import Arrow from './Arrow'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import type { PopProps, Placement, PopperStyles } from './types'

type Props = PopProps

class Popper extends Component<Props> {
  static defaultProps = {
    animationDelay: 0,
    animationDuration: 0,
    animationEasing: 'ease',
    animationSequence: 'fade',
    arrowSize: 5,
    modifiers: {},
    offset: 0,
    onClick: noop,
    placement: 'auto',
    positionFixed: false,
    showArrow: true,
    zIndex: 1000,
  }

  portal = null

  componentWillUnmount = () => {
    this.portal = null
  }

  handleOnClick = (event: Event) => {
    /* istanbul ignore next */
    event && event.stopPropagation()
    this.props.onClick(event)
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
    }

    return (
      <Portal ref={ref => (this.portal = ref)}>
        <ReactPopper
          modifiers={modifiers}
          placement={placement}
          positionFixed={positionFixed}
        >
          {({ ref, style, placement, arrowProps }) => (
            <div
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
              {...rest}
            >
              <Animate {...animateProps}>
                {children}
                {showArrow && (
                  <div className="c-PopPopper__arrowWrapper">
                    <Arrow
                      color={arrowColor}
                      className={arrowClassName}
                      placement={placement}
                      size={arrowSize}
                    />
                  </div>
                )}
              </Animate>
            </div>
          )}
        </ReactPopper>
      </Portal>
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
      left: `${(arrowSize * 2 + offset) * -1}px`,
    }
  }
  if (placement.indexOf('right') >= 0) {
    return {
      ...style,
      left: `${(arrowSize * 2 + offset) * 1}px`,
    }
  }

  return style
}

export default Popper
