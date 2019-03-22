// @flow
import type { PopProps } from './types'
import React, { Component } from 'react'
import EventListener from '../EventListener'
import KeypressListener from '../KeypressListener'
import Manager from './Manager'
import Arrow from './Arrow'
import Popper from './Popper'
import Reference from './Reference'
import Keys from '../../constants/Keys'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { createUniqueIDFactory } from '../../utilities/id'
import { PopUI } from './Pop.css.js'

type Props = PopProps

type State = {
  id: string,
  isOpen: boolean,
}

const uniqueID = createUniqueIDFactory('Pop')

class Pop extends Component<Props, State> {
  static defaultProps = {
    arrowSize: 5,
    closeOnBodyClick: false,
    closeOnEscPress: true,
    closeOnContentClick: false,
    closeOnMouseLeave: true,
    display: 'inline-block',
    placement: 'auto',
    isOpen: false,
    modifiers: {},
    onContentClick: noop,
    onBeforeOpen: () => Promise.resolve(),
    onBeforeClose: () => Promise.resolve(),
    onOpen: noop,
    onClose: noop,
    showArrow: true,
    triggerOn: 'click',
    zIndex: 1000,
  }
  static Arrow = Arrow
  static Manager = Manager
  static Popper = Popper
  static Reference = Reference

  node = null
  _isMounted = false

  state = {
    id: uniqueID(),
    isOpen: this.props.isOpen || false,
  }

  componentDidMount() {
    this._isMounted = true
    if (this.state.isOpen) {
      this.open()
    }
  }

  componentWillReceiveProps = (nextProps: Props) => {
    const { isOpen: wasOpen } = this.props
    const { isOpen: willOpen } = nextProps

    if (wasOpen === willOpen) return

    /* istanbul ignore else */
    if (willOpen !== this.state.isOpen) {
      if (willOpen) {
        this.open()
      } else {
        this.close()
      }
    }
  }

  componentWillUnmount = () => {
    this._isMounted = false
    this.node = null
  }

  safeSetState = (state, callback) => {
    /* istanbul ignore else */
    if (this._isMounted) {
      this.setState(state, callback)
    }
  }

  handleMouseMove = () => {
    if (!this.shouldHandleHover()) return
    if (this.state.isOpen) return
    this.open()
  }

  handleMouseLeave = () => {
    if (!this.shouldHandleHover()) return
    if (!this.props.closeOnMouseLeave) return

    this.close()
  }

  handleClick = event => {
    if (this.shouldHandleHover()) return
    if (event) event.stopPropagation()
    this.toggleOpen()
  }

  handleOnBodyClick = event => {
    if (!this.shouldHandleHover() && !this.props.closeOnBodyClick) return
    if (!event || event.target === this.node) return
    this.close()
  }

  handleOnContentClick = event => {
    this.props.onContentClick(event)
    if (!this.props.closeOnContentClick) return
    this.close()
  }

  handleOnPopperMouseLeave = () => {
    if (!this.shouldHandleHover()) return
    this.close()
  }

  shouldHandleHover = () => this.props.triggerOn === 'hover'

  open = () => {
    this.props.onBeforeOpen(this).then(() => {
      this.safeSetState({ isOpen: true }, () => {
        this.props.onOpen(this)
      })
    })
  }

  close = () => {
    this.props.onBeforeClose(this).then(() => {
      this.safeSetState({ isOpen: false }, () => {
        this.props.onClose(this)
      })
    })
  }

  toggleOpen = () => {
    if (this.state.isOpen) {
      this.close()
    } else {
      this.open()
    }
  }

  setNodeRef = node => (this.node = node)

  render() {
    const {
      animationDelay,
      animationDuration,
      animationEasing,
      animationSequence,
      arrowSize,
      children,
      className,
      id: idProp,
      placement,
      display,
      modifiers,
      showArrow,
      zIndex,
    } = this.props

    if (!children) return null

    const id = idProp || this.state.id
    const componentClassName = classNames(
      'c-PopWrapper',
      display && `is-display-${display}`,
      className
    )

    const referenceMarkup = React.Children.map(
      children,
      child =>
        child.type === Reference
          ? React.cloneElement(child, {
              'aria-describedby': id,
              display,
            })
          : null
    )

    /* istanbul ignore next */
    /**
     * Too difficult to text in Enzyme, due to createContext + Portal + cloning.
     */
    const popperMarkup = React.Children.map(
      children,
      child =>
        child.type === Popper
          ? React.cloneElement(child, {
              animationDelay,
              animationDuration,
              animationEasing,
              animationSequence,
              arrowSize,
              className,
              close: this.close,
              id,
              isOpen: this.state.isOpen,
              onContentClick: this.handleOnContentClick,
              onMouseLeave: this.handleOnPopperMouseLeave,
              modifiers,
              placement,
              showArrow,
              zIndex,
            })
          : null
    )

    return (
      <Manager>
        <PopUI
          className={componentClassName}
          innerRef={this.setNodeRef}
          onMouseMove={this.handleMouseMove}
          onMouseLeave={this.handleMouseLeave}
          onClick={this.handleClick}
        >
          {referenceMarkup}
          {popperMarkup}
        </PopUI>
      </Manager>
    )
  }
}

export default Pop
