import * as React from 'react'
import { connect } from '@helpscout/wedux'
import { initialState } from './Dropdown.store'
import { DropdownProps } from './Dropdown.types'
import propConnect from '../../PropProvider/propConnect'
import { closeDropdown, setMenuNode, setTriggerNode } from './Dropdown.actions'
import EventListener from '../../EventListener'
import MenuContainer from './Dropdown.MenuContainer'
import Trigger from './Dropdown.Trigger'
import VisuallyHidden from '../../VisuallyHidden'
import { DropdownUI } from './Dropdown.css.js'
import { classNames } from '../../../utilities/classNames'
import { noop } from '../../../utilities/other'
import {
  namespaceComponent,
  renderRenderPropComponent,
} from '../../../utilities/component'
import { COMPONENT_KEY } from './Dropdown.utils'

export interface State {
  items: Array<any>
}

export class Dropdown extends React.PureComponent<DropdownProps, State> {
  static defaultProps = {
    ...initialState,
    allowMultipleSelection: false,
    'data-cy': 'Dropdown',
    disabled: false,
    innerRef: noop,
    menuRef: noop,
    setMenuNode: noop,
    setTriggerNode: noop,
    triggerRef: noop,
  }

  node: HTMLElement
  triggerNode: HTMLElement
  menuNode: HTMLElement

  handleOnDocumentBodyClick = (event: Event) => {
    if (!event) return
    if (!this.menuNode) return

    const targetNode = event.target

    /* istanbul ignore else */
    if (targetNode instanceof Element) {
      if (this.menuNode.contains(targetNode) || targetNode === this.triggerNode)
        return

      this.closeMenu()
    }
  }

  closeMenu() {
    if (!this.props.isOpen) return
    // Store calls onClose() callback
    this.props.closeDropdown()
  }

  getTriggerProps() {
    const { disabled, onBlur, onFocus } = this.props

    return {
      disabled,
      onBlur,
      onFocus,
      triggerRef: node => this.setTriggerNodeRef(node),
    }
  }

  renderTrigger() {
    const { trigger, renderTrigger } = this.props
    const triggerComponent = renderTrigger
      ? /* istanbul ignore next */
        renderRenderPropComponent(renderTrigger)
      : trigger

    return <Trigger {...this.getTriggerProps()}>{triggerComponent}</Trigger>
  }

  setNodeRef = (node: HTMLElement) => {
    this.node = node
    this.props.innerRef(node)
  }

  setMenuNodeRef = (node: HTMLElement) => {
    this.menuNode = node
    this.props.menuRef(node)

    /* istanbul ignore next */
    // Internally, for store
    // @ts-ignore
    if (this.props.getState().menuNode) return
    this.props.setMenuNode(node)
  }

  setTriggerNodeRef = (node: HTMLElement) => {
    if (!node) return
    this.triggerNode = node
    this.props.triggerRef(node)

    /* istanbul ignore next */
    // Internally, for store
    // @ts-ignore
    if (this.props.getState().triggerNode === node) return
    this.props.setTriggerNode(node)
  }

  renderMenu() {
    const { children, allowMultipleSelection } = this.props

    return (
      <MenuContainer
        children={children}
        menuRef={this.setMenuNodeRef}
        allowMultipleSelection={allowMultipleSelection}
      />
    )
  }

  renderAriaLive() {
    const { id, label, isOpen } = this.props
    const dropdownName = this.props['aria-label'] || label || id

    return (
      <VisuallyHidden
        data-cy="DropdownAriaLive"
        role="region"
        aria-live="polite"
      >
        {isOpen ? `${dropdownName} is opened` : `${dropdownName} is closed`}
      </VisuallyHidden>
    )
  }

  render() {
    const { className, envNode, id } = this.props
    const componentClassName = classNames(className, 'c-DropdownV2')

    return (
      <DropdownUI
        className={componentClassName}
        data-cy={this.props['data-cy']}
        ref={this.setNodeRef}
        id={id}
      >
        {this.renderAriaLive()}
        <EventListener
          event="click"
          handler={this.handleOnDocumentBodyClick}
          scope={envNode}
        />
        {this.renderTrigger()}
        {this.renderMenu()}
      </DropdownUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY.Dropdown)(Dropdown)

const ConnectedDropdown: any = connect(
  // mapStateToProps
  (state: any) => {
    const { envNode, id, isOpen, getState } = state
    return {
      envNode,
      id,
      isOpen,
      getState,
    }
  },
  // mapDispatchToProps
  {
    closeDropdown,
    setMenuNode,
    setTriggerNode,
  }
)(
  // @ts-ignore
  PropConnectedComponent
)

export default ConnectedDropdown
