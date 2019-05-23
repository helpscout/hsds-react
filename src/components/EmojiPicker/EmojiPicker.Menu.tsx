import * as React from 'react'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import Dropdown from '../Dropdown/DropdownV2'
import { getItemProps } from '../Dropdown/V2/Dropdown.utils'
import { EmojiProps } from './EmojiPicker.types'
import Item from './EmojiPicker.Item'

export interface Props {
  className?: string
  items: Array<EmojiProps>
  renderItem?: any
  renderMenu?: any
  size?: string
}

class Menu extends React.PureComponent<Props> {
  static className = 'c-EmojiPickerMenu'

  static defaultProps = {
    className: '',
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
      const itemProps = { ...getItemProps(item, index), renderItem, size }

      return <Item {...itemProps} />
    })
  }

  render() {
    const { renderMenu } = this.props

    if (renderMenu) {
      return renderMenu(this.props)
    }

    return (
      <Dropdown.Card className={this.getClassName()}>
        <Dropdown.Menu>{this.renderItems()}</Dropdown.Menu>
      </Dropdown.Card>
    )
  }
}
export default Menu
