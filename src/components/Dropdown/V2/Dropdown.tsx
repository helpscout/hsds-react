import * as React from 'react'
import { connect } from 'unistore/react'
import { initialState } from './Dropdown.store'
import { DropdownProps } from './Dropdown.types'
import propConnect from '../../PropProvider/propConnect'
import { closeDropdown, setMenuNode, setTriggerNode } from './Dropdown.actions'
import EventListener from '../../EventListener'
import KeypressListener from '../../KeypressListener'
import MenuContainer from './Dropdown.MenuContainer'
import Trigger from './Dropdown.Trigger'
import { DropdownUI } from './Dropdown.css.js'
import Keys from '../../../constants/Keys'
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
    innerRef: noop,
    menuRef: noop,
    setMenuNode: noop,
    setTriggerNode: noop,
    triggerRef: noop,
  }

  node: HTMLElement
  triggerNode: HTMLElement
  menuNode: HTMLElement

  handleOnDocumentKeyDown = (event: KeyboardEvent) => {
    if (!this.props.isOpen) return

    /* istanbul ignore else */
    if (event.keyCode === Keys.ESCAPE) {
      event.preventDefault && event.preventDefault()
      this.focusTriggerNode()
      this.closeMenu()
    }
  }

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

  closeMenu = () => {
    if (!this.props.isOpen) return
    // Store calls onClose() callback
    this.props.closeDropdown()
  }

  focusTriggerNode = () => {
    if (this.triggerNode && this.props.isOpen) {
      this.triggerNode.focus()
    }
  }

  getTriggerProps = () => {
    const { onBlur, onFocus } = this.props

    return {
      onBlur,
      onFocus,
      innerRef: this.setTriggerNodeRef,
    }
  }

  renderTrigger = () => {
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
    this.triggerNode = node
    this.props.triggerRef(node)

    /* istanbul ignore next */
    // Internally, for store
    // @ts-ignore
    if (this.props.getState().triggerNode) return
    this.props.setTriggerNode(node)
  }

  renderMenu = () => {
    const { children } = this.props

    return <MenuContainer children={children} innerRef={this.setMenuNodeRef} />
  }

  render() {
    const { className, envNode, id } = this.props
    const componentClassName = classNames(className, 'c-DropdownV2')

    return (
      <DropdownUI
        className={componentClassName}
        innerRef={this.setNodeRef}
        id={id}
      >
        <KeypressListener
          handler={this.handleOnDocumentKeyDown}
          type="keydown"
          scope={envNode}
        />
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

namespaceComponent(COMPONENT_KEY.Dropdown)(Dropdown)
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
