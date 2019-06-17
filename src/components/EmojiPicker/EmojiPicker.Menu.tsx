import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Dropdown from '../Dropdown/DropdownV2'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { EmojiPickerMenuProps } from './EmojiPicker.types'
import { MenuUI } from './styles/EmojiPicker.css'

class Menu extends React.PureComponent<EmojiPickerMenuProps> {
  static className = 'c-EmojiPickerMenu'

  static defaultProps = {
    className: '',
    'data-cy': 'EmojiPickerMenu',
    getItemProps: noop,
    items: [],
    size: 'default',
  }

  getClassName() {
    const { className } = this.props

    return classNames(Menu.className, className)
  }

  render() {
    const { children, ...rest } = this.props

    return (
      <Dropdown.Card {...getValidProps(rest)} className={this.getClassName()}>
        <MenuUI>{children}</MenuUI>
      </Dropdown.Card>
    )
  }
}
export default Menu
