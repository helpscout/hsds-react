import React, {PureComponent as Component} from 'react'
import Divider from './Divider'
import Item from './Item'
import Menu from './Menu'
import Trigger from './Trigger'
import KeypressListener from '../KeypressListener'
import Keys from '../../constants/Keys'
import classNames from '../../utilities/classNames'
import { focusNextFocusableNode, focusPreviousFocusableNode } from '../../utilities/focus'

class Dropdown extends Component {
  constructor (props) {
    super()
    this.state = {
      isOpen: props.isOpen
    }
    this.handleOnTriggerClick = this.handleOnTriggerClick.bind(this)
    this.handleOnTriggerFocus = this.handleOnTriggerFocus.bind(this)
    this.handleOnMenuClose = this.handleOnMenuClose.bind(this)
    this.handleTriggerFocus = this.handleTriggerFocus.bind(this)
    this.handleDownArrow = this.handleDownArrow.bind(this)
    this.handleTab = this.handleTab.bind(this)
    this.handleShiftTab = this.handleShiftTab.bind(this)
    this.isFocused = false
  }

  componentWillUpdate (nextProps) {
    if (this.props.isOpen !== nextProps.isOpen) {
      this.setState({ isOpen: nextProps.isOpen })
    }
  }

  handleOnTriggerClick () {
    this.setState({ isOpen: !this.state.isOpen })
    this.handleTriggerFocus()
  }

  handleOnTriggerFocus () {
    this.isFocused = true
    setTimeout(() => {
      this.isFocused = true
    }, 0)
  }

  handleOnMenuClose () {
    this.setState({ isOpen: false })
    this.isFocused = false
  }

  handleTriggerFocus () {
    this.isFocused = true
    const triggerNode = this.refs.trigger.node
    triggerNode.focus()
  }

  handleDownArrow () {
    const { isOpen } = this.state
    if (!isOpen && this.isFocused) {
      this.setState({ isOpen: true })
    }
  }

  handleTab (event) {
    this.isFocused = false
    if (this.state.isOpen) {
      event.preventDefault()
      this.handleOnMenuClose()
      focusNextFocusableNode(this.refs.trigger.node)
      return false
    }
  }

  handleShiftTab (event) {
    this.isFocused = false
    if (this.state.isOpen) {
      event.preventDefault()
      this.handleOnMenuClose()
      focusPreviousFocusableNode(this.refs.trigger.node)
      return false
    }
  }

  render () {
    const {
      children,
      className,
      ...rest
    } = this.props
    const {
      isOpen
    } = this.state

    const handleOnTriggerClick = this.handleOnTriggerClick
    const handleOnTriggerFocus = this.handleOnTriggerFocus
    const handleOnMenuClose = this.handleOnMenuClose
    const handleDownArrow = this.handleDownArrow
    const handleTab = this.handleTab
    const handleShiftTab = this.handleShiftTab

    const componentClassName = classNames(
      'c-Dropdown',
      isOpen && 'is-open',
      className
    )

    const triggerMarkup = React.cloneElement(children[0], {
      onClick: handleOnTriggerClick,
      ref: 'trigger',
      onFocus: handleOnTriggerFocus
    })
    const menuMarkup = isOpen ? React.cloneElement(children[1], {
      isOpen,
      onClose: handleOnMenuClose,
      ref: 'menu',
      trigger: this.refs.trigger
    }) : null

    return (
      <div className={componentClassName} {...rest}>
        <KeypressListener keyCode={Keys.TAB} handler={handleTab} only type='keydown' />
        <KeypressListener keyCode={Keys.TAB} modifier='shift' handler={handleShiftTab} type='keydown' />
        <KeypressListener keyCode={Keys.DOWN_ARROW} handler={handleDownArrow} type='keydown' />
        {triggerMarkup}
        {menuMarkup}
      </div>
    )
  }
}

Dropdown.Divider = Divider
Dropdown.Item = Item
Dropdown.Menu = Menu
Dropdown.Trigger = Trigger

export default Dropdown
