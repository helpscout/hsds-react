import * as React from 'react'
import { ButtonKind, ButtonSize } from '../Button/Button.types'
import propConnect from '../PropProvider/propConnect'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Icon from '../Icon'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { IconButtonUI } from './IconButton.css'
import { COMPONENT_KEY } from './IconButton.utils'
import { IconButtonShape } from './IconButton.types'

export interface Props {
  className?: string
  children?: any
  kind: ButtonKind
  icon: string
  iconSize: number
  innerRef: (node: HTMLElement) => void
  size: ButtonSize
  shape: IconButtonShape
}

export class IconButton extends React.PureComponent<Props> {
  static className = 'c-IconButton'
  static defaultProps = {
    icon: 'search',
    iconSize: 24,
    innerRef: noop,
    kind: 'default',
    size: 'md',
    shape: 'circle',
  }

  getClassName() {
    const { className, icon, size, shape } = this.props
    return classNames(
      IconButton.className,
      icon && `is-icon-${icon}`,
      shape && `is-${shape}`,
      size && `is-${size}`,
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
    const { children, icon, iconSize, innerRef, ...rest } = this.props

    return (
      <IconButtonUI
        {...getValidProps(rest)}
        className={this.getClassName()}
        innerRef={innerRef}
      >
        <Icon name={icon} size={this.getIconSize()} />
      </IconButtonUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(IconButton)

export default PropConnectedComponent
