// @flow
import React, { Component } from 'react'
import EventListener from '../EventListener'
import KeypressListener from '../KeypressListener'
import Portal from '../Portal'
import Manager from './Manager'
import Arrow from './Arrow'
import Popper from './Popper'
import Reference from './Reference'
import Keys from '../../constants/Keys'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { createUniqueIDFactory } from '../../utilities/id'

const uniqueID = createUniqueIDFactory('Pop')

class Pop extends Component<Props> {
  node = null

  state = {
    id: uniqueID(),
    isOpen: this.props.isOpen || false,
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.isOpen !== this.state.isOpen) {
      this.setState({
        isOpen: nextProps.isOpen,
      })
    }
  }

  componentWillUnmount = () => {
    this.node = null
  }

  handleMouseEnter = () => {
    if (!this.shouldHandleHover()) return
    this.open()
  }

  handleMouseLeave = () => {
    if (!this.shouldHandleHover()) return
    this.close()
  }

  handleClick = event => {
    if (this.shouldHandleHover()) return
    if (event) event.stopPropagation()
    this.toggleOpen()
  }

  handleOnBodyClick = event => {
    if (!this.props.closeOnBodyClick) return
    if (!event || event.target === this.node) return
    this.close()
  }

  handleOnEsc = () => {
    if (!this.props.closeOnEscPress) return
    this.close()
  }

  shouldHandleHover = () => this.props.triggerOn === 'hover'

  open = () => {
    this.setState({ isOpen: true })
    this.props.onOpen(this)
  }

  close = () => {
    this.setState({ isOpen: false })
    this.props.onClose(this)
  }

  toggleOpen = () => {
    if (this.state.isOpen) {
      this.props.onClose(this)
    } else {
      this.props.onOpen(this)
    }
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    const {
      animationDelay,
      animationDuration,
      animationEasing,
      animationSequence,
      children,
      className,
      id: idProp,
      placement,
      display,
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
    const shouldShowPopper = this.state.isOpen

    const referenceMarkup = React.Children.map(
      children,
      child =>
        child.type === Reference
          ? React.cloneElement(child, {
              'aria-describedby': id,
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
              id,
              placement,
              showArrow,
              zIndex,
            })
          : null
    )

    return (
      <Manager>
        <span
          className={componentClassName}
          ref={node => (this.node = node)}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onClick={this.handleClick}
        >
          <EventListener event="click" handler={this.handleOnBodyClick} />
          <KeypressListener keyCode={Keys.ESCAPE} handler={this.handleOnEsc} />
          {referenceMarkup}
          {shouldShowPopper ? popperMarkup : null}
        </span>
      </Manager>
    )
  }
}

type Placements =
  | 'auto-start'
  | 'auto'
  | 'auto-end'
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'right-start'
  | 'right'
  | 'right-end'
  | 'bottom-end'
  | 'bottom'
  | 'bottom-start'
  | 'left-end'
  | 'left'
  | 'left-start'

type Props = {
  animationDelay: number | string,
  animationDuration: number | string,
  animationEasing: string,
  animationSequence: string | Array<string>,
  arrowClassName: string,
  closeOnBodyClick: boolean,
  closeOnEscPress: boolean,
  display: string,
  isOpen: boolean,
  placement: Placements,
  triggerOn: 'click' | 'hover',
  showArrow: boolean,
}

Pop.defaultProps = {
  closeOnBodyClick: false,
  closeOnEscPress: true,
  display: 'inline-block',
  placement: 'auto',
  isOpen: false,
  onOpen: noop,
  onClose: noop,
  showArrow: true,
  triggerOn: 'click',
  zIndex: 1000,
}

Pop.Arrow = Arrow
Pop.Manager = Manager
Pop.Popper = Popper
Pop.Reference = Reference

export default Pop
