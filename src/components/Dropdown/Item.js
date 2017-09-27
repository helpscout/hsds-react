import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import Menu from './Menu'

export const propTypes = {
  isHover: PropTypes.bool,
  isFocused: PropTypes.bool,
  isSelected: PropTypes.bool,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onClickToOpenMenu: PropTypes.func,
  onFocus: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMenuClose: PropTypes.func,
  parentMenu: PropTypes.bool
}

const defaultProps = {
  onBlur: noop,
  onClick: noop,
  onClickToOpenMenu: noop,
  onFocus: noop,
  onMouseEnter: noop,
  onMouseLeave: noop,
  onMenuClose: noop
}

class Item extends Component {
  constructor () {
    super()
    this.handleOnBlur = this.handleOnBlur.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
    this.handleOnFocus = this.handleOnFocus.bind(this)
    this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this)
    this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this)
    this.node = null
  }

  componentWillMount () {
    this.menu = this.getMenuFromChildren()
  }

  handleOnBlur (event, reactEvent) {
    const { onBlur } = this.props
    onBlur(event, reactEvent, this)
  }

  handleOnClick (event, reactEvent) {
    event.stopPropagation()
    const { onClick, onClickToOpenMenu } = this.props
    onClick(event, reactEvent, this)
    if (this.menu) {
      onClickToOpenMenu(event, reactEvent, this)
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
      isSelected,
      onBlur,
      onClick,
      onClickToOpenMenu,
      onFocus,
      onMouseEnter,
      onMenuClose,
      parentMenu,
      ...rest
    } = this.props

    const handleOnBlur = this.handleOnBlur
    const handleOnClick = this.handleOnClick
    const handleOnFocus = this.handleOnFocus
    const handleOnMouseEnter = this.handleOnMouseEnter
    const handleOnMouseLeave = this.handleOnMouseLeave

    const componentClassName = classNames(
      'c-DropdownItem',
      isHover && 'is-hover',
      isFocused && 'is-focused',
      isSelected && 'is-selected',
      className
    )

    const itemMarkup = this.menu ? this.removeMenuFromChildren() : children
    const menuMarkup = this.menu && isSelected ? React.cloneElement(this.menu, {
      isOpen: isSelected,
      selectedIndex: 0,
      onClose: onMenuClose,
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
