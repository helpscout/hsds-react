import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import Button, { Props as ButtonPropsInterface } from '../Button/ButtonV2'
import Icon from '../Icon'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { IconButtonUI } from './IconButton.css'
import { COMPONENT_KEY } from './IconButton.utils'

export interface Props extends ButtonPropsInterface {
  icon: string
  iconSize: number
  isBorderless: boolean
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
      withCaret,
      ...rest
    } = this.props

    return (
      <IconButtonUI
        {...rest}
        className={this.getClassName()}
        innerRef={innerRef}
        version={2}
      >
        <Icon name={icon} size={this.getIconSize()} withCaret={withCaret} />
      </IconButtonUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(IconButton)

export default PropConnectedComponent
