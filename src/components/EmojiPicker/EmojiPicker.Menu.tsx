import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Dropdown from '../Dropdown/DropdownV2'
import { getItemProps } from '../Dropdown/V2/Dropdown.utils'
import Item from './EmojiPicker.Item'
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

  renderItems() {
    const { items, renderItem, size } = this.props

    return items.map((item, index) => {
      const itemProps = {
        ...item,
        ...getItemProps(item, index),
        renderItem,
        size,
      } as any

      return <Item {...itemProps} />
    })
  }

  render() {
    const { renderMenu, ...rest } = this.props

    if (renderMenu) {
      return renderMenu(this.props)
    }

    return (
      <Dropdown.Card {...getValidProps(rest)} className={this.getClassName()}>
        <MenuUI>{this.renderItems()}</MenuUI>
      </Dropdown.Card>
    )
  }
}
export default Menu
