import * as React from 'react'
import { MenuUI } from './Dropdown.css.js'
import { classNames } from '../../../utilities/classNames'

export class Menu extends React.PureComponent<any> {
  render() {
    const { className, isSubMenu, ...rest } = this.props
    const componentClassName = classNames(
      className,
      isSubMenu && 'is-subMenu',
      'c-DropdownV2Menu'
    )

    return <MenuUI {...rest} className={componentClassName} />
  }
}

export default Menu
