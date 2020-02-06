import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'
import Icon from '../Icon'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { IconButtonUI } from './IconButton.css'

export class IconButton extends React.PureComponent {
  static className = 'c-IconButton'

  static propTypes = {
    icon: PropTypes.string,
    iconSize: PropTypes.number,
    isBorderless: PropTypes.bool,
    isWithHiddenTitle: PropTypes.bool,
    innerRef: PropTypes.func,
    withCaret: PropTypes.bool,
  }

  static defaultProps = {
    ...Button.defaultProps,
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

    if (size === 'xs') {
      return 16
    }
    if (size === 'sm') {
      return 18
    }

    return iconSize
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

    const dataCy = this.props['data-cy'] || 'IconButton'

    return (
      <IconButtonUI
        {...rest}
        className={this.getClassName()}
        ref={innerRef}
        data-cy={dataCy}
      >
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

export default IconButton
