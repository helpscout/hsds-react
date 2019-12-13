import * as React from 'react'

import Button, { Props as ButtonPropsInterface } from '../Button/Button'
import Icon from '../Icon'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { IconButtonUI } from './styles/IconButton.css'

export interface Props extends ButtonPropsInterface {
  icon: string
  iconSize: number
  isBorderless: boolean
  isWithHiddenTitle: boolean
  innerRef: (node: HTMLElement) => void
  withCaret: boolean
}

export class IconButton extends React.PureComponent<Props> {
  static className = 'c-IconButton'
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

  getIconSize(): number {
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

export default IconButton
