// @flow
import React, { PureComponent as Component } from 'react'
import PropTypes from 'prop-types'
import Flexy from '../Flexy'
import Icon from '../Icon'
import Keys from '../../constants/Keys'
import { default as Menu, MenuComponent } from './Menu'
import { classNames } from '../../utilities/classNames.ts'
import { noop } from '../../utilities/other'

type Props = {
  children?: any,
  className?: string,
  disabled: boolean,
  enableTabNavigation: boolean,
  isHover?: boolean,
  isFocused?: boolean,
  isOpen?: boolean,
  itemIndex: number,
  itemRef: (ref: any) => void,
  onBlur: (event: Event, reactEvent: Event, instance: Object) => void,
  onClick: (event: Event, reactEvent: Event, instance: Object) => void,
  onSelect: (value: any) => void,
  onFocus: (event: Event, reactEvent: Event, instance: Object) => void,
  onMouseEnter: (event: Event, reactEvent: Event, instance: Object) => void,
  onMouseLeave: (event: Event, reactEvent: Event, instance: Object) => void,
  onMenuClose: () => void,
  onParentMenuClose: () => void,
  value?: any,
}

type State = {
  isOpen: ?boolean,
  isHover: ?boolean,
  isFocused: ?boolean,
}

class Item extends Component<Props, State> {
  static defaultProps = {
    disabled: false,
    enableTabNavigation: false,
    onBlur: noop,
    onClick: noop,
    onFocus: noop,
    onMouseEnter: noop,
    onMouseLeave: noop,
    onMenuClose: noop,
    onParentMenuClose: noop,
    onSelect: noop,
  }

  static childContextTypes = {
    parentMenu: PropTypes.element,
    parentMenuClose: PropTypes.func,
  }

  node: ?HTMLElement = null
  menu: ?any = null
  _isMounted: boolean = false

  constructor(props: Props) {
    super()

    this.state = {
      isOpen: props.isOpen,
      isHover: props.isHover,
      isFocused: props.isFocused,
    }

    this.handleOnBlur = this.handleOnBlur.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
    this.handleOnEnter = this.handleOnEnter.bind(this)
    this.handleOnFocus = this.handleOnFocus.bind(this)
    this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this)
    this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this)
    this.handleOnMenuClose = this.handleOnMenuClose.bind(this)
  }

  componentWillMount = () => {
    this.menu = this.getMenuFromChildren()
  }

  componentDidMount = () => {
    this._isMounted = true
  }

  getChildContext = () => {
    const { onParentMenuClose } = this.props
    return {
      parentMenu: this.menu,
      parentMenuClose: onParentMenuClose,
    }
  }

  componentWillReceiveProps = (nextProps: Props) => {
    const { isFocused, isHover, isOpen } = this.state
    if (
      nextProps.isFocused !== isFocused ||
      nextProps.isOpen !== isOpen ||
      nextProps.isHover !== isHover
    ) {
      this.setState({
        isFocused: nextProps.isFocused,
        isOpen: nextProps.isHover,
        isHover: nextProps.isHover,
      })
    }
  }

  componentWillUnmount = () => {
    this._isMounted = false
  }

  handleOnBlur = (event: Event, reactEvent: Event) => {
    const { onBlur } = this.props
    onBlur(event, reactEvent, this)
    this.setState({
      isFocused: false,
    })
  }

  handleOnEnter = (event: KeyboardEvent, reactEvent: Event) => {
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

  handleOnClick = (event: Event, reactEvent: Event) => {
    const { disabled, onClick, onSelect, value } = this.props

    if (event) event.stopPropagation()
    if (disabled) return

    /* istanbul ignore else */
    if (!this.menu) {
      onClick(event, reactEvent, this)
      onSelect(value)
    } else {
      this.setState({
        isOpen: !this.state.isOpen,
      })
    }
  }

  handleOnFocus = (event: Event, reactEvent: Event) => {
    const { onFocus } = this.props
    onFocus(event, reactEvent, this)
    this.setState({
      isFocused: true,
    })
  }

  handleOnMouseEnter = (event: Event, reactEvent: Event) => {
    const { onMouseEnter } = this.props
    onMouseEnter(event, reactEvent, this)
    this.setState({
      isHover: true,
    })
  }

  handleOnMouseLeave = (event: Event, reactEvent: Event) => {
    const { onMouseLeave } = this.props
    onMouseLeave(event, reactEvent, this)
    this.setState({
      isHover: false,
    })
  }

  /* istanbul ignore next */
  // Works in the browser, but JSDOM isn't picking this up
  handleOnMenuClose = () => {
    const { onMenuClose } = this.props
    onMenuClose()
  }

  getMenu = (child: any) => {
    if (!React.isValidElement(child)) return null
    return child.type && (child.type === Menu || child.type === MenuComponent)
  }

  getMenuFromChildren = () => {
    const { children } = this.props
    if (Array.isArray(children)) {
      return children.find(child => this.getMenu(child))
    } else {
      return this.getMenu(children) ? children : null
    }
  }

  removeMenuFromChildren = () => {
    const { children } = this.props
    if (this.menu && Array.isArray(children)) {
      return children.filter(child => !this.getMenu(child))
    } else {
      return children
    }
  }

  render() {
    const {
      children,
      className,
      disabled,
      enableTabNavigation,
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

    const menuMarkup =
      !disabled && this.menu && isOpen ? (
        <div className="c-DropdownItem__menu">
          {React.cloneElement(this.menu, {
            enableTabNavigation,
            isOpen,
            selectedIndex:
              this.menu.props.selectedIndex !== undefined
                ? this.menu.props.selectedIndex
                : 0,
            onClose: handleOnMenuClose,
            trigger: this.node,
            direction: this.menu.props.direction
              ? this.menu.props.direction
              : 'right',
          })}
        </div>
      ) : null

    const menuIndicatorMarkup = this.menu ? (
      <Flexy.Item className="c-DropdownItem__submenu-icon">
        <Icon name="caret-right" muted size="12" />
      </Flexy.Item>
    ) : null

    return (
      <div className={componentClassName} role="presentation" {...rest}>
        <div
          className="c-DropdownItem__link"
          onBlur={handleOnBlur}
          onClick={handleOnClick}
          onFocus={handleOnFocus}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
          onKeyDown={handleOnEnter}
          tabIndex={-1}
          ref={node => {
            this.node = node
          }}
          role="menuitem"
          aria-haspopup={!!this.menu}
          aria-expanded={!!(this.menu && isOpen)}
          aria-disabled={disabled}
        >
          <Flexy>
            <Flexy.Block className="c-DropdownItem__content">
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

export default Item
