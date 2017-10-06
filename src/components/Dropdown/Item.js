import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import Flexy from '../Flexy'
import Icon from '../Icon'
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
    /* istanbul ignore else */
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
    /* istanbul ignore else */
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

  /* istanbul ignore next */
  // Works in the browser, but JSDOM isn't picking this up
  handleOnMenuClose () {
    const { onMenuClose } = this.props
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
    if (this.menu && Array.isArray(children)) {
      return children.filter(child => !this.getMenu(child))
    } else {
      return children
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

    const itemMarkup = this.removeMenuFromChildren()

    const menuMarkup = this.menu && isOpen ? (
      <div className='c-DropdownItem__menu'>
        {React.cloneElement(this.menu, {
          isOpen,
          selectedIndex: this.menu.props.selectedIndex !== undefined ? this.menu.props.selectedIndex : 0,
          onClose: handleOnMenuClose,
          trigger: this.node,
          direction: this.menu.props.direction ? this.menu.props.direction : 'right',
          parentMenu
        })}
      </div>
    ) : null

    const menuIndicatorMarkup = this.menu ? (
      <Flexy.Item className='c-DropdownItem__submenu-icon'>
        <Icon name='caret-right' muted size='12' />
      </Flexy.Item>
    ) : null

    return (
      <li
        className={componentClassName}
        {...rest}
      >
        <div
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
          <Flexy>
            <Flexy.Block className='c-DropdownItem__content'>
              {itemMarkup}
            </Flexy.Block>
            {menuIndicatorMarkup}
          </Flexy>
        </div>
        {menuMarkup}
      </li>
    )
  }
}

Item.propTypes = propTypes
Item.defaultProps = defaultProps

export default Item
