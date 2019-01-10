import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { connect } from '@helpscout/wedux'
import { toggleOpen, openDropdown, closeDropdown } from './Dropdown.actions'
import propConnect from '../../PropProvider/propConnect'
import { TriggerUI } from './Dropdown.css.js'
import Keys from '../../../constants/Keys'
import { classNames } from '../../../utilities/classNames'
import { namespaceComponent } from '../../../utilities/component'
import { noop } from '../../../utilities/other'
import { COMPONENT_KEY } from './Dropdown.utils'

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
  style: any
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

  openDropdown() {
    const { isOpen, openDropdown } = this.props

    if (!isOpen) {
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
    const { className, onBlur, onFocus, innerRef, isOpen, ...rest } = this.props
    const componentClassName = classNames(
      className,
      isOpen && 'is-open',
      'c-DropdownV2Trigger'
    )

    return (
      <TriggerUI
        {...getValidProps(rest)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={componentClassName}
        innerRef={innerRef}
        onBlur={onBlur}
        onFocus={onFocus}
        onClick={this.handleOnClick}
        onKeyDown={this.handleOnKeyDown}
      />
    )
  }
}

namespaceComponent(COMPONENT_KEY.Trigger)(Trigger)
const PropConnectedTrigger = propConnect(COMPONENT_KEY.Trigger)(Trigger)

const ConnectedTrigger: any = connect(
  // mapStateToProps
  (state: any) => {
    const { isOpen, triggerId, triggerStyle } = state

    return { isOpen, id: triggerId, style: triggerStyle }
  },
  // mapDispatchToProps
  {
    toggleOpen,
    openDropdown,
    closeDropdown,
  }
)(
  // @ts-ignore
  PropConnectedTrigger
)

export default ConnectedTrigger
