import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import Dropdown from '../Dropdown/DropdownV2'
import { EmojiPickerProps } from './EmojiPicker.types'
import { COMPONENT_KEY } from './EmojiPicker.utils'
import { MenuUI, TriggerUI } from './styles/EmojiPicker.css'
import Item from './EmojiPicker.Item'
import Emoji from './EmojiPicker.Emoji'
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
    onClose: noop,
    onOpen: noop,
    onSelect: noop,
    emojiSet,
    size: 'default',
  }

  static Emoji = Emoji
  static Item = Item

  _isMounted: boolean = false

  state = {
    isOpen: this.props.isOpen,
  }

  componentDidMount = () => {
    this._isMounted = true
  }
  componentWillUnmount = () => {
    this._isMounted = false
  }

  safeSetState = newState => {
    /* istanbul ignore else */
    if (this._isMounted) {
      this.setState(newState)
    }
  }

  getClassName() {
    const { className } = this.props
    return classNames(EmojiPicker.className, className)
  }

  handleOnOpen = () => {
    this.safeSetState({
      isOpen: true,
    })

    this.props.onOpen()
  }

  handleOnClose = () => {
    this.safeSetState({
      isOpen: false,
    })

    this.props.onClose()
  }

  renderTrigger() {
    const { renderTrigger } = this.props
    const { isOpen } = this.state

    if (renderTrigger) return renderTrigger

    return (
      <TriggerUI
        data-cy="EmojiPickerTrigger"
        className="c-EmojiPickerTrigger"
        isOpen={isOpen}
        size="24"
      />
    )
  }

  renderMenu = menu => {
    return <MenuUI {...menu} data-cy="EmojiPickerMenu" />
  }

  renderItem = item => {
    const { size } = this.props

    return <Item {...item} size={size} />
  }

  render() {
    const { children, emojiSet, size, ...rest } = this.props

    return (
      <Dropdown
        {...rest}
        className={this.getClassName()}
        items={emojiSet}
        onClose={this.handleOnClose}
        onOpen={this.handleOnOpen}
        renderMenu={this.renderMenu}
        renderItem={this.renderItem}
        renderTrigger={this.renderTrigger()}
      />
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(EmojiPicker)

export default PropConnectedComponent
