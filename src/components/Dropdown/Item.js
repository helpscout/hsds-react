import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import Flexy from '../Flexy'
import Icon from '../Icon'
import Keys from '../../constants/Keys'
import { default as Menu, MenuComponent } from './Menu'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'

export const propTypes = {
  disabled: PropTypes.bool,
  isHover: PropTypes.bool,
  isFocused: PropTypes.bool,
  itemIndex: PropTypes.number,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onSelect: PropTypes.func,
  onFocus: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMenuClose: PropTypes.func,
  onParentMenuClose: PropTypes.func,
  value: PropTypes.node
}

const defaultProps = {
  disabled: false,
  onBlur: noop,
  onClick: noop,
  onFocus: noop,
  onMouseEnter: noop,
  onMouseLeave: noop,
  onMenuClose: noop,
  onParentMenuClose: noop,
  onSelect: noop
}

const childContextTypes = {
  parentMenu: PropTypes.element,
  parentMenuClose: PropTypes.func
}

class Item extends Component {
  constructor (props) {
    super()

    this.state = {
      isOpen: props.isOpen,
      isHover: props.isHover,
      isFocused: props.isFocused
    }

    this.handleOnBlur = this.handleOnBlur.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
    this.handleOnEnter = this.handleOnEnter.bind(this)
    this.handleOnFocus = this.handleOnFocus.bind(this)
    this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this)
    this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this)
    this.handleOnMenuClose = this.handleOnMenuClose.bind(this)
    this.node = null
    this._isMounted = false
  }

  componentWillMount () {
    this.menu = this.getMenuFromChildren()
  }

  componentDidMount () {
    this._isMounted = true
  }

  getChildContext () {
    const { onParentMenuClose } = this.props
    return {
      parentMenu: this.menu,
      parentMenuClose: onParentMenuClose
    }
  }

  componentWillReceiveProps (nextProps) {
    const { isFocused, isHover, isOpen } = this.state
    if (nextProps.isFocused !== isFocused ||
        nextProps.isOpen !== isOpen ||
        nextProps.isHover !== isHover
      ) {
      this.setState({
        isFocused: nextProps.isFocused,
        isOpen: nextProps.isHover,
        isHover: nextProps.isHover
      })
    }
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  handleOnBlur (event, reactEvent) {
    const { onBlur } = this.props
    onBlur(event, reactEvent, this)
    this.setState({
      isFocused: false
    })
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
    const { disabled, onClick, onSelect, value } = this.props

    if (event) event.stopPropagation()
    if (disabled) return

    /* istanbul ignore else */
    if (!this.menu) {
      onClick(event, reactEvent, this)
      onSelect(value)
    } else {
      this.setState({
        isOpen: !this.state.isOpen
      })
    }
  }

  handleOnFocus (event, reactEvent) {
    const { onFocus } = this.props
    onFocus(event, reactEvent, this)
    this.setState({
      isFocused: true
    })
  }

  handleOnMouseEnter (event, reactEvent) {
    const { onMouseEnter } = this.props
    onMouseEnter(event, reactEvent, this)
    this.setState({
      isHover: true
    })
  }

  handleOnMouseLeave (event, reactEvent) {
    const { onMouseLeave } = this.props
    onMouseLeave(event, reactEvent, this)
    this.setState({
      isHover: false
    })
  }

  /* istanbul ignore next */
  // Works in the browser, but JSDOM isn't picking this up
  handleOnMenuClose () {
    const { onMenuClose } = this.props
    onMenuClose()
  }

  getMenu (child) {
    if (!React.isValidElement(child)) return null
    return (child.type && (child.type === Menu || child.type === MenuComponent))
  }

  getMenuFromChildren () {
    const { children } = this.props
    if (Array.isArray(children)) {
      return children.find(child => this.getMenu(child))
    } else {
      return this.getMenu(children) ? children : null
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
      disabled,
      itemRef,
      isFocused: propIsFocused,
      isHover: propIsHover,
      isOpen: propIsOpen,
      itemIndex,
      onBlur,
      onClick,
      onFocus,
      onMouseEnter,
      onMenuClose,
      onParentMenuClose,
      ...rest
    } = this.props
    const { isOpen, isHover, isFocused } = this.state

    const handleOnBlur = this.handleOnBlur
    const handleOnClick = this.handleOnClick
    const handleOnFocus = this.handleOnFocus
    const handleOnEnter = this.handleOnEnter
    const handleOnMouseEnter = this.handleOnMouseEnter
    const handleOnMouseLeave = this.handleOnMouseLeave
    const handleOnMenuClose = this.handleOnMenuClose

    const componentClassName = classNames(
      'c-DropdownItem',
      disabled && 'is-disabled',
      isHover && 'is-hover',
      isFocused && 'is-focused',
      className
    )

    const itemMarkup = this.removeMenuFromChildren()

    const menuMarkup = !disabled && this.menu && isOpen ? (
      <div className='c-DropdownItem__menu'>
        {React.cloneElement(this.menu, {
          isOpen,
          selectedIndex: this.menu.props.selectedIndex !== undefined ? this.menu.props.selectedIndex : 0,
          onClose: handleOnMenuClose,
          trigger: this.node,
          direction: this.menu.props.direction ? this.menu.props.direction : 'right'
        })}
      </div>
    ) : null

    const menuIndicatorMarkup = this.menu ? (
      <Flexy.Item className='c-DropdownItem__submenu-icon'>
        <Icon name='caret-right' muted size='12' />
      </Flexy.Item>
    ) : null

    return (
      <div
        className={componentClassName}
        role='presentation'
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
          role='menuitem'
          aria-haspopup={!!this.menu}
          aria-expanded={!!(this.menu && isOpen)}
          aria-disabled={disabled}
        >
          <Flexy>
            <Flexy.Block className='c-DropdownItem__content'>
              {itemMarkup}
            </Flexy.Block>
            {menuIndicatorMarkup}
          </Flexy>
        </div>
        {menuMarkup}
      </div>
    )
  }
}

Item.propTypes = propTypes
Item.defaultProps = defaultProps
Item.childContextTypes = childContextTypes

export default Item
