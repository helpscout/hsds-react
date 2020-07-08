import React from 'react'
import PropTypes from 'prop-types'
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

export class Dropdown extends React.PureComponent {
  node
  triggerNode
  menuNode

  handleOnDocumentBodyClick = event => {
    if (!event) return
    if (!this.menuNode) return

    const targetNode = event.target

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
      ? renderRenderPropComponent(renderTrigger)
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

    // Internally, for store

    if (this.props.getState().menuNode) return
    this.props.setMenuNode(node)
  }

  setTriggerNodeRef = node => {
    if (!node) return
    this.triggerNode = node
    this.props.triggerRef(node)

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
    const { className, envNode, id, 'data-cy': dataCy } = this.props
    const componentClassName = classNames(className, 'c-Dropdown')

    return (
      <DropdownUI
        className={componentClassName}
        ref={this.setNodeRef}
        id={id}
        data-cy={dataCy}
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

const DropdownMenuDimensions = {
  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  minHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

Dropdown.propTypes = Object.assign({}, DropdownMenuDimensions, {
  activeClassName: PropTypes.string,
  allowMultipleSelection: PropTypes.bool,
  cardBorderColor: PropTypes.string,
  children: PropTypes.func,
  className: PropTypes.string,
  clearOnSelect: PropTypes.bool,
  closeDropdown: PropTypes.func,
  closeOnSelect: PropTypes.bool,
  contentWindow: PropTypes.any,
  direction: PropTypes.oneOf(['left', 'right', 'up', 'down']),
  disabled: PropTypes.bool,
  dropUp: PropTypes.bool,
  enableLeftRightArrowNavigation: PropTypes.bool,
  enableTabNavigation: PropTypes.bool,
  envNode: PropTypes.any,
  focusClassName: PropTypes.string,
  forceDropDown: PropTypes.bool,
  getState: PropTypes.func,
  id: PropTypes.string,
  index: PropTypes.string,
  innerRef: PropTypes.func,
  inputValue: PropTypes.string,
  isLoading: PropTypes.bool,
  isOpen: PropTypes.bool,
  isFocusSelectedItemOnOpen: PropTypes.bool,
  isSelectFirstItemOnOpen: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.any),
  label: PropTypes.string,
  menuId: PropTypes.string,
  menuOffsetTop: PropTypes.number,
  menuRef: PropTypes.func,
  onBlur: PropTypes.func,
  onClose: PropTypes.func,
  onFocus: PropTypes.func,
  onMenuMount: PropTypes.func,
  onMenuUnmount: PropTypes.func,
  onOpen: PropTypes.func,
  onSelect: PropTypes.func,
  openClassName: PropTypes.string,
  positionFixed: PropTypes.bool,
  previousIndex: PropTypes.any,
  renderEmpty: PropTypes.any,
  renderItem: PropTypes.any,
  renderLoading: PropTypes.any,
  renderTrigger: PropTypes.any,
  selectedItem: PropTypes.any,
  selectionClearer: PropTypes.string,
  setMenuNode: PropTypes.func,
  setTriggerNode: PropTypes.func,
  shouldDropDirectionUpdate: PropTypes.func,
  stateReducer: PropTypes.func,
  trigger: PropTypes.any,
  triggerRef: PropTypes.func,
  triggerStyle: PropTypes.any,
  withScrollLock: PropTypes.bool,
})

Dropdown.defaultProps = {
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

ConnectedDropdown.propTypes = Dropdown.propTypes

export default ConnectedDropdown
