import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import Dropdown from '../Dropdown/DropdownV2'
import { EmojiPickerProps } from './EmojiPicker.types'
import { COMPONENT_KEY } from './EmojiPicker.utils'
import { MenuUI, TriggerUI } from './styles/EmojiPicker.css'
import Item from './EmojiPicker.Item'
import EmojiView from './EmojiPicker.View'
import { emojiSet } from './emojiSet'

export class EmojiPicker extends React.PureComponent<EmojiPickerProps> {
  static className = 'c-EmojiPicker'

  static defaultProps = {
    className: '',
    direction: 'left',
    dropUp: true,
    enableLeftRightArrowNavigation: true,
    innerRef: noop,
    minHeight: 'auto',
    onSelect: noop,
    emojiSet,
    size: 'default',
  }

  static EmojiView = EmojiView
  static Item = Item

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
    return <Item {...item} />
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

const PropConnectedComponent = propConnect(COMPONENT_KEY)(EmojiPicker)

export default PropConnectedComponent
