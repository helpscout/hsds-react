// @flow
import React, { Component } from 'react'
import { Popper as ReactPopper } from 'react-popper'
import Animate from '../Animate'
import Portal from '../Portal'
import Arrow from './Arrow'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import type { Props } from './types'

class Popper extends Component<Props> {
  handleOnClick = event => {
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
      placement,
      showArrow,
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
      <Portal>
        <ReactPopper placement={placement} positionFixed>
          {({ ref, style, placement, arrowProps }) => (
            <div
              className={componentClassName}
              data-placement={placement}
              onClick={this.handleOnClick}
              ref={ref}
              role="tooltip"
              style={makeStyles({ arrowSize, offset, placement, style })}
              {...rest}
            >
              <Animate {...animateProps}>
                {children}
                {showArrow && (
                  <div
                    className="c-PopPopper__arrowWrapper"
                    ref={arrowProps.ref}
                  >
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

const makeStyles = ({ arrowSize, offset, placement, style }) => {
  if (!placement) return style

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
}

Popper.defaultProps = {
  animationDelay: 0,
  animationDuration: 0,
  animationEasing: 'ease',
  animationSequence: 'fade',
  arrowSize: 5,
  offset: 0,
  onClick: noop,
  placement: 'auto',
  showArrow: true,
}

export default Popper
