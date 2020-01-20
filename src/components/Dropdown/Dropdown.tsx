import * as React from 'react'
import * as ReactDOM from 'react-dom'
import EventListener from '../EventListener'
import Divider from './Dropdown.Divider'
import Header from './Dropdown.Header'
import Item from './Dropdown.Item'
import { default as Menu, MenuComponent } from './Dropdown.Menu'
import Trigger from './Dropdown.Trigger'
import KeypressListener from '../KeypressListener'
import Keys from '../../constants/Keys'
import { classNames } from '../../utilities/classNames'

import {
  focusNextFocusableNode,
  focusPreviousFocusableNode,
} from '../../utilities/focus'
import { isNodeElement } from '../../utilities/node'
import { noop } from '../../utilities/other'
import { DropdownProps, DropdownState } from './Dropdown.types'

export class Dropdown extends React.PureComponent<
  DropdownProps,
  DropdownState
> {
  static defaultProps = {
    closeMenuOnClick: true,
    enableTabNavigation: false,
    direction: 'down',
    onClose: noop,
  }
  static Divider = Divider
  static Header = Header
  static Item = Item
  static Menu = Menu
  static Trigger = Trigger

  isFocused: boolean = false
  triggerNode: HTMLElement | Element | null = null
  _isMounted: boolean = false

  constructor(props) {
    super(props)

    this.state = {
      isOpen: props.isOpen,
      selectedIndex: props.selectedIndex,
    }

    // this.handleOnBodyClick = this.handleOnBodyClick.bind(this)
    // this.handleOnTriggerClick = this.handleOnTriggerClick.bind(this)
    // this.handleOnTriggerFocus = this.handleOnTriggerFocus.bind(this)
    // this.handleOnMenuClose = this.handleOnMenuClose.bind(this)
    // this.handleDownArrow = this.handleDownArrow.bind(this)
    // this.handleTab = this.handleTab.bind(this)
    // this.handleShiftTab = this.handleShiftTab.bind(this)
  }

  componentDidMount = () => {
    this._isMounted = true
    this.setTriggerNode()
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
  componentWillUpdate = nextProps => {
    if (this.props.isOpen !== nextProps.isOpen) {
      this.safeSetState({ isOpen: nextProps.isOpen })
    }
  }

  setTriggerNode = () => {
    const trigger = this.refs.trigger
    /* istanbul ignore next */
    if (!this.triggerNode) {
      // TODO: fix typescript complains
      // @ts-ignore
      this.triggerNode = isNodeElement(trigger)
        ? trigger
        : ReactDOM.findDOMNode(trigger)
    }
  }

  handleOnBodyClick = (event: Event) => {
    const clickNode = event.target
    if (this.state.isOpen) {
      if (clickNode !== this.triggerNode) {
        this.handleOnMenuClose()
      } else {
        this.handleOnTriggerClick()
      }
    } else {
      /* istanbul ignore else */
      if (clickNode === this.triggerNode) {
        this.handleOnTriggerClick()
      }
    }
  }

  handleOnTriggerClick = () => {
    this.safeSetState({ isOpen: !this.state.isOpen })
    this.isFocused = true
  }

  handleOnTriggerFocus = () => {
    this.isFocused = true
  }

  handleOnMenuClose = () => {
    this.safeSetState({ selectedIndex: null, isOpen: false })

    this.props.onClose()

    if (this.props.enableTabNavigation && this.triggerNode) {
      // TODO: fix typescript complains
      // @ts-ignore
      this.triggerNode.focus()
      this.isFocused = true
    } else {
      this.isFocused = false
    }
  }

  handleDownArrow = () => {
    const { isOpen } = this.state
    if (!isOpen && this.isFocused) {
      this.safeSetState({ isOpen: true, selectedIndex: 0 })
    }
  }

  handleTab = event => {
    this.isFocused = false

    if (this.props.enableTabNavigation) return

    /* istanbul ignore else */
    if (this.state.isOpen) {
      event.preventDefault && event.preventDefault()
      this.handleOnMenuClose()
      /* istanbul ignore next */
      if (this.triggerNode) {
        /* istanbul ignore next */
        // Method is tested in Jest. However, it can't be
        // tested in a React instance of Dropdown
        focusNextFocusableNode(this.triggerNode)
      }
      return false
    }
    /* istanbul ignore next */
    return
  }

  handleShiftTab = event => {
    this.isFocused = false

    if (this.props.enableTabNavigation) return
    /* istanbul ignore else */
    if (this.state.isOpen) {
      event.preventDefault && event.preventDefault()
      this.handleOnMenuClose()
      /* istanbul ignore next */
      if (this.triggerNode) {
        /* istanbul ignore next */
        // Method is tested in Jest. However, it can't be
        // tested in a React instance of Dropdown
        focusPreviousFocusableNode(this.triggerNode)
      }
      return false
    }
    /* istanbul ignore next */
    return
  }

  render() {
    const {
      children,
      className,
      closeMenuOnClick,
      direction,
      enableTabNavigation,
      onClose,
      onSelect,
      isOpen: propsisOpen,
      selectedIndex: propsSelectedIndex,
      ...rest
    } = this.props
    const { isOpen, selectedIndex } = this.state

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
    const childrenMarkup = React.Children.map(children, (child, index) => {
      if (index === 0) {
        let triggerProps = {
          ref: 'trigger',
          onFocus: handleOnTriggerFocus,
          'aria-haspopup': true,
          'aria-expanded': isOpen,
        }
        if (child.type === Trigger) {
          // TODO: Allow for dynamic directions
          triggerProps = Object.assign({}, triggerProps, {
            direction: 'down',
          })
        }
        return React.cloneElement(child, triggerProps)
      }

      if (child.type === Menu || child.type === MenuComponent) {
        return isOpen
          ? React.cloneElement(child, {
              closeMenuOnClick,
              direction,
              enableTabNavigation,
              isOpen,
              onClose: handleOnMenuClose,
              onSelect: onSelect || child.props.onSelect,
              ref: 'menu',
              trigger: this.triggerNode,
              selectedIndex:
                child.props.selectedIndex !== undefined
                  ? child.props.selectedIndex
                  : selectedIndex,
            })
          : null
      }

      return child
    })

    return (
      <div className={componentClassName} {...rest}>
        <EventListener event="click" handler={handleOnBodyClick} />
        <KeypressListener
          keyCode={Keys.TAB}
          handler={handleTab}
          noModifier
          type="keydown"
        />
        <KeypressListener
          keyCode={Keys.TAB}
          modifier="shift"
          handler={handleShiftTab}
          type="keydown"
        />
        <KeypressListener
          keyCode={Keys.DOWN_ARROW}
          handler={handleDownArrow}
          type="keydown"
        />
        {childrenMarkup}
      </div>
    )
  }
}

export default Dropdown
