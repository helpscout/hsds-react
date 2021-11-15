import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'
import Icon from '../Icon'
import classNames from 'classnames'
import { noop } from '../../utilities/other'
import { IconButtonUI } from './IconButton.css'

export const IconButton = React.forwardRef((props, ref) => {
  const getClassName = () => {
    const { className, kind, icon, isBorderless } = props

    return classNames(
      IconButton.className,
      icon && `is-icon-${icon}`,
      kind && `is-kind-${kind}`,
      isBorderless && 'is-borderless',
      className
    )
  }

  const getIconSize = () => {
    const { iconSize, size } = props

    switch (size) {
      case 'xs':
        return 16

      case 'sm':
        return 18

      default:
        return iconSize
    }
  }

  const {
    children,
    icon,
    iconSize,
    isWithHiddenTitle,
    withCaret,
    ...rest
  } = props

  return (
    <IconButtonUI {...rest} className={getClassName()} ref={ref}>
      <Icon
        name={icon}
        size={getIconSize()}
        isWithHiddenTitle={isWithHiddenTitle}
        withCaret={withCaret}
      />
    </IconButtonUI>
  )
})

IconButton.className = 'c-IconButton'

IconButton.defaultProps = {
  ...Button.defaultProps,
  'data-cy': 'IconButton',
  icon: 'search',
  iconSize: 24,
  innerRef: noop,
  isBorderless: true,
  isWithHiddenTitle: false,
  kind: 'default',
  size: 'md',
  shape: 'circle',
  withCaret: false,
}

IconButton.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** The name of the icon to render. */
  icon: PropTypes.string,
  /** Renders a border around the [Button](../Button). */
  isBorderless: PropTypes.bool,
  /** Renders a caret for the icon */
  withCaret: PropTypes.bool,
  /** Adjusts the size of the icon. */
  iconSize: PropTypes.oneOf([
    8,
    10,
    12,
    13,
    14,
    15,
    16,
    18,
    20,
    24,
    32,
    48,
    52,
  ]),
  isWithHiddenTitle: PropTypes.bool,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default IconButton
