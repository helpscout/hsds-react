import * as React from 'react'
import EmojiView from './EmojiPicker.View'
import { classNames } from '../../utilities/classNames'
import { ItemWrapperUI, ItemUI } from './styles/EmojiPicker.css'
import { EmojiPickerItemProps } from './EmojiPicker.types'
import { defaultEmoji } from './emojiSet'

class Item extends React.PureComponent<EmojiPickerItemProps> {
  static className = 'c-EmojiPickerItem'

  static defaultProps = {
    'data-cy': 'EmojiPickerItem',
    className: '',
    hoverBackgroundColor: 'purple',
    name: defaultEmoji.name,
    size: 'default',
    symbol: defaultEmoji.symbol,
    value: defaultEmoji.value,
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
