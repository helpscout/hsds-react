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
import classNames from 'classnames'
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

Dropdown.propTypes = {
  /** Maximum height for the menu. */
  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Maximum width for the menu. */
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Minimum height for the menu. */
  minHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Minimum width for the menu. */
  minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Width for the menu. */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
  closeDropdown: PropTypes.func,
  enableLeftRightArrowNavigation: PropTypes.bool,
  getState: PropTypes.func,
  /** ClassName for an active item. */
  activeClassName: PropTypes.string,
  /** Allows selection of multiple items from the dropdown (when stateful) */
  allowMultipleSelection: PropTypes.bool,
  /** Customize the Dropdown Card border color. */
  cardBorderColor: PropTypes.string,
  /** Render prop to customize the Dropdown contents. */
  children: PropTypes.func,
  /** Removes selected item on select. */
  clearOnSelect: PropTypes.bool,
  /** Closes Dropdown on select. */
  closeOnSelect: PropTypes.bool,
  /** Custom window object (e.g. iframe window object) */
  contentWindow: PropTypes.any,
  /** Preferred drop direction for the menu. */
  direction: PropTypes.oneOf(['left', 'right', 'up', 'down']),
  /** Disable the dropdown trigger so it can't be clicked. */
  disabled: PropTypes.bool,
  /** Changes the dropdown to drop upwards. */
  dropUp: PropTypes.bool,
  /** Enables Tab keypresses to navigate through items. */
  enableTabNavigation: PropTypes.bool,
  /** Node to bind global events. */
  envNode: PropTypes.any,
  /** ClassName for a focused item. */
  focusClassName: PropTypes.string,
  /** Forces the dropdown to always drop downwards. Overrides `dropUp`. */
  forceDropDown: PropTypes.bool,
  /** Current selected item index. */
  index: PropTypes.string,
  /** Used when constructing a filterable Dropdown. */
  inputValue: PropTypes.string,
  /** ID of the component. */
  id: PropTypes.string,
  /** Retrieves the Dropdown DOM node. */
  innerRef: PropTypes.func,
  /** Items to render. */
  items: PropTypes.arrayOf(PropTypes.any),
  /** Renders the loading UI. */
  isLoading: PropTypes.bool,
  /** Focuses the selected item when the dropdown opens. */
  isFocusSelectedItemOnOpen: PropTypes.bool,
  /** Selects the first item when the dropdown opens. */
  isSelectFirstItemOnOpen: PropTypes.bool,
  /** Callback when the Trigger blurs. */
  onBlur: PropTypes.func,
  /** Callback when the Trigger focuses. */
  onFocus: PropTypes.func,
  /** Callback when the dropdown opens. */
  onOpen: PropTypes.func,
  /** Callback when the dropdown closes. */
  onClose: PropTypes.func,
  /** Callback when an item is selected/deselected. */
  onSelect: PropTypes.func,
  /** Retrieves the Dropdown Menu DOM node. */
  menuRef: PropTypes.func,
  /** ClassName for an open item (with a sub menu). */
  openClassName: PropTypes.string,
  /** Renders menu as position `fixed`. Otherwise, it's `absolute`. */
  positionFixed: PropTypes.bool,
  /** Callback to render the empty UI. */
  renderEmpty: PropTypes.any,
  /** Callback to render the loading UI. */
  renderLoading: PropTypes.any,
  /** Callback to customize how an item renders. */
  renderItem: PropTypes.any,
  /** Callback to customize how an trigger renders. */
  renderTrigger: PropTypes.any,
  /** Controls the dropdown and sets the "active" item. */
  selectedItem: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    ),
  ]),
  /** Callback to determine if the dropdown should update it's `up`/`down` drop direction. Default returns `true`. */
  shouldDropDirectionUpdate: PropTypes.func,
  /** Callback to determine if the dropdown refocus the trigger on close. Default returns `true`. */
  shouldRefocusOnClose: PropTypes.func,
  /** Callback when the store state changes. Can be used to customize Dropdown state. */
  stateReducer: PropTypes.func,
  /** Subscribes to internal Dropdown state changes. */
  subscribe: PropTypes.func,
  /** The text to render into the trigger. */
  trigger: PropTypes.any,
  /** Retrieves the Dropdown Trigger DOM node. */
  triggerRef: PropTypes.func,
  /** Inline styles for the Trigger wrapper. */
  triggerStyle: PropTypes.any,
  /** Scroll locks the Dropdown menu. */
  withScrollLock: PropTypes.bool,
  /** CSS `z-index` for the menu. */
  zIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isOpen: PropTypes.bool,
  label: PropTypes.string,
  menuId: PropTypes.string,
  menuOffsetTop: PropTypes.number,
  onMenuMount: PropTypes.func,
  onMenuUnmount: PropTypes.func,
  previousIndex: PropTypes.any,
  selectionClearer: PropTypes.string,
  setMenuNode: PropTypes.func,
  setTriggerNode: PropTypes.func,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
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

ConnectedDropdown.propTypes = Dropdown.propTypes

export default ConnectedDropdown
