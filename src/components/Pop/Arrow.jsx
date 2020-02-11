import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { ArrowUI } from './Arrow.css'

export class Arrow extends React.PureComponent {
  static defaultProps = {
    'data-cy': 'PopArrow',
    ref: null,
    offset: 0,
    placement: 'top',
    showArrow: true,
    size: 5,
    style: {},
    zIndex: 999,
  }

  render() {
    const {
      className,
      children,
      color,
      arrowRef,
      placement,
      offset,
      showArrow,
      size,
      style,
      theme,
      zIndex,
      ...rest
    } = this.props

    const position = getPosition(placement)

    const positionClassName = classNames(
      placement && `is-${getPlacement(placement)}`,
      position && `is-${position}`
    )

    const wrapperClassName = classNames(
      'c-PopPopperArrowWrapper',
      !showArrow && 'is-hidden',
      positionClassName
    )

    const componentClassName = classNames(
      'c-PopArrow',
      positionClassName,
      className
    )

    const ghostClassName = classNames(
      'c-PopArrow',
      'c-PopArrowGhost',
      'is-ghost',
      positionClassName,
      className
    )

    const componentStyle = { zIndex }
    const ghostComponentStyle = { zIndex: zIndex + 3 }

    return (
      <ArrowUI
        className={wrapperClassName}
        ref={this.props.arrowRef}
        data-x-placement={placement}
        color={color}
        size={size}
        style={sanitizeStyles(style)}
      >
        <div
          {...getValidProps(rest)}
          className={componentClassName}
          style={componentStyle}
        />
        <div
          {...getValidProps(rest)}
          className={ghostClassName}
          style={ghostComponentStyle}
        />
      </ArrowUI>
    )
  }
}

/**
 * Gets the top|right|bottom|left label from a Popper placement
 *
 * @param   {string} placement
 * @returns {string}
 */
export const getPlacement = placement => {
  if (!placement) return ''

  return placement.split('-')[0]
}

/**
 * Gets the start|end label from a Popper placement
 *
 * @param   {string} placement
 * @returns {string}
 */
export const getPosition = placement => {
  if (!placement || placement.indexOf('-') < 0) return ''

  return placement.split('-')[1]
}

// This is primarily for popper.js within the test JSDOM environment
// https://github.com/FezVrasta/popper.js/issues/478
export const sanitizeStyles = style => {
  const { left, top } = style

  return {
    ...style,
    left: isNaN(left) ? 0 : left,
    top: isNaN(top) ? 0 : top,
  }
}

Arrow.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
  arrowRef: PropTypes.node,
  placement: PropTypes.string,
  offset: PropTypes.number,
  size: PropTypes.number,
  style: PropTypes.object,
  showArrow: PropTypes.bool,
  theme: PropTypes.oneOf([PropTypes.object, PropTypes.string]),
  zIndex: PropTypes.number,
}

export default Arrow
