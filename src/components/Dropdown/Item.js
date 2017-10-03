import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import Keys from '../../constants/Keys'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import Menu from './Menu'

export const propTypes = {
  isHover: PropTypes.bool,
  isFocused: PropTypes.bool,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMenuClose: PropTypes.func,
  parentMenu: PropTypes.bool
}

const defaultProps = {
  onBlur: noop,
  onClick: noop,
  onFocus: noop,
  onMouseEnter: noop,
  onMouseLeave: noop,
  onMenuClose: noop
}

class Item extends Component {
  constructor (props) {
    super()

    this.state = {
      isOpen: props.isHover
    }

    this.handleOnBlur = this.handleOnBlur.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
    this.handleOnEnter = this.handleOnEnter.bind(this)
    this.handleOnFocus = this.handleOnFocus.bind(this)
    this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this)
    this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this)
    this.handleOnMenuClose = this.handleOnMenuClose.bind(this)
    this.node = null
  }

  componentWillMount () {
    this.menu = this.getMenuFromChildren()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.isHover !== this.state.isOpen) {
      this.setState({ isOpen: nextProps.isHover })
    }
  }

  handleOnBlur (event, reactEvent) {
    const { onBlur } = this.props
    onBlur(event, reactEvent, this)
  }

  handleOnEnter (event, reactEvent) {
    event.stopPropagation()
    if (event.keyCode === Keys.ENTER) {
      if (this.menu) {
        this.handleOnMouseEnter(event, reactEvent)
      } else {
        this.handleOnClick(event, reactEvent)
      }
    }
  }

  handleOnClick (event, reactEvent) {
    event.stopPropagation()
    const { onClick } = this.props
    if (!this.menu) {
      onClick(event, reactEvent, this)
    }
  }

  handleOnFocus (event, reactEvent) {
    const { onFocus } = this.props
    onFocus(event, reactEvent, this)
  }

  handleOnMouseEnter (event, reactEvent) {
    const { onMouseEnter } = this.props
    onMouseEnter(event, reactEvent, this)
  }

  handleOnMouseLeave (event, reactEvent) {
    const { onMouseLeave } = this.props
    onMouseLeave(event, reactEvent, this)
  }

  handleOnMenuClose () {
    const { onMenuClose } = this.props
    this.setState({ isOpen: false })
    onMenuClose()
  }

  getMenu (child) {
    if (!React.isValidElement(child)) return false
    return (child.type && child.type === Menu)
  }

  getMenuFromChildren () {
    const { children } = this.props
    if (Array.isArray(children)) {
      return children.find(child => this.getMenu(child))
    } else {
      return this.getMenu(children)
    }
  }

  removeMenuFromChildren () {
    const { children } = this.props
    if (Array.isArray(children)) {
      return children.filter(child => !this.getMenu(child))
    }
  }

  render () {
    const {
      children,
      className,
      itemRef,
      isFocused,
      isHover,
      onBlur,
      onClick,
      onFocus,
      onMouseEnter,
      onMenuClose,
      parentMenu,
      ...rest
    } = this.props
    const { isOpen } = this.state

    const handleOnBlur = this.handleOnBlur
    const handleOnClick = this.handleOnClick
    const handleOnFocus = this.handleOnFocus
    const handleOnEnter = this.handleOnEnter
    const handleOnMouseEnter = this.handleOnMouseEnter
    const handleOnMouseLeave = this.handleOnMouseLeave
    const handleOnMenuClose = this.handleOnMenuClose

    const componentClassName = classNames(
      'c-DropdownItem',
      isOpen && 'is-hover',
      isFocused && 'is-focused',
      className
    )

    const itemMarkup = this.menu ? this.removeMenuFromChildren() : children
    const menuMarkup = this.menu && isOpen ? React.cloneElement(this.menu, {
      isOpen,
      selectedIndex: 0,
      onClose: handleOnMenuClose,
      trigger: this.node,
      direction: this.menu.props.direction ? this.menu.props.direction : 'right',
      parentMenu
    }) : null
    const menuIndicatorMarkup = this.menu ? (
      <span>▼</span>
    ) : null

    return (
      <li
        className={componentClassName}
        {...rest}
      >
        <span
          className='c-DropdownItem__link'
          onBlur={handleOnBlur}
          onClick={handleOnClick}
          onFocus={handleOnFocus}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
          onKeyDown={handleOnEnter}
          tabIndex={-1}
          ref={node => { this.node = node }}
        >
          {itemMarkup}
          {menuIndicatorMarkup}
        </span>
        {menuMarkup}
      </li>
    )
  }
}

Item.propTypes = propTypes
Item.defaultProps = defaultProps

export default Item
