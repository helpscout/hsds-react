import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { connect } from '@helpscout/wedux'
import { toggleOpen, openDropdown, closeDropdown } from './Dropdown.actions'
import { TriggerUI } from './Dropdown.css.js'
import Keys from '../../../constants/Keys'
import { classNames } from '../../../utilities/classNames'
import { noop } from '../../../utilities/other'

export interface Props {
  children?: any
  className?: string
  closeDropdown: () => void
  disabled: boolean
  triggerRef: (node: HTMLElement) => void
  id?: string
  isOpen: boolean
  onBlur: (event: Event) => void
  onFocus: (event: Event) => void
  onKeyDown: (event: KeyboardEvent) => void
  onClick: (event: Event) => void
  openDropdown: () => void
  style: any
  toggleOpen: () => void
}

export class Trigger extends React.PureComponent<Props> {
  static displayName = 'DropdownTrigger'

  static defaultProps = {
    disabled: false,
    triggerRef: noop,
    isOpen: false,
    onBlur: noop,
    onFocus: noop,
    onKeyDown: noop,
    onClick: noop,
    openDropdown: noop,
    closeDropdown: noop,
    style: {},
    toggleOpen: noop,
  }

  handleOnClick = (event: Event) => {
    this.props.onClick(event)
    this.props.toggleOpen()
  }

  handleOnKeyDown = (event: KeyboardEvent) => {
    switch (event.keyCode) {
      case Keys.DOWN_ARROW:
        this.openDropdown(event)
        break

      case Keys.ENTER:
        this.openDropdown(event)
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

  openDropdown(event) {
    const { isOpen, openDropdown } = this.props

    if (!isOpen) {
      event.preventDefault()
      return openDropdown()
    }
  }

  closeDropdown() {
    const { isOpen, closeDropdown } = this.props

    if (isOpen) {
      return closeDropdown()
    }
  }

  render() {
    const {
      className,
      disabled,
      onBlur,
      onFocus,
      triggerRef,
      isOpen,
      ...rest
    } = this.props

    const componentClassName = classNames(
      className,
      isOpen && 'is-open',
      disabled && 'is-disabled',
      'c-DropdownV2Trigger'
    )

    return (
      <TriggerUI
        role="button"
        {...getValidProps(rest)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={componentClassName}
        disabled={disabled}
        ref={triggerRef}
        onBlur={onBlur}
        onFocus={onFocus}
        onClick={this.handleOnClick}
        onKeyDown={this.handleOnKeyDown}
        data-cy="DropdownTrigger"
      />
    )
  }
}

export const mapStateToProps = (state: any) => {
  const { isOpen, triggerId, triggerProps, triggerStyle } = state

  return { ...triggerProps, isOpen, id: triggerId, style: triggerStyle }
}

const ConnectedTrigger: any = connect(
  mapStateToProps,
  // mapDispatchToProps
  {
    toggleOpen,
    openDropdown,
    closeDropdown,
  }
)(
  // @ts-ignore
  Trigger
)

export default ConnectedTrigger
