import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import Dropdown from '../Dropdown'
import { MenuUI, TriggerUI } from './EmojiPicker.css'
import EmojiPickerItem from './EmojiPicker.Item'
import Emoji from './EmojiPicker.Emoji'
import { emojiSet } from './emojiSet'

export class EmojiPicker extends React.PureComponent {
  static className = 'c-EmojiPicker'
  static Emoji = Emoji
  static Item = EmojiPickerItem

  getClassName() {
    const { className } = this.props
    return classNames(EmojiPicker.className, className)
  }

  renderTrigger() {
    const { renderTrigger } = this.props

    if (renderTrigger) return renderTrigger

    return (
      <TriggerUI
        data-cy="EmojiPickerTrigger"
        className="c-EmojiPickerTrigger"
        size="24"
      />
    )
  }

  renderMenu = menu => {
    return <MenuUI {...menu} data-cy="EmojiPickerMenu" />
  }

  renderItem = item => {
    const { size } = this.props

    return <EmojiPickerItem {...item} size={size} />
  }

  render() {
    const { children, emojiSet, size, ...rest } = this.props

    return (
      <Dropdown
        {...getValidProps(rest)}
        className={this.getClassName()}
        items={emojiSet}
        renderMenu={this.renderMenu}
        renderItem={this.renderItem}
        renderTrigger={this.renderTrigger()}
      />
    )
  }
}

EmojiPicker.propTypes = {
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  emojiSet: PropTypes.arrayOf(PropTypes.any),
  renderMenu: PropTypes.any,
  size: PropTypes.string,
}

EmojiPicker.defaultProps = {
  className: '',
  'data-cy': 'EmojiPicker',
  direction: 'left',
  dropUp: true,
  enableLeftRightArrowNavigation: true,
  minHeight: 'auto',
  onBlur: noop,
  onClose: noop,
  onFocus: noop,
  onOpen: noop,
  onSelect: noop,
  emojiSet,
  size: 'default',
}

export default EmojiPicker
