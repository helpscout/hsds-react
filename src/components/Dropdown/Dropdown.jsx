import React from 'react'
import { connect } from '@helpscout/wedux'
import { initialState } from './Dropdown.store'
import { closeDropdown, setMenuNode, setTriggerNode } from './Dropdown.actions'
import EventListener from '../EventListener'
import MenuContainer from './Dropdown.MenuContainer'
import Trigger from './Dropdown.Trigger'
import VisuallyHidden from '../VisuallyHidden'
import { DropdownUI } from './Dropdown.css.js'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { renderRenderPropComponent } from '../../utilities/component'

// TODO: migrate/create PropTypes for Dropdown
export class Dropdown extends React.PureComponent {
  static defaultProps = {
    ...initialState,
    allowMultipleSelection: false,
    contentWindow: window,
    'data-cy': 'Dropdown',
    disabled: false,
    innerRef: noop,
    menuRef: noop,
    setMenuNode: noop,
    setTriggerNode: noop,
    triggerRef: noop,
  }

  node
  triggerNode
  menuNode

  handleOnDocumentBodyClick = event => {
    if (!event) return
    if (!this.menuNode) return

    const targetNode = event.target

    /* istanbul ignore else */
    // When the component is displayed in an `iframe` (e.g. Beacon) we need
    // to do an instanceof check based on the `iframe`#Element class type,
    // using the `contentWindow` prop. https://stackoverflow.com/a/26251098
    if (targetNode instanceof this.props.contentWindow.Element) {
      if (
        this.menuNode.contains(targetNode) ||
        targetNode === this.triggerNode
      ) {
        return
      }

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

  setNodeRef = node => {
    this.node = node
    this.props.innerRef(node)
  }

  setMenuNodeRef = node => {
    this.menuNode = node
    this.props.menuRef(node)

    /* istanbul ignore next */
    // Internally, for store

    if (this.props.getState().menuNode) return
    this.props.setMenuNode(node)
  }

  setTriggerNodeRef = node => {
    if (!node) return
    this.triggerNode = node
    this.props.triggerRef(node)

    /* istanbul ignore next */
    // Internally, for store

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
    const componentClassName = classNames(className, 'c-Dropdown')

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

const ConnectedDropdown = connect(
  // mapStateToProps
  state => {
    const { contentWindow, envNode, id, isOpen, getState } = state
    return {
      contentWindow,
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
)(Dropdown)
const AnotherComponent = () => <span></span>
export default AnotherComponent
