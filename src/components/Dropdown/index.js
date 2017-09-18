import React, {PureComponent as Component} from 'react'
import Divider from './Divider'
import Item from './Item'
import Menu from './Menu'
import Trigger from './Trigger'
import KeypressListener from '../KeypressListener'
import Keys from '../../constants/Keys'
import classNames from '../../utilities/classNames'

class Dropdown extends Component {
  constructor (props) {
    super()
    this.state = {
      isOpen: props.isOpen
    }
    this.handleOnTriggerClick = this.handleOnTriggerClick.bind(this)
    this.handleOnMenuClose = this.handleOnMenuClose.bind(this)
    this.handleTriggerFocus = this.handleTriggerFocus.bind(this)
    this.handleDownArrow = this.handleDownArrow.bind(this)
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

  handleOnMenuClose () {
    this.setState({ isOpen: false })
    this.handleTriggerFocus()
  }

  handleTriggerFocus () {
    const triggerNode = this.refs.trigger.node
    triggerNode.focus()
  }

  handleDownArrow () {
    const { isOpen } = this.state
    if (!isOpen) {
      this.setState({ isOpen: true })
      this.handleTriggerFocus()
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
    const handleOnMenuClose = this.handleOnMenuClose
    const handleTriggerFocus = this.handleTriggerFocus
    const handleDownArrow = this.handleDownArrow

    const componentClassName = classNames(
      'c-Dropdown',
      isOpen && 'is-open',
      className
    )

    const triggerMarkup = React.cloneElement(children[0], {
      onClick: handleOnTriggerClick,
      ref: 'trigger'
    })
    const menuMarkup = isOpen ? React.cloneElement(children[1], {
      isOpen,
      onClose: handleOnMenuClose,
      onFirstItemFocus: handleTriggerFocus,
      onLastItemFocus: handleTriggerFocus,
      ref: 'menu'
    }) : null

    return (
      <div className={componentClassName} {...rest}>
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
