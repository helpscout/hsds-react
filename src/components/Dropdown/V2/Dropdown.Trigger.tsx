import * as React from 'react'
import { TriggerUI } from './Dropdown.css.js'
import { connect } from 'unistore/react'
import {
  toggleOpen,
  openDropdown,
  closeDropdown,
  setActiveItem,
} from './Dropdown.actions'
import Keys from '../../../constants/Keys'
import { classNames } from '../../../utilities/classNames'
import { noop } from '../../../utilities/other'

export interface Props {
  children?: any
  className?: string
  closeDropdown: () => void
  innerRef: (node: HTMLElement) => void
  id?: string
  isOpen: boolean
  onBlur: (event: Event) => void
  onFocus: (event: Event) => void
  onKeyDown: (event: KeyboardEvent) => void
  onClick: (event: Event) => void
  openDropdown: () => void
  setActiveItem: (node: HTMLElement) => void
  toggleOpen: () => void
}

export class Trigger extends React.PureComponent<Props> {
  static defaultProps = {
    innerRef: noop,
    isOpen: false,
    onBlur: noop,
    onFocus: noop,
    onKeyDown: noop,
    onClick: noop,
    openDropdown: noop,
    closeDropdown: noop,
    setActiveItem: noop,
    toggleOpen: noop,
  }

  node: HTMLElement

  handleOnClick = (event: Event) => {
    this.props.onClick(event)
    this.props.toggleOpen()
  }

  handleOnKeyDown = (event: KeyboardEvent) => {
    switch (event.keyCode) {
      case Keys.DOWN_ARROW:
        this.openDropdown()
        break

      case Keys.ENTER:
        this.openDropdown()
        break

      case Keys.TAB:
        if (event.shiftKey) {
          this.closeDropdown()
        }
        break

      default:
        break
    }

    this.props.onKeyDown(event)
  }

  openDropdown = () => {
    const { isOpen, openDropdown } = this.props

    if (!isOpen) {
      return openDropdown()
    }
  }

  closeDropdown = () => {
    const { isOpen, closeDropdown } = this.props

    if (isOpen) {
      return closeDropdown()
    }
  }

  setNodeRef = (node: HTMLElement) => {
    this.node = node
    this.props.innerRef(node)
  }

  render() {
    const { className, onBlur, onFocus, innerRef, isOpen, ...rest } = this.props
    const componentClassName = classNames(
      className,
      isOpen && 'is-open',
      'c-DropdownV2Trigger'
    )

    return (
      <TriggerUI
        {...rest}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={componentClassName}
        innerRef={this.setNodeRef}
        onBlur={onBlur}
        onFocus={onFocus}
        onClick={this.handleOnClick}
        onKeyDown={this.handleOnKeyDown}
      />
    )
  }
}

const ConnectedTrigger: any = connect(
  // mapStateToProps
  (state: any) => {
    const { isOpen, triggerId } = state

    return { isOpen, id: triggerId }
  },
  // mapDispatchToProps
  {
    toggleOpen,
    openDropdown,
    closeDropdown,
    setActiveItem,
  }
)(
  // @ts-ignore
  Trigger
)

export default ConnectedTrigger
