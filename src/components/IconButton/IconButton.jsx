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

IconButton.propTypes = {
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  icon: PropTypes.string,
  iconSize: PropTypes.number,
  isBorderless: PropTypes.bool,
  isWithHiddenTitle: PropTypes.bool,
  innerRef: PropTypes.func,
  withCaret: PropTypes.bool,
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

export default IconButton
