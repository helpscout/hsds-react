import * as React from 'react'
import { classNames } from '../../utilities/classNames'
import EmojiView from './EmojiPicker.View'
import { EmojiItemUI } from './styles/EmojiPicker.css'

export interface Props {
  className?: any
  name?: string
  renderItem?: any
  size?: string
  symbol?: string
}

class Item extends React.PureComponent<Props> {
  static className = 'c-emojiPickerItem'

  static defaultProps = {
    className: '',
    size: 'default',
  }

  getClassName() {
    const { className } = this.props

    return classNames(Item.className, className)
  }

  render() {
    const { className, name, renderItem, symbol, ...rest } = this.props

    if (renderItem) {
      return renderItem(this.props)
    }

    return (
      <EmojiItemUI className={this.getClassName()} {...rest}>
        <EmojiView name={name} symbol={symbol} />
      </EmojiItemUI>
    )
  }
}

export default Item
