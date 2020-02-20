import React from 'react'
import PropTypes from 'prop-types'
import Emoji from './EmojiPicker.Emoji'
import { classNames } from '../../utilities/classNames'
import { ItemWrapperUI, ItemUI } from './EmojiPicker.css'
import { defaultEmoji } from './emojiSet'

class Item extends React.PureComponent {
  static propTypes = {
    className: PropTypes.any,
    hoverBackgroundColor: PropTypes.string,
    name: PropTypes.string,
    renderItem: PropTypes.any,
    size: PropTypes.string,
    symbol: PropTypes.string,
  }

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
        data-cy="EmojiPickerItemWrapper"
        hoverBackgroundColor={hoverBackgroundColor}
        size={size}
      >
        <ItemUI
          data-cy="EmojiPickerItem"
          className={this.getClassName()}
          size={size}
        >
          <Emoji name={name} symbol={symbol} />
        </ItemUI>
      </ItemWrapperUI>
    )
  }
}

export default Item
