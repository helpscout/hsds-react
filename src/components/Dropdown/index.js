import React, {PureComponent as Component} from 'react'
import Divider from './Divider'
import Item from './Item'
import Menu from './Menu'
import Trigger from './Trigger'
import EventListener from '../EventListener'
import KeypressListener from '../KeypressListener'
import Keys from '../../constants/Keys'
import classNames from '../../utilities/classNames'

class Dropdown extends Component {
  constructor (props) {
    super()
    this.state = {
      isOpen: props.isOpen,
      isFocused: false
    }
    this.handleOnTriggerClick = this.handleOnTriggerClick.bind(this)
    this.handleOnTriggerFocus = this.handleOnTriggerFocus.bind(this)
    this.handleOnMenuClose = this.handleOnMenuClose.bind(this)
    this.handleTriggerFocus = this.handleTriggerFocus.bind(this)
    this.handleDownArrow = this.handleDownArrow.bind(this)
    this.handleTab = this.handleTab.bind(this)
    this.handleShiftTab = this.handleShiftTab.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillUpdate (nextProps) {
    if (this.props.isOpen !== nextProps.isOpen) {
      this.setState({ isOpen: nextProps.isOpen })
    }
  }

  handleClick (event) {
    // if (this.state.isOpen) {
    //   const clickNode = event.target
    //   const triggerNode = this.refs.trigger.node
    //   const menuNode = this.refs.menu.node

    //   if (clickNode !== triggerNode && !menuNode.contains(clickNode)) {
    //     this.handleOnMenuClose()
    //   }
    // }
  }

  handleOnTriggerClick () {
    this.setState({ isOpen: !this.state.isOpen })
    this.handleTriggerFocus()
  }

  handleOnTriggerFocus () {
    this.setState({ isFocused: true })
    this.handleTriggerFocus()
  }

  handleOnMenuClose () {
    this.setState({ isFocused: false, isOpen: false })
  }

  handleTriggerFocus () {
    const triggerNode = this.refs.trigger.node
    triggerNode.focus()
  }

  handleDownArrow () {
    const { isOpen, isFocused } = this.state
    if (!isOpen && isFocused) {
      this.setState({ isOpen: true })
    }
  }

  handleTab () {
    this.setState({ isFocused: false })
    if (this.state.isOpen) {
      this.handleOnMenuClose()
    }
  }

  handleShiftTab () {
    this.setState({ isFocused: false })
    if (this.state.isOpen) {
      this.handleOnMenuClose()
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
    const handleClick = this.handleClick

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
        <EventListener event='click' handler={handleClick} />
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
