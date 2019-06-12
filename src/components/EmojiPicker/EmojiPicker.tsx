import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import Dropdown from '../Dropdown/DropdownV2'
import { EmojiPickerProps } from './EmojiPicker.types'
import { COMPONENT_KEY } from './EmojiPicker.utils'
import { MenuUI, TriggerUI } from './styles/EmojiPicker.css'
import Menu from './EmojiPicker.Menu'
import Item from './EmojiPicker.Item'
import EmojiView from './EmojiPicker.View'
import { emojiSet } from './emojiSet'

export class EmojiPicker extends React.PureComponent<EmojiPickerProps> {
  static className = 'c-EmojiPicker'

  static defaultProps = {
    className: '',
    direction: 'left',
    dropUp: true,
    innerRef: noop,
    onSelect: noop,
    emojiSet: emojiSet,
    size: 'default',
  }

  static EmojiView = EmojiView
  static Menu = Menu
  static Item = Item

  getClassName() {
    const { className } = this.props
    return classNames(EmojiPicker.className, className)
  }

  getDropdownTrigger() {
    const { renderTrigger } = this.props

    if (renderTrigger) return renderTrigger

    return <TriggerUI className="c-EmojiPickerTrigger" size="24" />
  }

  renderMenu = props => {
    return <MenuUI {...props} />
  }

  renderItem = item => {
    return <Item {...item} />
  }

  render() {
    const {
      children,
      emojiSet,
      size,
      onSelect,
      innerRef,
      renderTrigger,
      ...rest
    } = this.props

    return (
      <Dropdown
        {...rest}
        className={this.getClassName()}
        innerRef={innerRef}
        items={emojiSet}
        onSelect={onSelect}
        renderMenu={this.renderMenu}
        renderItem={this.renderItem}
        renderTrigger={this.getDropdownTrigger()}
      />
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(EmojiPicker)

export default PropConnectedComponent
