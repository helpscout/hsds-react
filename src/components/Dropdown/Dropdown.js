// @flow
import React, { PureComponent as Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import EventListener from '../EventListener'
import Divider from './Divider'
import Header from './Header'
import Item from './Item'
import { default as Menu, MenuComponent } from './Menu'
import Trigger from './Trigger'
import KeypressListener from '../KeypressListener'
import Keys from '../../constants/Keys'
import { classNames } from '../../utilities/classNames.ts'
import {
  focusNextFocusableNode,
  focusPreviousFocusableNode,
} from '../../utilities/focus'
import { isNodeElement } from '../../utilities/node'
import { noop } from '../../utilities/other'
import type { DropdownDirection } from './types'

type Props = {
  children?: any,
  className?: string,
  closeMenuOnClick: boolean,
  direction: DropdownDirection,
  enableTabNavigation: boolean,
  isOpen: boolean,
  onClose: () => void,
  onSelect: () => void,
  selectedIndex: number,
}

type State = {
  isOpen: boolean,
  selectedIndex: number,
}

class Dropdown extends Component<Props, State> {
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
  triggerNode: ?HTMLElement | ?Element = null
  _isMounted: boolean = false

  constructor(props: Props) {
    super()
    this.state = {
      isOpen: props.isOpen,
      selectedIndex: props.selectedIndex,
    }

    this.handleOnBodyClick = this.handleOnBodyClick.bind(this)
    this.handleOnTriggerClick = this.handleOnTriggerClick.bind(this)
    this.handleOnTriggerFocus = this.handleOnTriggerFocus.bind(this)
    this.handleOnMenuClose = this.handleOnMenuClose.bind(this)
    this.handleDownArrow = this.handleDownArrow.bind(this)
    this.handleTab = this.handleTab.bind(this)
    this.handleShiftTab = this.handleShiftTab.bind(this)
  }

  componentDidMount = () => {
    this._isMounted = true
    this.setTriggerNode()
  }

  componentWillUnmount = () => {
    this._isMounted = false
  }

  safeSetState = (newState: Object) => {
    /* istanbul ignore else */
    if (this._isMounted) {
      this.setState(newState)
    }
  }
  componentWillUpdate = (nextProps: Props) => {
    if (this.props.isOpen !== nextProps.isOpen) {
      this.safeSetState({ isOpen: nextProps.isOpen })
    }
  }

  setTriggerNode = () => {
    const trigger = this.refs.trigger
    /* istanbul ignore next */
    if (!this.triggerNode) {
      this.triggerNode = isNodeElement(trigger)
        ? trigger
        : // $FlowFixMe
          ReactDOM.findDOMNode(trigger)
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
      // $FlowFixMe
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

  handleTab = (event: KeyboardEvent) => {
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
  }

  handleShiftTab = (event: KeyboardEvent) => {
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
