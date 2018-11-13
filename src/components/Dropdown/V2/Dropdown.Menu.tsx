import * as React from 'react'
import { MenuUI } from './Dropdown.css.js'
import { classNames } from '../../../utilities/classNames'
import { noop } from '../../../utilities/other'

export interface Props {
  className?: string
  id?: string
  innerRef: (node: HTMLElement) => void
  isSubMenu: boolean
  maxHeight: number
  maxWidth: number
  minHeight: number
  minWidth: number
  style: Object
  zIndex: number
}

export class Menu extends React.PureComponent<Props> {
  static defaultProps = {
    innerRef: noop,
    minWidth: 180,
    maxWidth: 360,
    minHeight: 48,
    maxHeight: 320,
    isSubMenu: false,
    style: {},
    zIndex: 1015,
  }

  getStyles = (): Object => {
    const {
      minWidth,
      minHeight,
      maxHeight,
      maxWidth,
      style,
      zIndex,
    } = this.props

    return { ...style, minWidth, minHeight, maxHeight, maxWidth, zIndex }
  }

  render() {
    const { className, innerRef, isSubMenu, ...rest } = this.props
    const componentClassName = classNames(
      className,
      isSubMenu && 'is-subMenu',
      'c-DropdownV2Menu'
    )

    return (
      <MenuUI
        {...rest}
        className={componentClassName}
        innerRef={innerRef}
        style={this.getStyles()}
      />
    )
  }
}

export default Menu
