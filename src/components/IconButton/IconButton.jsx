import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'
import Icon from '../Icon'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { IconButtonUI } from './IconButton.css'

export class IconButton extends React.PureComponent {
  static className = 'c-IconButton'

  getClassName() {
    const { className, kind, icon, isBorderless } = this.props

    return classNames(
      IconButton.className,
      icon && `is-icon-${icon}`,
      kind && `is-kind-${kind}`,
      isBorderless && 'is-borderless',
      className
    )
  }

  getIconSize() {
    const { iconSize, size } = this.props

    switch (size) {
      case 'xs':
        return 16

      case 'sm':
        return 18

      default:
        return iconSize
    }
  }

  render() {
    const {
      children,
      icon,
      iconSize,
      innerRef,
      isWithHiddenTitle,
      withCaret,
      ...rest
    } = this.props

    return (
      <IconButtonUI {...rest} className={this.getClassName()} ref={innerRef}>
        <Icon
          name={icon}
          size={this.getIconSize()}
          isWithHiddenTitle={isWithHiddenTitle}
          withCaret={withCaret}
        />
      </IconButtonUI>
    )
  }
}

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
  innerRef: PropTypes.func,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default IconButton
