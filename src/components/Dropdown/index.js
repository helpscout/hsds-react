import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import EventListener from '../EventListener'
import Divider from './Divider'
import Item from './Item'
import Menu from './Menu'
import Trigger from './Trigger'
import KeypressListener from '../KeypressListener'
import Keys from '../../constants/Keys'
import classNames from '../../utilities/classNames'
import { focusNextFocusableNode, focusPreviousFocusableNode } from '../../utilities/focus'

export const propTypes = {
  direction: PropTypes.string
}
const defaultProps = {
  direction: 'down'
}

class Dropdown extends Component {
  constructor (props) {
    super()
    this.state = {
      isOpen: props.isOpen,
      selectedIndex: null
    }

    this.isFocused = false

    this.handleOnBodyClick = this.handleOnBodyClick.bind(this)
    this.handleOnTriggerClick = this.handleOnTriggerClick.bind(this)
    this.handleOnTriggerFocus = this.handleOnTriggerFocus.bind(this)
    this.handleOnMenuClose = this.handleOnMenuClose.bind(this)
    this.handleDownArrow = this.handleDownArrow.bind(this)
    this.handleTab = this.handleTab.bind(this)
    this.handleShiftTab = this.handleShiftTab.bind(this)
  }

  componentWillUpdate (nextProps) {
    if (this.props.isOpen !== nextProps.isOpen) {
      this.setState({ isOpen: nextProps.isOpen })
    }
  }

  handleOnBodyClick (event) {
    const clickNode = event.target
    if (this.state.isOpen) {
      if (clickNode !== this.refs.trigger.node) {
        this.handleOnMenuClose()
      } else {
        this.handleOnTriggerClick()
      }
    } else {
      if (clickNode === this.refs.trigger.node) {
        this.handleOnTriggerClick()
      }
    }
  }

  handleOnTriggerClick () {
    this.setState({ isOpen: !this.state.isOpen })
    this.isFocused = true
  }

  handleOnTriggerFocus () {
    setTimeout(() => {
      this.isFocused = true
    }, 0)
  }

  handleOnMenuClose () {
    this.setState({ selectedIndex: null, isOpen: false })
    this.isFocused = false
  }

  handleDownArrow () {
    const { isOpen } = this.state
    if (!isOpen && this.isFocused) {
      this.setState({ isOpen: true, selectedIndex: 0 })
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
      direction,
      selectedIndex: propsSelectedIndex,
      ...rest
    } = this.props
    const {
      isOpen,
      selectedIndex
    } = this.state

    const handleOnBodyClick = this.handleOnBodyClick
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
      isActive: isOpen,
      ref: 'trigger',
      onFocus: handleOnTriggerFocus
    })
    const menuMarkup = isOpen ? React.cloneElement(children[1], {
      direction,
      isOpen,
      onClose: handleOnMenuClose,
      ref: 'menu',
      trigger: this.refs.trigger,
      selectedIndex
    }) : null

    return (
      <div className={componentClassName} {...rest}>
        <EventListener event='click' handler={handleOnBodyClick} />
        <KeypressListener keyCode={Keys.TAB} handler={handleTab} only type='keydown' />
        <KeypressListener keyCode={Keys.TAB} modifier='shift' handler={handleShiftTab} type='keydown' />
        <KeypressListener keyCode={Keys.DOWN_ARROW} handler={handleDownArrow} type='keydown' />
        {triggerMarkup}
        {menuMarkup}
      </div>
    )
  }
}

Dropdown.propTypes = propTypes
Dropdown.defaultProps = defaultProps
Dropdown.Divider = Divider
Dropdown.Item = Item
Dropdown.Menu = Menu
Dropdown.Trigger = Trigger

export default Dropdown
