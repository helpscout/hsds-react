import React from 'react'
import PropTypes from 'prop-types'
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
    return (
      <MenuUI
        {...menu}
        data-cy="EmojiPickerMenu"
        className="c-EmojiPickerMenu"
      />
    )
  }

  renderItem = item => {
    const { size } = this.props

    return (
      <EmojiPickerItem {...item} size={size} className="c-EmojiPickerItem" />
    )
  }

  render() {
    const { children, emojiSet, size, ...rest } = this.props

    return (
      <Dropdown
        {...rest}
        className={this.getClassName()}
        items={emojiSet}
        renderMenu={this.renderMenu}
        renderItem={this.renderItem}
        renderTrigger={this.renderTrigger()}
      />
    )
  }
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

EmojiPicker.propTypes = {
  /** The className of the component. */
  className: PropTypes.string,
  /** An array of emoji objects. */
  emojiSet: PropTypes.arrayOf(PropTypes.any),
  /** Callback when item is selected. */
  onSelect: PropTypes.func,
  /** Callback when item is blurred. */
  onBlur: PropTypes.func,
  /** Callback when item is closed. */
  onClose: PropTypes.func,
  /** Callback when item is focused. */
  onFocus: PropTypes.func,
  /** Callback when item is opened. */
  onOpen: PropTypes.func,
  /** Callback to customize how a menu renders. */
  renderMenu: PropTypes.any,
  /** Callback to customize how a trigger renders. */
  renderTrigger: PropTypes.any,
  /** The size of the emoji. */
  size: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default EmojiPicker
