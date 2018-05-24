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
import classNames from '../../utilities/classNames'
import {
  focusNextFocusableNode,
  focusPreviousFocusableNode,
} from '../../utilities/focus'
import { isNodeElement } from '../../utilities/node'
import { noop } from '../../utilities/other'

export const propTypes = {
  closeMenuOnClick: PropTypes.bool,
  direction: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSelect: PropTypes.func,
  selectedIndex: PropTypes.number,
}
const defaultProps = {
  closeMenuOnClick: true,
  direction: 'down',
  onClose: noop,
}

class Dropdown extends Component {
  constructor(props) {
    super()
    this.state = {
      isOpen: props.isOpen,
      selectedIndex: props.selectedIndex,
    }

    this.isFocused = false
    this.triggerNode = null
    this._isMounted = false

    this.handleOnBodyClick = this.handleOnBodyClick.bind(this)
    this.handleOnTriggerClick = this.handleOnTriggerClick.bind(this)
    this.handleOnTriggerFocus = this.handleOnTriggerFocus.bind(this)
    this.handleOnMenuClose = this.handleOnMenuClose.bind(this)
    this.handleDownArrow = this.handleDownArrow.bind(this)
    this.handleTab = this.handleTab.bind(this)
    this.handleShiftTab = this.handleShiftTab.bind(this)
  }

  componentDidMount() {
    this._isMounted = true
    this.setTriggerNode()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  safeSetState(newState) {
    /* istanbul ignore else */
    if (this._isMounted) {
      this.setState(newState)
    }
  }
  componentWillUpdate(nextProps) {
    if (this.props.isOpen !== nextProps.isOpen) {
      this.safeSetState({ isOpen: nextProps.isOpen })
    }
  }

  setTriggerNode() {
    const trigger = this.refs.trigger
    /* istanbul ignore next */
    if (!this.triggerNode) {
      this.triggerNode = isNodeElement(trigger)
        ? trigger
        : ReactDOM.findDOMNode(trigger)
    }
  }

  handleOnBodyClick(event) {
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

  handleOnTriggerClick() {
    this.safeSetState({ isOpen: !this.state.isOpen })
    this.isFocused = true
  }

  handleOnTriggerFocus() {
    setTimeout(() => {
      this.isFocused = true
    }, 0)
  }

  handleOnMenuClose() {
    const { onClose } = this.props
    this.safeSetState({ selectedIndex: null, isOpen: false })
    this.isFocused = false

    onClose()
  }

  handleDownArrow() {
    const { isOpen } = this.state
    if (!isOpen && this.isFocused) {
      this.safeSetState({ isOpen: true, selectedIndex: 0 })
    }
  }

  handleTab(event) {
    this.isFocused = false
    /* istanbul ignore else */
    if (this.state.isOpen) {
      event.preventDefault()
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

  handleShiftTab(event) {
    this.isFocused = false
    /* istanbul ignore else */
    if (this.state.isOpen) {
      event.preventDefault()
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

Dropdown.propTypes = propTypes
Dropdown.defaultProps = defaultProps
Dropdown.Divider = Divider
Dropdown.Header = Header
Dropdown.Item = Item
Dropdown.Menu = Menu
Dropdown.Trigger = Trigger

export default Dropdown
