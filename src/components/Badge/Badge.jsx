import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'
import BadgeUI from './Badge.css'

const WrappedBadge = forwardRef(function Badge(props, ref) {
  const {
    children,
    color,
    count,
    className,
    display,
    inverted,
    isSquare,
    size,
    status,
    textColor,
    white,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-Badge',
    count && 'is-count',
    display && `is-display-${display}`,
    isSquare && `is-square`,
    size && `is-${size}`,
    status && `is-${status}`,
    white && 'is-white',
    className
  )

  return (
    <BadgeUI
      {...{ ...getValidProps(rest), color, inverted, textColor }}
      ref={ref}
      className={componentClassName}
    >
      {children}
    </BadgeUI>
  )
})

WrappedBadge.defaultProps = {
  'data-cy': 'Badge',
  display: 'inlineBlock',
  inverted: false,
  color: '',
  textColor: '',
}

WrappedBadge.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** A custom color value that can be passed in */
  color: PropTypes.string,
  count: PropTypes.bool,
  /** Determines the CSS `display` of the component. Default `inlineBlock`. */
  display: PropTypes.oneOf(['block', 'inlineBlock']),
  /** Inverts the colors of the background and text. */
  inverted: PropTypes.bool,
  /** Renders a square shape. */
  isSquare: PropTypes.bool,
  /** Adjust component size. */
  size: PropTypes.string,
  /** Changes the color of the component to the corresponding status. */
  status: PropTypes.oneOf(['error', 'info', 'success', 'warning']),
  /** Changes the color of text. */
  textColor: PropTypes.string,
  /** Applies a white style to the component. */
  white: PropTypes.bool,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default WrappedBadge
