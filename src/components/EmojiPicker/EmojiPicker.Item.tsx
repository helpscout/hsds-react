import * as React from 'react'
import EmojiView from './EmojiPicker.View'
import { classNames } from '../../utilities/classNames'
import { ItemWrapperUI, ItemUI } from './styles/EmojiPicker.css'
import { EmojiPickerItemProps } from './EmojiPicker.types'

class Item extends React.PureComponent<EmojiPickerItemProps> {
  static className = 'c-EmojiPickerItem'

  static defaultProps = {
    className: '',
    'data-cy': 'EmojiPickerItem',
    hoverBackgroundColor: 'purple',
    size: 'default',
  }

  getClassName() {
    const { className } = this.props

    return classNames(Item.className, className)
  }

  render() {
    const { hoverBackgroundColor, name, size, symbol } = this.props

    return (
      <ItemWrapperUI
        className="c-EmojiPickerItemWrapper"
        hoverBackgroundColor={hoverBackgroundColor}
        size={size}
      >
        <ItemUI className={this.getClassName()} size={size}>
          <EmojiView name={name} symbol={symbol} />
        </ItemUI>
      </ItemWrapperUI>
    )
  }
}

export default Item
