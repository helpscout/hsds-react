import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Emoji from './EmojiPicker.Emoji'
import { classNames } from '../../utilities/classNames'
import { ItemWrapperUI, ItemUI } from './EmojiPicker.css'
import { defaultEmoji } from './emojiSet'

class EmojiPickerItem extends React.PureComponent {
  static className = 'c-EmojiPickerItem'

  getClassName() {
    const { className } = this.props

    return classNames(EmojiPickerItem.className, className)
  }

  render() {
    const {
      'data-cy': dataCy,
      hoverBackgroundColor,
      name,
      size,
      symbol,
      ...rest
    } = this.props

    return (
      <ItemWrapperUI
        className="c-EmojiPickerItemWrapper"
        data-cy="EmojiPickerItemWrapper"
        hoverBackgroundColor={hoverBackgroundColor}
        size={size}
        {...getValidProps(rest)}
      >
        <ItemUI data-cy={dataCy} className={this.getClassName()} size={size}>
          <Emoji name={name} symbol={symbol} />
        </ItemUI>
      </ItemWrapperUI>
    )
  }
}

EmojiPickerItem.defaultProps = {
  'data-cy': 'EmojiPickerItem',
  className: '',
  hoverBackgroundColor: 'purple',
  name: defaultEmoji.name,
  size: 'default',
  symbol: defaultEmoji.symbol,
  value: defaultEmoji.value,
}

EmojiPickerItem.propTypes = {
  className: PropTypes.any,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  hoverBackgroundColor: PropTypes.string,
  name: PropTypes.string,
  renderItem: PropTypes.any,
  size: PropTypes.string,
  symbol: PropTypes.string,
}

export default EmojiPickerItem
